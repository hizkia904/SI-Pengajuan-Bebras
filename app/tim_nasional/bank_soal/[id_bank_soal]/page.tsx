import CustomizeSwitch from "@/app/components/CustomizeSwitch";
import { Skeleton } from "antd/lib";
import { Suspense } from "react";
import { Age, BankSoalGeneralInfo, Categories, KontenSoal } from "@/interface";
import { runQuery } from "@/app/db";
import BankSoalClient from "@/app/components/BankSoalClient";
import FormAddBankSoal from "@/app/components/FormAddBankSoal";
import ErrorResult from "@/app/components/ErrorResult";
export default async function Page({
  params,
}: {
  params: { id_bank_soal: string };
}) {
  const { id_bank_soal } = params;

  return (
    <>
      <CustomizeSwitch>
        <Suspense key="view" fallback={<Skeleton active />}>
          <BankSoal id_bank_soal={id_bank_soal} />
        </Suspense>
        <Suspense key="edit" fallback={<Skeleton active />}>
          <UpdateBankSoal id_bank_soal={id_bank_soal} />
        </Suspense>
      </CustomizeSwitch>
    </>
  );
}

async function BankSoal({ id_bank_soal }: { id_bank_soal: string }) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  let infoSoal: BankSoalGeneralInfo | string;
  try {
    const queryInfoSoal =
      "select " +
      "kode_soal,tahun,answer_type,rating_internasional,rating_nasional,best_task,terpilih,keep_order,negara.nama as negara,authors,comments,graphics " +
      "from bank_soal inner join negara on negara.kode_negara=bank_soal.kode_negara where id_bank_soal=$1";

    const getInfoSoal = await runQuery(queryInfoSoal, [id_bank_soal]);

    infoSoal = getInfoSoal.rows[0];
  } catch (e) {
    infoSoal = "Unabled to get this field";
  }
  let versi_indonesia: KontenSoal | string;
  try {
    const queryVersiIndonesia =
      "select " +
      "(versi_indonesia).task_title," +
      "(versi_indonesia).body," +
      "(versi_indonesia).question," +
      "(versi_indonesia).answer_options," +
      "(versi_indonesia).answer_explanation," +
      "(versi_indonesia).this_is_if," +
      "(versi_indonesia).this_is_ct," +
      "(versi_indonesia).if_keywords," +
      "(versi_indonesia).ct_keywords," +
      "(versi_indonesia).wording_phrases from bank_soal where id_bank_soal=$1";

    const getVersiIndonesia = await runQuery(queryVersiIndonesia, [
      id_bank_soal,
    ]);

    versi_indonesia = getVersiIndonesia.rows[0];
  } catch (e) {
    versi_indonesia = "Unabled to load this field in Indonesian";
  }

  let versi_inggris: KontenSoal | string;
  try {
    const queryVersiInggris =
      "select " +
      "(versi_inggris).task_title," +
      "(versi_inggris).body," +
      "(versi_inggris).question," +
      "(versi_inggris).answer_options," +
      "(versi_inggris).answer_explanation," +
      "(versi_inggris).this_is_if," +
      "(versi_inggris).this_is_ct," +
      "(versi_inggris).if_keywords," +
      "(versi_inggris).ct_keywords," +
      "(versi_inggris).wording_phrases from bank_soal where id_bank_soal=$1";

    const getVersiInggris = await runQuery(queryVersiInggris, [id_bank_soal]);

    versi_inggris = getVersiInggris.rows[0];
  } catch (e) {
    versi_inggris = "Unabled to load this field in English";
  }

  let categories: Categories[] | string;
  try {
    const categoriesQuery =
      "select " +
      "c.nama from categories c inner join categories_bank_soal b " +
      "on c.id_categories=b.id_categories where b.id_bank_soal=$1 order by c.id_categories";

    const getCategories = await runQuery(categoriesQuery, [id_bank_soal]);

    categories = getCategories.rows;
  } catch (e) {
    categories = "Unabled to load chosen categories!";
  }

  let age: Age[] | string;
  try {
    const queryAge =
      "select u.from_age||'-'||u.to_age as range_age,b.difficulty from usia u inner join usia_bank_soal b on " +
      "u.id_usia=b.id_usia where b.id_bank_soal=$1 order by u.id_usia";

    const getAge = await runQuery(queryAge, [id_bank_soal]);

    age = getAge.rows;
  } catch (e) {
    age = "Unabled to load chosen age!";
  }

  return (
    <>
      <BankSoalClient
        infoSoal={infoSoal}
        age={age}
        categories={categories}
        versi_indonesia={versi_indonesia}
        versi_inggris={versi_inggris}
      />
    </>
  );
}

