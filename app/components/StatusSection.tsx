import { runQuery } from "../db";
import ErrorResult from "./ErrorResult";
import StatusSectionClient from "./StatusSectionClient";

export default async function StatusSection({
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
    <StatusSectionClient
      id_soal_usulan={id_soal_usulan}
      gotointernational={status.gotointernational}
      status_nasional={status.status_nasional}
      status_internasional={status.status_internasional}
    />
  ) : (
    <ErrorResult subtitle="Unabled to display status" />
  );
}
