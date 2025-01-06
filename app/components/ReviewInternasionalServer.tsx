import { Result } from "antd";
import { validateRequest } from "../auth";
import { runQuery } from "../db";
import ErrorResult from "./ErrorResult";
import FormReviewInternasional from "./FormReviewInternasional";
import ReviewInternasionalClient from "./ReviewInternasionalClient";

export default async function ReviewInternasionalServer({
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
  let review_internasional: any[] | null;
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
    const queryReviewInternasional =
      "select encode(review_internasional,'base64') as review_internasional from soal_usulan " +
      "where id_soal_usulan=$1";
    const arrReviewInternasional = [id_soal_usulan];
    const getReviewInternasional = await runQuery(
      queryReviewInternasional,
      arrReviewInternasional
    );
    // const review_internasional = JSON.stringify(getReviewInternasional.rows);
    review_internasional = getReviewInternasional.rows;

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
    review_internasional = null;
    majuInternasional = null;
    tahap_sekarang = null;
  }

  return review_internasional == null ||
    tahap_sekarang == null ||
    majuInternasional == null ? (
    <ErrorResult subtitle="Failed to get international review for this task" />
  ) : role == "BIRO" ||
    (role == "TIM NASIONAL" && ketua == false) ||
    (role == "TIM NASIONAL" && ketua == true && tujuan == "ARCHIVE") ? (
    <ReviewInternasionalClient review_internasional={review_internasional} />
  ) : majuInternasional != "tidak perlu" &&
    tahap_sekarang != "tidak perlu" &&
    tahap_sekarang == 5 &&
    majuInternasional.gotointernational == true &&
    majuInternasional.status_nasional == "ACCEPTED" ? (
    <FormReviewInternasional
      id_soal_usulan={id_soal_usulan}
      review_internasional={review_internasional}
    />
  ) : (
    <Result subTitle="Unabled to add international review" status="404" />
  );
}
