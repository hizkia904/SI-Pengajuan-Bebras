import { Result } from "antd";
import { validateRequest } from "../auth";
import { runQuery } from "../db";
import ErrorResult from "./ErrorResult";
import FormRatingInternasional from "./FormRatingInternasional";
import RatingInternasionalClient from "./RatingInternasionalClient";

export default async function RatingInternasionalServer({
  id_soal_usulan,
  tujuan,
}: {
  id_soal_usulan: string;
  tujuan: "ARCHIVE" | "PENGAJUAN";
}) {
  const { user } = await validateRequest();
  if (user == null) {
    return <p>...</p>;
  }
  const role = user.role;
  const ketua = user.ketua;
  let ratingInternasional: any[] | null;
  let tahap_sekarang: number | null | "tidak perlu";
  let majuInternasional:
    | {
        gotointernational: boolean;
        status_nasional:
          | "SUBMITTED"
          | "IN REVIEW"
          | "IN REVISE"
          | "FILTERING"
          | "ACCEPTED"
          | "REJECTED"
          | "ADDED FROM ARCHIVE";
      }
    | null
    | "tidak perlu";

  try {
    const queryRating =
      "select id_rating_internasional,name,as_for_now,potential from rating_internasional where id_soal_usulan=$1 order by id_rating_internasional desc";
    const getRating = await runQuery(queryRating, [id_soal_usulan]);
    ratingInternasional = getRating.rows;

    if (
      role == "BIRO" ||
      (role == "TIM NASIONAL" && ketua == false) ||
      (role == "TIM NASIONAL" && ketua == true && tujuan == "ARCHIVE")
    ) {
      tahap_sekarang = "tidak perlu";
      majuInternasional = "tidak perlu";
    } else {
      const queryTahapSekarang = "select tahap_sekarang from info_bebras";
      const getTahap = await runQuery(queryTahapSekarang, []);
      tahap_sekarang = getTahap.rows[0].tahap_sekarang;

      const queryMajuInternasional =
        "select gotointernational,status_nasional from soal_usulan where id_soal_usulan=$1";
      const getMajuInternasional = await runQuery(queryMajuInternasional, [
        id_soal_usulan,
      ]);
      majuInternasional = getMajuInternasional.rows[0];
    }
  } catch (e) {
    ratingInternasional = null;
    majuInternasional = null;
    tahap_sekarang = null;
  }
  return ratingInternasional == null ||
    tahap_sekarang == null ||
    majuInternasional == null ? (
    <ErrorResult subtitle="Unabled to display international rating" />
  ) : role == "BIRO" ||
    (role == "TIM NASIONAL" && ketua == false) ||
    (role == "TIM NASIONAL" && ketua == true && tujuan == "ARCHIVE") ? (
    <RatingInternasionalClient ratingInternasional={ratingInternasional} />
  ) : majuInternasional != "tidak perlu" &&
    tahap_sekarang != "tidak perlu" &&
    tahap_sekarang == 5 &&
    majuInternasional.gotointernational == true &&
    majuInternasional.status_nasional == "ACCEPTED" ? (
    <FormRatingInternasional
      ratingInternasional={ratingInternasional}
      id_soal_usulan={id_soal_usulan}
    />
  ) : (
    <Result
      subTitle="Unabled to add or edit international rating"
      status="404"
    />
  );
}
