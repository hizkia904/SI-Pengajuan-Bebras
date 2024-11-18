import { validateRequest } from "@/app/auth";
import ErrorResult from "@/app/components/ErrorResult";
import FormAddTask from "@/app/components/FormAddTask";

import { runQuery } from "@/app/db";
import { Result } from "antd/lib";

export default async function Page() {
  const { user } = await validateRequest();
  if (user == null) {
    return <p>....</p>;
  }
  const role = user.role;
  const id_user = user.id;

  let categories: any[] | null;
  let age: any[] | null;
  let anggota: any[] | null;
  let tahap_sekarang: number | null;
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

    const query = "select tahap_sekarang from info_bebras";
    const getTahapSekarang = await runQuery(query, []);
    tahap_sekarang = getTahapSekarang.rows[0].tahap_sekarang;
  } catch (e) {
    categories = null;
    age = null;
    anggota = null;
    tahap_sekarang = null;
  }

  return (
    <>
      {categories != null &&
      age != null &&
      anggota != null &&
      tahap_sekarang != null ? (
        tahap_sekarang <= 4 ? (
          <FormAddTask
            id_user={id_user}
            categories={categories}
            age={age}
            anggota={anggota}
            roleUser={role}
          />
        ) : (
          <Result
            status={403}
            title="You can't add task"
            subTitle="You can't add task because the time for submitting task is over"
          />
        )
      ) : (
        <ErrorResult subtitle="Unabled to add task" />
      )}
    </>
  );
}
