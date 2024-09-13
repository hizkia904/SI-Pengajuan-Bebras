import { runQuery } from "../db";
import ErrorResult from "./ErrorResult";
import ReviewNasionalSectionClient from "./ReviewNasionalSectionClient";

export default async function ReviewNasionalSectionBiro({
  id_soal_usulan,
}: {
  id_soal_usulan: string;
}) {
  let review: any[] | string;

  try {
    const queryReview =
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
  } catch (e) {
    review = "Unabled to display review!";
  }

  return typeof review == "string" ? (
    <ErrorResult subtitle={review} />
  ) : (
    <ReviewNasionalSectionClient review={review} />
  );
}
