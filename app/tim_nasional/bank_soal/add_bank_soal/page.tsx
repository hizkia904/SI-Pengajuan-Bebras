import ErrorResult from "@/app/components/ErrorResult";
import FormAddBankSoal from "@/app/components/FormAddBankSoal";
import { runQuery } from "@/app/db";

export default async function Page() {
  let categories: any[] | null;
  let age: any[] | null;
  let negara: any[] | null;
  try {
    const queryCategories = "select id_categories,nama from categories";
    const getCategories = await runQuery(queryCategories, []);
    categories = getCategories.rows;
    const queryUsia =
      "select id_usia as value,from_age||'-'||to_age as label from usia;";
    const getUsia = await runQuery(queryUsia, []);
    age = getUsia.rows;

    const queryNegara = "select kode_negara,nama from negara";
    const getNegara = await runQuery(queryNegara, []);
    negara = getNegara.rows;
  } catch (e) {
    categories = null;
    age = null;
    negara = null;
  }

  return categories != null && age != null && negara != null ? (
    <FormAddBankSoal categories={categories} age={age} negara={negara} />
  ) : (
    <ErrorResult subtitle="Unabled to add question bank" />
  );
}
