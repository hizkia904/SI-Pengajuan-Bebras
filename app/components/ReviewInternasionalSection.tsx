import { runQuery } from "../db";
import ErrorResult from "./ErrorResult";
import FormReviewInternasional from "./FormReviewInternasional";

export default async function ReviewInternasionalSection({
  id_soal_usulan,
}: {
  id_soal_usulan: string;
}) {
  let review_internasional: any[] | string;
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
  } catch (e) {
    review_internasional = "Failed to get international review for this task";
  }

  return typeof review_internasional == "string" ? (
    <ErrorResult subtitle={review_internasional} />
  ) : (
    <FormReviewInternasional
      id_soal_usulan={id_soal_usulan}
      review_internasional={review_internasional}
    />
  );
}
