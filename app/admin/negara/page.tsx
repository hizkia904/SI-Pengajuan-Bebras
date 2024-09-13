import ErrorResult from "@/app/components/ErrorResult";
import TableNegara from "@/app/components/TableNegara";
import { runQuery } from "@/app/db";

export default async function Page() {
  let negara: any[] | string;

  try {
    const queryNegara =
      "select kode_negara,nama from negara order by kode_negara";
    const getNegara = await runQuery(queryNegara, []);
    negara = getNegara.rows;
  } catch (e) {
    negara = "Unabled to load countries";
  }
  return typeof negara != "string" ? (
    <TableNegara dataSource={negara} />
  ) : (
    <ErrorResult subtitle={negara} />
  );
}
