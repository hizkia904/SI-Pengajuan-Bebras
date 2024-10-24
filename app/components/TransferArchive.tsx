import { Transfer } from "antd/lib";
import { runQuery } from "../db";
import TransferArchiveClient from "./TransferArchiveClient";
import TransferArchiveClient2 from "./TransferArchiveClient2";

export default async function TransferArchive() {
  let archiveAccepted: any[] | null;
  let pengajuanDariArchived: any[] | null;
  try {
    const queryArchiveAccepted =
      "select id_soal_usulan as key,(soal).task_title,tahun,(soal).answer_type " +
      "from soal_usulan s " +
      "where (s.archived=false and status_nasional='ADDED FROM ARCHIVE' and gotointernational=true) or (s.archived=true and s.status_nasional='ACCEPTED' and s.gotointernational=false)";
    const getArchiveAccepted = await runQuery(queryArchiveAccepted, []);
    archiveAccepted = getArchiveAccepted.rows;

    const queryPengajuanDariArchived =
      "select  array_agg(id_soal_usulan) " +
      "from soal_usulan s " +
      "where s.archived = false and s.status_nasional='ADDED FROM ARCHIVE' and gotointernational=true ";
    const getPengajuanDariArchived = await runQuery(
      queryPengajuanDariArchived,
      []
    );
    if (getPengajuanDariArchived.rows[0].array_agg == null) {
      pengajuanDariArchived = [];
    } else {
      pengajuanDariArchived = getPengajuanDariArchived.rows[0].array_agg;
    }

    console.log(getPengajuanDariArchived.rows);
  } catch (e) {
    archiveAccepted = null;
    pengajuanDariArchived = null;
  }

  return (
    <>
      {archiveAccepted != null && pengajuanDariArchived != null ? (
        <TransferArchiveClient2
          archiveAccepted={archiveAccepted}
          pengajuanDariArchived={pengajuanDariArchived}
        />
      ) : (
        <p>error</p>
      )}
    </>
  );
}
