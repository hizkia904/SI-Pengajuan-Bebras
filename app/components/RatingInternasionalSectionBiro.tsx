import { runQuery } from "../db";
import ErrorResult from "./ErrorResult";
import RatingInternasionalSectionClient from "./RatingInternasionalSectionClient";

export default async function RatingInternasionalSectionBiro({
  id_soal_usulan,
}: {
  id_soal_usulan: string;
}) {
  let rating: any[] | string;

  try {
    const queryRating =
      "select id_rating_internasional,name,as_for_now,potential from rating_internasional_soal_usulan where id_soal_usulan=$1 order by id_rating_internasional desc";
    const getRating = await runQuery(queryRating, [id_soal_usulan]);
    rating = getRating.rows;
  } catch (e) {
    rating = "Unabled to display international rating";
  }
  return typeof rating == "string" ? (
    <ErrorResult subtitle={rating} />
  ) : (
    <RatingInternasionalSectionClient rating={rating} />
  );
}
