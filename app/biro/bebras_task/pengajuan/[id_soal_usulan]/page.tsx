import CustomizeDrawer from "@/app/components/CustomizeDrawer";
import CustomizeSwitch from "@/app/components/CustomizeSwitch";
import Download from "@/app/components/Download";

import Task from "@/app/components/Task";
import { Skeleton } from "antd";
import SkeletonAvatar from "antd/lib/skeleton/Avatar";
import { Suspense } from "react";
import { BebrasTask, imagePath } from "@/interface";
import { validateRequest } from "@/app/auth";
import { runQuery } from "@/app/db";
import ErrorResult from "@/app/components/ErrorResult";
import FormAddTask from "@/app/components/FormAddTask";
import ReviewNasionalServer from "@/app/components/ReviewNasionalServer";
import RatingNasionalServer from "@/app/components/RatingNasionalServer";
import RatingInternasionalServer from "@/app/components/RatingInternasionalServer";
import ReviewInternasionalServer from "@/app/components/ReviewInternasionalServer";
import StatusServer from "@/app/components/StatusServer";
import { Result } from "antd/lib";

export default async function Page({
  params,
}: {
  params: { id_soal_usulan: string };
}) {
  const { id_soal_usulan } = params;

  let isUploaderTrue: boolean | null;
  let isAuthorTrue: boolean | null;
  let isItExist: any[] | null;
  const { user } = await validateRequest();
  if (user == null) {
    return <p>Belum Login</p>;
  }
  const id_user = user.id;
  try {
    const queryIsUploaderTrue =
      "select exists(select 1 from soal_usulan where uploader=$1 and id_soal_usulan=$2)";
    const getIsUploaderTrue = await runQuery(queryIsUploaderTrue, [
      id_user,
      id_soal_usulan,
    ]);
    isUploaderTrue = getIsUploaderTrue.rows[0].exists;
    const queryIsAuthorTrue =
      "select exists(select 1 from pembuat_soal_usulan where id_user=$1 and id_soal_usulan=$2)";
    const getIsAuthor = await runQuery(queryIsAuthorTrue, [
      id_user,
      id_soal_usulan,
    ]);
    isAuthorTrue = getIsAuthor.rows[0].exists;
    const queryisItExist =
      "select archived from soal_usulan where id_soal_usulan=$1";
    const getisItExist = await runQuery(queryisItExist, [id_soal_usulan]);
    isItExist = getisItExist.rows;
  } catch (e) {
    isUploaderTrue = null;
    isAuthorTrue = null;
    isItExist = null;
  }

  return isAuthorTrue != null &&
    isUploaderTrue !== null &&
    isItExist != null ? (
    isItExist.length == 0 ? (
      <Result
        status={403}
        title="You can't see this task"
        subTitle="You can't see this task because the task doesn't exist"
      />
    ) : isItExist[0].archived == true ? (
      <Result
        status={403}
        title="You can't see this task"
        subTitle="You can't see this task because this task is already archived"
      />
    ) : isAuthorTrue == false && isUploaderTrue == false ? (
      <Result
        status={403}
        title="You can't see this task"
        subTitle="You can't see this task because you are not the author or uploader"
      />
    ) : (
      <>
        <CustomizeSwitch>
          <Suspense key="view" fallback={<Skeleton active />}>
            <Task task_id={id_soal_usulan} />
          </Suspense>
          <Suspense key="edit" fallback={<Skeleton active />}>
            {isAuthorTrue == true ? (
              <UpdateTask id_soal_usulan={id_soal_usulan} />
            ) : (
              <Result
                status={403}
                title="You can't edit this task"
                subTitle="You can't edit the task because you are not the author"
              />
            )}
          </Suspense>
        </CustomizeSwitch>
        <Suspense fallback={<SkeletonAvatar active />}>
          <Download id_soal_usulan={id_soal_usulan} />
        </Suspense>

        <CustomizeDrawer>
          <Suspense fallback={<Skeleton active />} key="review_nasional">
            <ReviewNasionalServer
              id_soal_usulan={id_soal_usulan}
              tujuan="PENGAJUAN"
            />
          </Suspense>
          <Suspense fallback={<Skeleton active />} key="rating_nasional">
            <RatingNasionalServer
              id_soal_usulan={id_soal_usulan}
              tujuan="PENGAJUAN"
            />
          </Suspense>
          <Suspense fallback={<Skeleton active />} key="rating_internasional">
            <RatingInternasionalServer
              id_soal_usulan={id_soal_usulan}
              tujuan="PENGAJUAN"
            />
          </Suspense>
          <Suspense fallback={<Skeleton active />} key="review_internasional">
            <ReviewInternasionalServer
              id_soal_usulan={id_soal_usulan}
              tujuan="PENGAJUAN"
            />
          </Suspense>
          <Suspense fallback={<Skeleton active />} key="status">
            <StatusServer id_soal_usulan={id_soal_usulan} tujuan="PENGAJUAN" />
          </Suspense>
        </CustomizeDrawer>
      </>
    )
  ) : (
    <ErrorResult subtitle="Unabled to display task" />
  );
}

async function UpdateTask({ id_soal_usulan }: { id_soal_usulan: string }) {
  const { user } = await validateRequest();
  if (user == null) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
      />
    );
  }
  const id_user = user.id;
  let categories: any[] | null;
  let age: any[] | null;
  let anggota: any[] | null;
  let chosenAge: any[] | null;
  let chosenAuthors: any[] | null;
  let chosenCategories: any[] | null;
  let editedValue: BebrasTask | null;
  let chosenImage: imagePath[] | null;
  let isAuthorTrue: boolean | null;

  try {
    const queryCategories = "select id_categories,nama from categories";
    const getCategories = await runQuery(queryCategories, []);
    categories = getCategories.rows;

    const queryAge =
      "select id_usia as value,from_age||'-'||to_age as label from usia";
    const getAge = await runQuery(queryAge, []);
    age = getAge.rows;

    const queryAnggota =
      "select id as value,nama as label,email from user_bebras where role='BIRO'";
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

    const queryIsAuthorTrue =
      "select exists(select 1 from pembuat_soal_usulan where id_user=$1 and id_soal_usulan=$2)";
    const getIsAuthor = await runQuery(queryIsAuthorTrue, [
      id_user,
      id_soal_usulan,
    ]);
    isAuthorTrue = getIsAuthor.rows[0].exists;
  } catch (e) {
    categories = null;
    age = null;
    anggota = null;
    chosenAge = null;
    chosenAuthors = null;
    chosenCategories = null;
    editedValue = null;
    chosenImage = null;
    isAuthorTrue = null;
  }

  return categories != null &&
    age != null &&
    anggota != null &&
    chosenAge != null &&
    chosenAuthors != null &&
    chosenCategories != null &&
    editedValue != null &&
    chosenImage != null &&
    isAuthorTrue != null ? (
    isAuthorTrue == true ? (
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
      <Result
        status={403}
        title="You can't edit this task"
        subTitle="You can't edit the task because you are not the author"
      />
    )
  ) : (
    <ErrorResult subtitle="Unabled to add task" />
  );
}
