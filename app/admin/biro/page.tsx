import ErrorResult from "@/app/components/ErrorResult";
import TableBiro from "@/app/components/TableBiro";
import TableCategories from "@/app/components/TableCategories";
import { runQuery } from "@/app/db";

export default async function Page() {
  let biro: any[] | string;

  try {
    const queryBiro = "select id_biro,nama from biro order by id_biro";
    const getBiro = await runQuery(queryBiro, []);
    biro = getBiro.rows;
  } catch (e) {
    biro = "Unabled to load Biro";
  }
  return typeof biro != "string" ? (
    <TableBiro dataSource={biro} />
  ) : (
    <ErrorResult subtitle={biro} />
  );
}
