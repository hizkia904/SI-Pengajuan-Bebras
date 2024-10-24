import { validateRequest } from "@/app/auth";
import ErrorResult from "@/app/components/ErrorResult";
import FormAddTask from "@/app/components/FormAddTask";

import { runQuery } from "@/app/db";
import { Result } from "antd";

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
  let tahap_sekarang: any | null;
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

    const queryTahapSekarang = "select tahap_sekarang from info_bebras";
    const getTahapSekarang = await runQuery(queryTahapSekarang, []);
    const tahap_rows = getTahapSekarang.rows;
    tahap_sekarang = tahap_rows[0].tahap_sekarang;
  } catch (e) {
    categories = null;
    age = null;
    anggota = null;
  }

  return (
    <>
      {categories != null &&
      age != null &&
      anggota != null &&
      tahap_sekarang != null ? (
        tahap_sekarang == 1 ? (
          <FormAddTask
            id_user={id_user}
            categories={categories}
            age={age}
            anggota={anggota}
            roleUser={role}
          />
        ) : (
          <Result
            status="403"
            title="Submission Task Period has ended"
            subTitle="You cannot submit the task again as the submission period has ended."
          />
        )
      ) : (
        <ErrorResult subtitle="Unabled to add task" />
      )}
    </>
  );
}
