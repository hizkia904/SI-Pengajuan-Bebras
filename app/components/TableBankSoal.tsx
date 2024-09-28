import { BankSoalTableRows } from "@/interface";
import { runQuery } from "../db";
import TableBankSoalClient from "./TableBankSoalClient";

export default async function TableBankSoal() {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  let dataSource: BankSoalTableRows[] | string;
  try {
    const query =
      "select id_bank_soal,kode_soal,tahun,answer_type,rating_nasional,rating_internasional,best_task,negara.nama as negara,terpilih" +
      " from bank_soal inner join negara on negara.kode_negara=bank_soal.kode_negara order by id_bank_soal desc";
    const getTable = await runQuery(query, []);
    dataSource = getTable.rows;
  } catch (e) {
    dataSource =
      "Unable to load data for question bank table. Please try again shortly.";
  }

  return (
    <>
      <TableBankSoalClient dataSource={dataSource} />
    </>
  );
}
