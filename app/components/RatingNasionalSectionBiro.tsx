import { runQuery } from "../db";
import ErrorResult from "./ErrorResult";
import RatingNasionalSectionClient from "./RatingNasionalSectionClient";

export default async function RatingNasionalSectionBiro({
  id_soal_usulan,
}: {
  id_soal_usulan: string;
}) {
  let rating: any[] | null;
  let rata_rating: any;
  try {
    const queryRating =
      "select  u.id,u.nama,json_agg(json_build_object('time_stamp',r.time_stamp,'as_for_now',r.as_for_now,'potential',potential)ORDER BY time_stamp DESC)as records from rating_nasional r inner join user_bebras u on u.id=r.id_user where id_soal_usulan=$1 group by u.id,u.nama order by u.id desc ";
    const getRating = await runQuery(queryRating, [id_soal_usulan]);
    rating = getRating.rows;

    const queryRatarating =
      "with rating_from_user as" +
      " (" +
      "select distinct on(id_user,id_soal_usulan) id_soal_usulan,as_for_now " +
      "from rating_nasional where id_soal_usulan=$1 order by id_user,id_soal_usulan,time_stamp desc" +
      ") " +
      "select COALESCE(ROUND(AVG(as_for_now), 2), 0) as rata_rata from rating_from_user";
    const getRataRating = await runQuery(queryRatarating, [id_soal_usulan]);
    rata_rating = getRataRating.rows;
  } catch (e) {
    rata_rating = null;
    rating = null;
  }

  return rata_rating != null && rating != null ? (
    <RatingNasionalSectionClient
      rating={rating}
      rata_rating={rata_rating[0].rata_rata}
    />
  ) : (
    <ErrorResult subtitle="Unabled to display rating" />
  );
}
