import ErrorResult from "@/app/components/ErrorResult";
import TableUsia from "@/app/components/TableUsia";
import { runQuery } from "@/app/db";

export default async function Page() {
  let usia: any[] | string;
  try {
    const queryUsia =
      "select id_usia,from_age,to_age from usia order by id_usia";
    const getUsia = await runQuery(queryUsia, []);
    usia = getUsia.rows;
  } catch (e) {
    usia = "Unabled to load age";
  }
  return typeof usia != "string" ? (
    <TableUsia dataSource={usia} />
  ) : (
    <ErrorResult subtitle={usia} />
  );
}
