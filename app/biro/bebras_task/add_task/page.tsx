import { validateRequest } from "@/app/auth";
import ErrorResult from "@/app/components/ErrorResult";
import FormAddTask from "@/app/components/FormAddTask";

import { runQuery } from "@/app/db";

export default async function Page() {
  const { user } = await validateRequest();
  const id_user = user?.id;

  let categories: any[] | null;
  let age: any[] | null;
  let anggota: any[] | null;

  try {
    const queryCategories = "select id_categories,nama from categories";
    const getCategories = await runQuery(queryCategories, []);
    categories = getCategories.rows;

    const queryAge =
      "select id_usia as value,from_age||'-'||to_age as label from usia";
    const getAge = await runQuery(queryAge, []);
    age = getAge.rows;

    const queryAnggota =
      "select id as value,nama as label from user_bebras where role='BIRO'";
    const getAnggota = await runQuery(queryAnggota, []);
    anggota = getAnggota.rows;
  } catch (e) {
    categories = null;
    age = null;
    anggota = null;
  }

  return (
    <>
      {categories != null && age != null && anggota != null ? (
        <FormAddTask
          id_user={id_user}
          categories={categories}
          age={age}
          anggota={anggota}
        />
      ) : (
        <ErrorResult subtitle="Unabled to add task" />
      )}
    </>
  );
}
