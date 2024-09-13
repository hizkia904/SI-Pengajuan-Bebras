import { runQuery } from "../db";
import ErrorResult from "./ErrorResult";
import StatusSectionBiroClient from "./StatusSectionBiroClient";

export default async function StatusSectionBiro({
  id_soal_usulan,
}: {
  id_soal_usulan: string;
}) {
  let status: any;
  try {
    const query =
      "select status_nasional,gotointernational,status_internasional from soal_usulan where id_soal_usulan=$1";
    const getStatus = await runQuery(query, [id_soal_usulan]);
    status = getStatus.rows[0];
  } catch (e) {
    status = null;
  }

  return status != null ? (
    <StatusSectionBiroClient status={status} />
  ) : (
    <ErrorResult subtitle="Unabled to display status" />
  );
}
