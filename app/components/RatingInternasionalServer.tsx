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
  let ratingInternasional: any[] | string;

  try {
    const queryRating =
      "select id_rating_internasional,name,as_for_now,potential from rating_internasional_soal_usulan where id_soal_usulan=$1 order by id_rating_internasional desc";
    const getRating = await runQuery(queryRating, [id_soal_usulan]);
    ratingInternasional = getRating.rows;
  } catch (e) {
    ratingInternasional = "Unabled to display international rating";
  }
  return typeof ratingInternasional == "string" ? (
    <ErrorResult subtitle={ratingInternasional} />
  ) : role == "BIRO" || (role == "TIM NASIONAL" && tujuan == "ARCHIVE") ? (
    <RatingInternasionalClient ratingInternasional={ratingInternasional} />
  ) : (
    <FormRatingInternasional
      ratingInternasional={ratingInternasional}
      id_soal_usulan={id_soal_usulan}
    />
  );
}
