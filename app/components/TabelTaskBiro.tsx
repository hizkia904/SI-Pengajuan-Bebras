import { TableRows } from "@/interface";
import { runQuery } from "../db";
import { TableClient } from "./TableTaskClient";
import { TableClientBiro } from "./TableClientBiro";
import { validateRequest } from "../auth";
import ErrorResult from "./ErrorResult";

export default async function TabelTaskBiro() {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  let dataSource: TableRows[] | null;
  let rating: any[] | null;
  const { user } = await validateRequest();

  try {
    const query =
      "select soal_usulan.id_soal_usulan as key,u.nama as uploader,bu.nama as biro_uploader,bw.nama as biro_last_updated,w.nama as who_last_updated,(soal).task_title,(soal).answer_type,tahun," +
      "status_nasional,gotointernational,status_internasional,last_updated" +
      " from soal_usulan " +
      "inner join user_bebras u on soal_usulan.uploader = u.id " +
      "inner join user_bebras w on soal_usulan.who_last_updated = w.id " +
      "inner join biro bu on u.id_biro = bu.id_biro " +
      "inner join biro bw on w.id_biro=bw.id_biro " +
      "inner join pembuat_soal_usulan p on " +
      "p.id_soal_usulan = soal_usulan.id_soal_usulan " +
      "where p.id_user=$1 order by key DESC";
    const getData = await runQuery(query, [user?.id || null]);
    dataSource = getData.rows;

    const query2 =
      "with rating_from_user as" +
      " (" +
      "select distinct on(r.id_user,r.id_soal_usulan) r.id_soal_usulan,as_for_now " +
      "from rating_nasional r " +
      "inner join pembuat_soal_usulan p " +
      "on r.id_soal_usulan=p.id_soal_usulan " +
      "where p.id_user=$1 " +
      "order by r.id_user,r.id_soal_usulan,time_stamp desc" +
      ") " +
      "select COALESCE(ROUND(AVG(as_for_now), 2), 0) as rata_rata,s.id_soal_usulan from rating_from_user r right join soal_usulan s " +
      "on r.id_soal_usulan=s.id_soal_usulan " +
      "inner join pembuat_soal_usulan p on s.id_soal_usulan=p.id_soal_usulan " +
      "where p.id_user=$1 " +
      "group by s.id_soal_usulan order by s.id_soal_usulan DESC";

    const getRataRating = await runQuery(query2, [user?.id || null]);
    rating = getRataRating.rows;
  } catch (e) {
    dataSource = null;
    rating = null;
  }

  return (
    <>
      {dataSource != null && rating != null ? (
        <TableClientBiro dataSource={dataSource} rating={rating} />
      ) : (
        <ErrorResult subtitle="Unabled to load table of task" />
      )}
    </>
  );
}
