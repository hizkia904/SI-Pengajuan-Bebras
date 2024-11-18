import { validateRequest } from "../auth";
import { runQuery } from "../db";
import ErrorResult from "./ErrorResult";
import StatusClient from "./StatusClient";

export default async function StatusServer({
  id_soal_usulan,
  tujuan,
}: {
  id_soal_usulan: string;
  tujuan: "ARCHIVE" | "PENGAJUAN";
}) {
  const { user } = await validateRequest();
  if (user == null) {
    return <p>....</p>;
  }
  const role = user.role;
  const ketua = user.ketua;
  let status: any;
  let tahap_sekarang: number | null;
  try {
    const query =
      "select status_nasional,gotointernational,status_internasional from soal_usulan where id_soal_usulan=$1";
    const getStatus = await runQuery(query, [id_soal_usulan]);
    status = getStatus.rows[0];

    const queryTahapSekarang = "select tahap_sekarang from info_bebras";
    const getTahapSekarang = await runQuery(queryTahapSekarang, []);
    tahap_sekarang = getTahapSekarang.rows[0].tahap_sekarang;
  } catch (e) {
    status = null;
    tahap_sekarang = null;
  }

  return status != null && tahap_sekarang != null ? (
    <StatusClient
      status={status}
      role={role}
      id_soal_usulan={id_soal_usulan}
      tujuan={tujuan}
      tahap_sekarang={tahap_sekarang}
      ketua={ketua}
    />
  ) : (
    <ErrorResult subtitle="Unabled to display status" />
  );
}
