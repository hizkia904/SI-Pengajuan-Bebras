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
  const tambahanQueryUntukBiro2 = "and p.id_user=$1 ";
  const tambahanQueryUntukTimNasional =
    ",count( distinct id_biro) as partisipasibiro ";
  try {
    const queryDashboardData =
      "select tahun," +
      "count( DISTINCT case when status_nasional='ACCEPTED' then s.id_soal_usulan END) as nasionalaccepted," +
      "count( DISTINCT case when status_nasional='REJECTED' then s.id_soal_usulan END) as nasionalrejected," +
      "count( DISTINCT case when gotointernational=true then s.id_soal_usulan END) as gotointernational," +
      "count( DISTINCT case when status_internasional='ACCEPTED' then s.id_soal_usulan END) as internationalaccepted," +
      "count( DISTINCT case when status_internasional='HELDBACK' then s.id_soal_usulan END) as internationalheldback," +
      "count( DISTINCT case when status_internasional='WORK NEEDED' then s.id_soal_usulan END) as internationalworkneeded," +
      `count(distinct s.id_soal_usulan) as totalsoalterkumpul ${
        role == "TIM NASIONAL" ? tambahanQueryUntukTimNasional : " "
      }` +
      `from soal_usulan s ` +
      " inner join pembuat_soal_usulan p on p.id_soal_usulan=s.id_soal_usulan " +
      " inner join user_bebras u on u.id=p.id_user " +
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
  } catch (e) {
    dashboard = null;
    grafik = null;
  }
  return dashboard != null && grafik != null ? (
    <TabelDashboardClient
      role={role}
      dashboardData={dashboard}
      grafik={grafik}
    />
  ) : (
    <ErrorResult subtitle="Unabled to display dashboard" />
  );
}