async function UpdateBankSoal({ id_bank_soal }: { id_bank_soal: string }) {
  let categories: any[] | null;
  let age: any[] | null;
  let negara: any[] | null;
  let infoSoal: BankSoalGeneralInfo | null;
  let versi_indonesia: KontenSoal | null;
  let versi_inggris: KontenSoal | null;
  let chosenCategories: any[] | null;
  let chosenAge: any[] | null;
  let chosenImage: any[] | null;
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

    const queryInfoSoal =
      "select " +
      "kode_soal,tahun,answer_type,rating_internasional,rating_nasional,best_task,terpilih,keep_order,kode_negara as negara,authors,comments,graphics " +
      "from bank_soal where id_bank_soal=$1";

    const getInfoSoal = await runQuery(queryInfoSoal, [id_bank_soal]);

    infoSoal = getInfoSoal.rows[0];

    const queryVersiIndonesia =
      "select " +
      "(versi_indonesia).task_title," +
      "(versi_indonesia).body," +
      "(versi_indonesia).question," +
      "(versi_indonesia).answer_options," +
      "(versi_indonesia).answer_explanation," +
      "(versi_indonesia).this_is_if," +
      "(versi_indonesia).this_is_ct," +
      "(versi_indonesia).if_keywords," +
      "(versi_indonesia).ct_keywords," +
      "(versi_indonesia).wording_phrases from bank_soal where id_bank_soal=$1";

    const getVersiIndonesia = await runQuery(queryVersiIndonesia, [
      id_bank_soal,
    ]);

    versi_indonesia = getVersiIndonesia.rows[0];

    const queryVersiInggris =
      "select " +
      "(versi_inggris).task_title," +
      "(versi_inggris).body," +
      "(versi_inggris).question," +
      "(versi_inggris).answer_options," +
      "(versi_inggris).answer_explanation," +
      "(versi_inggris).this_is_if," +
      "(versi_inggris).this_is_ct," +
      "(versi_inggris).if_keywords," +
      "(versi_inggris).ct_keywords," +
      "(versi_inggris).wording_phrases from bank_soal where id_bank_soal=$1";

    const getVersiInggris = await runQuery(queryVersiInggris, [id_bank_soal]);

    versi_inggris = getVersiInggris.rows[0];

    const categoriesQuery =
      "select " +
      "array_agg(b.id_categories) from categories_bank_soal b " +
      "where b.id_bank_soal=$1 ";

    const getChosenCategories = await runQuery(categoriesQuery, [id_bank_soal]);

    chosenCategories = getChosenCategories.rows[0].array_agg;

    const queryAge =
      "select  u.id_usia as age,u.difficulty as diff from usia_bank_soal u " +
      "where u.id_bank_soal=$1 order by u.id_usia";

    const getAge = await runQuery(queryAge, [id_bank_soal]);

    chosenAge = getAge.rows;

    const queryChosenImage =
      'select path,file_name as "fileName" from gambar_bank_soal where id_bank_soal=$1';
    const getChosenImage = await runQuery(queryChosenImage, [id_bank_soal]);
    chosenImage = getChosenImage.rows;
  } catch (e) {
    categories = null;
    age = null;
    negara = null;
    infoSoal = null;
    versi_indonesia = null;
    versi_inggris = null;
    chosenCategories = null;
    chosenAge = null;
    chosenImage = null;
  }

  return categories != null &&
    age != null &&
    negara != null &&
    infoSoal != null &&
    versi_indonesia != null &&
    versi_inggris != null &&
    chosenCategories != null &&
    chosenAge != null &&
    chosenImage != null ? (
    <FormAddBankSoal
      age={age}
      categories={categories}
      negara={negara}
      infoSoal={infoSoal}
      id_bank_soal={id_bank_soal}
      versi_indonesia={versi_indonesia}
      versi_inggris={versi_inggris}
      chosenCategories={chosenCategories}
      chosenAge={chosenAge}
      chosenImage={chosenImage}
    />
  ) : (
    <ErrorResult subtitle="Unabled to edit the question bank" />
  );
}
