import { validateRequest } from "@/app/auth";
import CustomizeDrawer from "@/app/components/CustomizeDrawer";

import Download from "@/app/components/Download";
import ErrorResult from "@/app/components/ErrorResult";

import RatingInternasionalServer from "@/app/components/RatingInternasionalServer";

import RatingNasionalServer from "@/app/components/RatingNasionalServer";

import ReviewInternasionalServer from "@/app/components/ReviewInternasionalServer";

import ReviewNasionalServer from "@/app/components/ReviewNasionalServer";

import StatusServer from "@/app/components/StatusServer";
import Task from "@/app/components/Task";
import { runQuery } from "@/app/db";

import { Skeleton } from "antd";
import { Result } from "antd/lib";
import SkeletonAvatar from "antd/lib/skeleton/Avatar";
import { Suspense } from "react";

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
  return isAuthorTrue != null && isUploaderTrue != null && isItExist != null ? (
    isItExist.length == 0 ? (
      <Result
        status={403}
        title="You can't see this task"
        subTitle="You can't see this task because the task doesn't exist"
      />
    ) : isItExist[0].archived == false ? (
      <Result
        status={403}
        title="You can't see this task"
        subTitle="You can't see this task because the task is still in proposal phase"
      />
    ) : isAuthorTrue == false && isUploaderTrue == false ? (
      <Result
        status={403}
        title="You can't see this task"
        subTitle="You can't see this task because you are not the author or uploader"
      />
    ) : (
      <>
        <Suspense key="view" fallback={<Skeleton active />}>
          <Task task_id={id_soal_usulan} />
        </Suspense>

        <Suspense fallback={<SkeletonAvatar active />}>
          <Download id_soal_usulan={id_soal_usulan} />
        </Suspense>

        <CustomizeDrawer>
          <Suspense fallback={<Skeleton active />} key="review_nasional">
            <ReviewNasionalServer
              id_soal_usulan={id_soal_usulan}
              tujuan="ARCHIVE"
            />
          </Suspense>
          <Suspense fallback={<Skeleton active />} key="rating_nasional">
            <RatingNasionalServer
              id_soal_usulan={id_soal_usulan}
              tujuan="ARCHIVE"
            />
          </Suspense>
          <Suspense fallback={<Skeleton active />} key="rating_internasional">
            <RatingInternasionalServer
              id_soal_usulan={id_soal_usulan}
              tujuan="ARCHIVE"
            />
          </Suspense>
          <Suspense fallback={<Skeleton active />} key="review_internasional">
            <ReviewInternasionalServer
              id_soal_usulan={id_soal_usulan}
              tujuan="ARCHIVE"
            />
          </Suspense>
          <Suspense fallback={<Skeleton active />} key="status">
            <StatusServer id_soal_usulan={id_soal_usulan} tujuan="ARCHIVE" />
          </Suspense>
        </CustomizeDrawer>
      </>
    )
  ) : (
    <ErrorResult subtitle="Unabled to display task" />
  );
}
