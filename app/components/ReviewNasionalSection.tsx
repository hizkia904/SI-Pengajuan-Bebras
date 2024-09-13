import { runQuery } from "../db";
import ErrorResult from "./ErrorResult";
import FormReview from "./FormReview";

export default async function ReviewNasionalSection({
  id_user,
  id_soal_usulan,
}: {
  id_user: number | undefined;
  id_soal_usulan: string;
}) {
  //   await new Promise((resolve) => setTimeout(resolve, 10000));
  let review: any[] | string;
  try {
    const queryGetReview =
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

    //   const { user } = await validateRequest();
    const arrReview = [id_user != undefined ? id_user : 0, id_soal_usulan];

    const getReview = await runQuery(queryGetReview, arrReview);

    review = getReview.rows;
  } catch (e) {
    review = "Failed to get review of this task";
  }
  return typeof review == "string" ? (
    <ErrorResult subtitle={review} />
  ) : (
    <FormReview
      id_user={id_user}
      id_soal_usulan={id_soal_usulan}
      review={review}
    />
  );
}
