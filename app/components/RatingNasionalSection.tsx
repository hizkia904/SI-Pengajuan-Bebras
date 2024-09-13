import { runQuery } from "../db";
import ErrorResult from "./ErrorResult";
import FormRating from "./FormRating";

export default async function RatingNasionalSection({
  id_user,
  id_soal_usulan,
}: {
  id_user: number | undefined;
  id_soal_usulan: string;
}) {
  let rating: any[] | string;
  try {
    const queryRating =
      "select id_rating,as_for_now,potential,time_stamp " +
      "from rating_nasional where id_user=$1 and id_soal_usulan=$2 " +
      "order by time_stamp DESC";

    const arrRating = [id_user != undefined ? id_user : 0, id_soal_usulan];

    const getRating = await runQuery(queryRating, arrRating);
    rating = getRating.rows;
  } catch (e) {
    rating = "Failed to get rating of this task";
  }
  return typeof rating == "string" ? (
    <ErrorResult subtitle={rating} />
  ) : (
    <FormRating
      id_user={id_user}
      id_soal_usulan={id_soal_usulan}
      rating={rating}
    />
  );
}
