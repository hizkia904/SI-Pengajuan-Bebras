import { TableRows } from "@/interface";
import { validateRequest } from "../auth";
import { runQuery } from "../db";
import { TableArchiveClient } from "./TableArchiveClient";
import ErrorResult from "./ErrorResult";

export default async function TableArchiveServer({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { user } = await validateRequest();
  if (user == null) {
    return (
      <TableArchiveClient
        role="BIRO"
        dataSource={[]}
        rating={[]}
        total={0}
        biro={[]}
        ketua={false}
      />
    );
  }
  let dataSource: TableRows[] | null;
  let rating: any[] | null;
  let total: number | null;
  let biro: any[] | null;

  const role = user.role;
  const id_user = user.id;
  const ketua = user.ketua;
  const { p, a, s, biro_uploader, stat_nas, go_inter, stat_inter, t } =
    searchParams;
  let counter = 1;
  const arr = [];
  let filterQuery = "";
  if (a != undefined && typeof a == "string") {
    arr.push(a);
    filterQuery += ` and (soal).answer_type=$${counter} `;
    counter += 1;
  }
  if (s != undefined && typeof s == "string") {
    arr.push("%" + s + "%");
    filterQuery += ` and (soal).task_title ilike $${counter} `;
    counter += 1;
  }
  if (biro_uploader != undefined && typeof biro_uploader == "string") {
    arr.push(biro_uploader);
    filterQuery += ` and u.id_biro=$${counter} `;
    counter += 1;
  }
  if (stat_nas != undefined && typeof stat_nas == "string") {
    arr.push(stat_nas);
    filterQuery += ` and s.status_nasional=UPPER($${counter}) `;
    counter += 1;
  }
  if (go_inter != undefined && typeof go_inter == "string") {
    arr.push(go_inter);
    filterQuery += ` and s.gotointernational=$${counter} `;
    counter += 1;
  }
  if (stat_inter != undefined && typeof stat_inter == "string") {
    arr.push(stat_inter);
    filterQuery += ` and s.status_internasional=UPPER($${counter}) `;
    counter += 1;
  }
  if (t != undefined && typeof t == "string") {
    arr.push(t);
    filterQuery += ` and s.tahun=$${counter} `;
    counter += 1;
  }

  const additionQuery =
    "left join pembuat_soal_usulan p on " +
    "p.id_soal_usulan = s.id_soal_usulan ";

  const additionCondition = ` and (p.id_user=$${counter} or s.uploader=$${counter}) `;
  try {
    let offset: number;
    if (typeof p == "string") {
      if (Number.isNaN(parseInt(p))) {
        throw new Error();
      } else {
        offset = (parseInt(p) - 1) * 10;
      }
    } else {
      throw new Error();
    }
    let queryTotal =
      "select count( distinct s.id_soal_usulan) as total" +
      " from soal_usulan s " +
      "inner join user_bebras u on s.uploader = u.id " +
      "inner join user_bebras w on s.who_last_updated = w.id " +
      "inner join biro bu on u.id_biro = bu.id_biro " +
      `inner join biro bw on w.id_biro = bw.id_biro ${
        role == "BIRO" ? additionQuery : ""
      }` +
      `where s.archived=true ${role == "BIRO" ? additionCondition : ""} ` +
      filterQuery;

    const getTotal = await runQuery(
      queryTotal,
      role == "BIRO" ? [...arr, id_user] : [...arr]
    );
    const totalRows = getTotal.rows;
    total = totalRows[0].total;

    const queryData =
      "select distinct on(s.id_soal_usulan) s.id_soal_usulan as key,u.nama as uploader,bu.nama as biro_uploader,bw.nama as biro_last_updated,w.nama as who_last_updated,(soal).task_title,(soal).answer_type,tahun," +
      "status_nasional,gotointernational,status_internasional,last_updated" +
      " from soal_usulan s " +
      "inner join user_bebras u on s.uploader = u.id " +
      "inner join user_bebras w on s.who_last_updated = w.id " +
      "inner join biro bu on u.id_biro = bu.id_biro " +
      `inner join biro bw on w.id_biro=bw.id_biro ${
        role == "BIRO" ? additionQuery : ""
      }` +
      `where s.archived=true ${role == "BIRO" ? additionCondition : ""}` +
      filterQuery +
      " order by key DESC " +
      `LIMIT 10 OFFSET $${role == "BIRO" ? counter + 1 : counter}`;
    const getData = await runQuery(
      queryData,
      role == "BIRO" ? [...arr, id_user, offset] : [...arr, offset]
    );
    dataSource = getData.rows;

    const queryRating =
      "with rating_from_user as" +
      " (" +
      "select distinct on(r.id_user,r.id_soal_usulan) r.id_soal_usulan,r.as_for_now " +
      "from rating_nasional r inner join soal_usulan s on r.id_soal_usulan=s.id_soal_usulan " +
      `inner join user_bebras u on s.uploader = u.id ${
        role == "BIRO" ? additionQuery : ""
      }` +
      `where s.archived=true ${role == "BIRO" ? additionCondition : ""}` +
      filterQuery +
      "order by r.id_user,r.id_soal_usulan,r.time_stamp desc" +
      ") " +
      "select COALESCE(ROUND(AVG(as_for_now), 2), 0) as rata_rata,s.id_soal_usulan from " +
      "rating_from_user r right join soal_usulan s " +
      "on r.id_soal_usulan=s.id_soal_usulan " +
      `inner join user_bebras u on s.uploader = u.id ${
        role == "BIRO" ? additionQuery : ""
      }` +
      `where s.archived=true ${role == "BIRO" ? additionCondition : ""}` +
      filterQuery +
      `group by s.id_soal_usulan order by s.id_soal_usulan DESC LIMIT 10 OFFSET $${
        role == "BIRO" ? counter + 1 : counter
      }`;

    const getRataRating = await runQuery(
      queryRating,
      role == "BIRO" ? [...arr, id_user, offset] : [...arr, offset]
    );
    rating = getRataRating.rows;

    rating = rating.reduce((acc, row) => {
      acc[row.id_soal_usulan] = row;
      return acc;
    }, {});

    const queryBiro = "select id_biro,nama from biro order by id_biro";
    const getBiro = await runQuery(queryBiro, []);
    biro = getBiro.rows;
  } catch (e) {
    dataSource = null;
    rating = null;
    total = null;
    biro = null;
  }

  return (
    <>
      {dataSource != null && rating != null && total != null && biro != null ? (
        <TableArchiveClient
          role={role}
          dataSource={dataSource}
          rating={rating}
          total={total}
          biro={biro}
          ketua={ketua}
        />
      ) : (
        <ErrorResult subtitle="Unabled to load table of task" />
      )}
    </>
  );
}
