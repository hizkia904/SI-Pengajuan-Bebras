import { runQuery } from "../db";
import DeadlineClient from "./DeadlineClient";

export default async function DeadlineServer() {
  const query =
    "select tahap_sekarang, " +
    "CASE WHEN tahap_sekarang = 1 then deadline_tahap1 " +
    "WHEN tahap_sekarang = 2 then deadline_tahap2 " +
    "WHEN tahap_sekarang = 3 then deadline_tahap3 " +
    "WHEN tahap_sekarang = 4 then deadline_tahap4 " +
    "WHEN tahap_sekarang = 5 then deadline_tahap5 " +
    "WHEN tahap_sekarang = 6 then deadline_tahap6 " +
    "WHEN tahap_sekarang = 7 then deadline_tahap7 ELSE NULL " +
    "END AS due_date " +
    "FROM info_bebras";
  const result = await runQuery(query, []);
  const row = result.rows[0];
  const tahap = row.tahap_sekarang;
  const due_date = new Date(row.due_date);

  return <DeadlineClient due_date={due_date} tahap={tahap} />;
}
