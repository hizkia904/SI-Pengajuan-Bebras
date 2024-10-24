import { validateRequest } from "../auth";
import { runQuery } from "../db";
import ErrorResult from "./ErrorResult";
import FormReviewNasional from "./FormReviewNasional";

import ReviewNasionalClient from "./ReviewNasionalClient";

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
  let review: any[] | string;
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
    }
  } catch (e) {
    review = "Unabled to display review!";
  }

  return typeof review == "string" ? (
    <ErrorResult subtitle={review} />
  ) : role == "BIRO" || (role == "TIM NASIONAL" && tujuan == "ARCHIVE") ? (
    <ReviewNasionalClient review={review} />
  ) : (
    <FormReviewNasional
      id_user={id_user}
      id_soal_usulan={id_soal_usulan}
      review={review}
    />
  );
}
