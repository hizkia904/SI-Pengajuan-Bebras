import { Result } from "antd";
import { validateRequest } from "../auth";
import { runQuery } from "../db";
import ErrorResult from "./ErrorResult";
import FormReviewNasional from "./FormReviewNasional";

import ReviewNasionalClient from "./ReviewNasionalClient";
import DisplayReview from "./DisplayReview";

export default async function ReviewNasionalServer({
  id_soal_usulan,
  tujuan,
}: {
  id_soal_usulan: string;
  tujuan: "ARCHIVE" | "PENGAJUAN";
}) {
  const { user } = await validateRequest();
  if (user == null) {
    return <p>....</p>;
  }
  const role = user.role;
  const id_user = user.id;
  let review: any[] | null;
  let tahap_sekarang: number | "tidak perlu" | null;
  try {
    let queryReview;
    //tim nasional archive
    //biro archive
    //biro pengajuan
    if (role == "BIRO" || (role == "TIM NASIONAL" && tujuan == "ARCHIVE")) {
      queryReview =
        "select " +
        "u.nama," +
        "(review).task_title," +
        "(review).age," +
        "(review).answer_type," +
        "(review).keep_order," +
        "(review).categories," +
        "(review).body," +
        "(review).question," +
        "(review).answer_options," +
        "(review).answer_explanation," +
        "(review).this_is_if," +
        "(review).this_is_ct," +
        "(review).if_keywords," +
        "(review).ct_keywords," +
        "(review).wording_phrases," +
        "(review).comments," +
        "(review).graphics," +
        "(review).authors " +
        "from review_nasional r inner join user_bebras u on r.id_user=u.id where id_soal_usulan=$1";
      const getReview = await runQuery(queryReview, [id_soal_usulan]);
      review = getReview.rows;
      tahap_sekarang = "tidak perlu";
    } else {
      //tim nasional pengajuan (beda)
      queryReview =
        "select " +
        "(review).task_title," +
        "(review).age," +
        "(review).answer_type," +
        "(review).keep_order," +
        "(review).categories," +
        "(review).body," +
        "(review).question," +
        "(review).answer_options," +
        "(review).answer_explanation," +
        "(review).this_is_if," +
        "(review).this_is_ct," +
        "(review).if_keywords," +
        "(review).ct_keywords," +
        "(review).wording_phrases," +
        "(review).comments," +
        "(review).graphics," +
        "(review).authors " +
        "from review_nasional where id_user=$1 and id_soal_usulan=$2";
      const getReview = await runQuery(queryReview, [id_user, id_soal_usulan]);
      review = getReview.rows;

      const queryTahapSekarang = "select tahap_sekarang from info_bebras";
      const getTahap = await runQuery(queryTahapSekarang, []);
      tahap_sekarang = getTahap.rows[0].tahap_sekarang;
    }
  } catch (e) {
    review = null;
    review = null;
    tahap_sekarang = null;
  }

  return review == null || tahap_sekarang == null ? (
    <ErrorResult subtitle="Unabled to display review!" />
  ) : role == "BIRO" || (role == "TIM NASIONAL" && tujuan == "ARCHIVE") ? (
    <ReviewNasionalClient review={review} />
  ) : tahap_sekarang == 2 || tahap_sekarang == 3 ? (
    <FormReviewNasional
      id_user={id_user}
      id_soal_usulan={id_soal_usulan}
      review={review}
    />
  ) : tahap_sekarang == 4 ||
    tahap_sekarang == 5 ||
    tahap_sekarang == 6 ||
    tahap_sekarang == 7 ? (
    <DisplayReview review={review} />
  ) : (
    <Result subTitle="Unabled to add or edit review" status="404" />
  );
}
