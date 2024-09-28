import { BebrasTask, imagePath } from "@/interface";
import { validateRequest } from "../auth";
import { runQuery } from "../db";
import ErrorResult from "./ErrorResult";
import FormAddTask from "./FormAddTask";

export default async function UpdateTask({
  id_soal_usulan,
}: {
  id_soal_usulan: string;
}) {
  const { user } = await validateRequest();
  const id_user = user?.id;
  let categories: any[] | null;
  let age: any[] | null;
  let anggota: any[] | null;
  let chosenAge: any[] | null;
  let chosenAuthors: any[] | null;
  let chosenCategories: any[] | null;
  let editedValue: BebrasTask | null;
  let chosenImage: imagePath[] | null;

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

    const queryChosenAuthors =
      "select id_user as authors,peran from pembuat_soal_usulan where id_soal_usulan=$1";
    const getChosenAuthors = await runQuery(queryChosenAuthors, [
      id_soal_usulan,
    ]);
    chosenAuthors = getChosenAuthors.rows;

    const queryChosenAge =
      "select id_usia as age,difficulty as diff from usia_soal_usulan where id_soal_usulan=$1";
    const getChosenAge = await runQuery(queryChosenAge, [id_soal_usulan]);
    chosenAge = getChosenAge.rows;

    const queryChosenCategories =
      "select " +
      "array_agg(id_categories) from categories_soal_usulan " +
      "where id_soal_usulan=$1 ";
    const getChosenCategories = await runQuery(queryChosenCategories, [
      id_soal_usulan,
    ]);
    chosenCategories = getChosenCategories.rows[0].array_agg;

    const queryEditedValue =
      "select " +
      "(soal).task_title," +
      "tahun," +
      "(soal).keep_order," +
      "(soal).body," +
      "(soal).question," +
      "(soal).answer_options," +
      "(soal).answer_explanation," +
      "(soal).this_is_if," +
      "(soal).this_is_ct," +
      "(soal).if_keywords," +
      "(soal).ct_keywords," +
      "(soal).wording_phrases," +
      "(soal).comments," +
      "(soal).graphics,(soal).answer_type " +
      "from soal_usulan " +
      "where id_soal_usulan=$1;";
    const getEditedValue = await runQuery(queryEditedValue, [id_soal_usulan]);
    editedValue = getEditedValue.rows[0];

    const queryChosenImage =
      'select path,file_name as "fileName" from gambar_soal_usulan where id_soal_usulan=$1';
    const getChosenImage = await runQuery(queryChosenImage, [id_soal_usulan]);
    chosenImage = getChosenImage.rows;
  } catch (e) {
    categories = null;
    age = null;
    anggota = null;
    chosenAge = null;
    chosenAuthors = null;
    chosenCategories = null;
    editedValue = null;
    chosenImage = null;
  }

  return categories != null &&
    age != null &&
    anggota != null &&
    chosenAge != null &&
    chosenAuthors != null &&
    chosenCategories != null &&
    editedValue != null &&
    chosenImage != null ? (
    <FormAddTask
      id_user={id_user}
      categories={categories}
      age={age}
      anggota={anggota}
      chosenAuthors={chosenAuthors}
      chosenAge={chosenAge}
      chosenCategories={chosenCategories}
      editedValue={editedValue}
      id_soal_usulan={id_soal_usulan}
      chosenImage={chosenImage}
    />
  ) : (
    <ErrorResult subtitle="Unabled to add task" />
  );
}
