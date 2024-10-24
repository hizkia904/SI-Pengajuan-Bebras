import { validateRequest } from "../auth";
import { runQuery } from "../db";
import ErrorResult from "./ErrorResult";
import FormRatingNasional from "./FormRatingNasional";

import RatingNasionalClient from "./RatingNasionalClient";

export default async function RatingNasionalServer({
  id_soal_usulan,
  tujuan,
}: {
  id_soal_usulan: string;
  tujuan: "ARCHIVE" | "PENGAJUAN";
}) {
  const { user } = await validateRequest();
  if (user == null) {
    return <p>..</p>;
  }
  const id_user = user.id;
  const role = user.role;
  let rating: any[] | null;
  let rata_rating: any;
  try {
    if (role == "BIRO" || (role == "TIM NASIONAL" && tujuan == "ARCHIVE")) {
      const queryRating =
        "select  u.id,u.nama,json_agg(json_build_object('time_stamp',r.time_stamp,'as_for_now',r.as_for_now,'potential',potential)ORDER BY time_stamp DESC)as records from rating_nasional r inner join user_bebras u on u.id=r.id_user where id_soal_usulan=$1 group by u.id,u.nama order by u.id desc ";
      const getRating = await runQuery(queryRating, [id_soal_usulan]);
      rating = getRating.rows;
    } else {
      const queryRating =
        "select id_rating,as_for_now,potential,time_stamp " +
        "from rating_nasional where id_user=$1 and id_soal_usulan=$2 " +
        "order by time_stamp DESC";
      const arrRating = [id_user, id_soal_usulan];
      const getRating = await runQuery(queryRating, arrRating);
      rating = getRating.rows;
    }

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
    role == "BIRO" || (role == "TIM NASIONAL" && tujuan == "ARCHIVE") ? (
      <RatingNasionalClient
        rating={rating}
        rata_rating={rata_rating[0].rata_rata}
      />
    ) : (
      <FormRatingNasional
        rata_rating={rata_rating[0].rata_rata}
        id_user={id_user}
        id_soal_usulan={id_soal_usulan}
        rating={rating}
      />
    )
  ) : (
    <ErrorResult subtitle="Unabled to display rating" />
  );
}
