import ErrorResult from "@/app/components/ErrorResult";
import TableCategories from "@/app/components/TableCategories";
import { runQuery } from "@/app/db";

export default async function Page() {
  let categories: any[] | string;

  try {
    const queryCategories =
      "select id_categories,nama from categories order by id_categories";
    const getCategories = await runQuery(queryCategories, []);
    categories = getCategories.rows;
  } catch (e) {
    categories = "Unabled to load categories";
  }
  return typeof categories != "string" ? (
    <TableCategories dataSource={categories} />
  ) : (
    <ErrorResult subtitle={categories} />
  );
}
