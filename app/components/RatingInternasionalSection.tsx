import { runQuery } from "../db";
import ErrorResult from "./ErrorResult";
import FormRatingInternasional from "./FormRatingInternasional";

export default async function RatingInternasionalSection({
  id_user,
  id_soal_usulan,
}: {
  id_user: number | undefined;
  id_soal_usulan: string;
}) {
  let ratingInternasional: any[] | string;
  try {
    const queryRatingInternasional =
      "select id_rating_internasional,name,as_for_now,potential " +
      "from rating_internasional_soal_usulan where id_soal_usulan=$1 order by id_rating_internasional desc";

    const arrRatingInternasional = [id_soal_usulan];

    const getRatingInternasional = await runQuery(
      queryRatingInternasional,
      arrRatingInternasional
    );

    ratingInternasional = getRatingInternasional.rows;
  } catch (e) {
    ratingInternasional = "Failed to get Rating International of this task";
  }
  return typeof ratingInternasional == "string" ? (
    <ErrorResult subtitle={ratingInternasional} />
  ) : (
    <FormRatingInternasional
      id_user={id_user}
      id_soal_usulan={id_soal_usulan}
      ratingInternasional={ratingInternasional}
    />
  );
}
