import { TableRows } from "@/interface";
import { runQuery } from "../db";
import { TableClient } from "./TableTaskClient";
import ErrorResult from "./ErrorResult";

export default async function TabelTask() {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  let dataSource: TableRows[] | null;
  let rating: any[] | null;
  try {
    const query =
      "select soal_usulan.id_soal_usulan as key,u.nama as uploader,bu.nama as biro_uploader,bw.nama as biro_last_updated,w.nama as who_last_updated,(soal).task_title,(soal).answer_type,tahun," +
      "status_nasional,gotointernational,status_internasional,last_updated" +
      " from soal_usulan " +
      "inner join user_bebras u on soal_usulan.uploader = u.id " +
      "inner join user_bebras w on soal_usulan.who_last_updated = w.id " +
      "inner join biro bu on u.id_biro = bu.id_biro " +
      "inner join biro bw on w.id_biro = bw.id_biro " +
      "order by key DESC";
    const getData = await runQuery(query, []);
    dataSource = getData.rows;

    const query2 =
      "with rating_from_user as" +
      " (" +
      "select distinct on(id_user,id_soal_usulan) id_soal_usulan,as_for_now " +
      "from rating_nasional order by id_user,id_soal_usulan,time_stamp desc" +
      ") " +
      "select COALESCE(ROUND(AVG(as_for_now), 2), 0) as rata_rata,s.id_soal_usulan from rating_from_user r right join soal_usulan s " +
      "on r.id_soal_usulan=s.id_soal_usulan group by s.id_soal_usulan order by s.id_soal_usulan DESC";

    const getRataRating = await runQuery(query2, []);
    rating = getRataRating.rows;
  } catch (e) {
    dataSource = null;
    rating = null;
  }

  return (
    <>
      {dataSource != null && rating != null ? (
        <TableClient dataSource={dataSource} rating={rating} />
      ) : (
        <ErrorResult subtitle="Unabled to load the table of bebras task" />
      )}
    </>
  );
}
