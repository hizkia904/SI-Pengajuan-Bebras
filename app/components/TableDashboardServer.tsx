import { DashboardData, Grafik } from "@/interface";
import ErrorResult from "./ErrorResult";
import TabelDashboardClient from "./TabelDashboardClient";
import { runQuery } from "../db";
import { validateRequest } from "../auth";

export default async function TableDashboardServer() {
  let dashboard: DashboardData[] | null;
  let grafik: Grafik | null = {
    tahun: [],
    nasionalaccepted: [],
    nasionalrejected: [],
    gotointernational: [],
    internationalaccepted: [],
    internationalheldback: [],
    internationalworkNeeded: [],
    totalsoalterkumpul: [],
    partisipasibiro: [],
  };
  const { user } = await validateRequest();
  if (user == null) {
    return <p>Tidak ada role</p>;
  }
  const id_user = user.id;
  const role = user.role;
  const tambahanQueryUntukBiro =
    " inner join pembuat_soal_usulan p on p.id_soal_usulan=s.id_soal_usulan ";
  const tambahanQueryUntukBiro2 = "and p.id_user=$1 ";
  try {
    const queryDashboardData =
      "select tahun," +
      "count( case when status_nasional='ACCEPTED' then 1 END) as nasionalaccepted," +
      "count( case when status_nasional='REJECTED' then 1 END) as nasionalrejected," +
      "count( case when gotointernational=true then 1 END) as gotointernational," +
      "count( case when status_internasional='ACCEPTED' then 1 END) as internationalaccepted," +
      "count( case when status_internasional='HELDBACK' then 1 END) as internationalheldback," +
      "count( case when status_internasional='WORK NEEDED' then 1 END) as internationalworkneeded," +
      "count(s.id_soal_usulan) as totalsoalterkumpul," +
      "count( distinct biro) as partisipasibiro " +
      `from soal_usulan s ${role == "BIRO" ? tambahanQueryUntukBiro : ""}` +
      `where archived=true ${role == "BIRO" ? tambahanQueryUntukBiro2 : ""}` +
      "group by tahun order by tahun";
    const getDashboardData = await runQuery(
      queryDashboardData,
      role == "BIRO" ? [id_user] : []
    );
    dashboard = getDashboardData.rows;

    for (let i = 0; i < dashboard.length; i++) {
      grafik.tahun.push(dashboard[i].tahun);
      grafik.nasionalaccepted.push(dashboard[i].nasionalaccepted);
      grafik.nasionalrejected.push(dashboard[i].nasionalrejected);
      grafik.gotointernational.push(dashboard[i].gotointernational);
      grafik.internationalaccepted.push(dashboard[i].internationalaccepted);
      grafik.internationalheldback.push(dashboard[i].internationalheldback);
      grafik.internationalworkNeeded.push(dashboard[i].internationalworkneeded);
      grafik.totalsoalterkumpul.push(dashboard[i].totalsoalterkumpul);
      grafik.partisipasibiro.push(dashboard[i].partisipasibiro);
    }
    console.log(grafik.internationalworkNeeded);
  } catch (e) {
    console.log(e);
    dashboard = null;
    grafik = null;
  }
  return dashboard != null && grafik != null ? (
    <TabelDashboardClient dashboardData={dashboard} grafik={grafik} />
  ) : (
    <ErrorResult subtitle="Unabled to display dashboard" />
  );
}
