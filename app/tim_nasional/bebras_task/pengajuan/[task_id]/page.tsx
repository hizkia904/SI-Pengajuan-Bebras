import { validateRequest } from "@/app/auth";
import Task from "@/app/components/Task";
import { Suspense } from "react";
import { Skeleton } from "antd/lib";
import CustomizeDrawer from "@/app/components/CustomizeDrawer";

import Download from "@/app/components/Download";
import SkeletonAvatar from "antd/lib/skeleton/Avatar";

import ReviewNasionalServer from "@/app/components/ReviewNasionalServer";
import RatingNasionalServer from "@/app/components/RatingNasionalServer";
import RatingInternasionalServer from "@/app/components/RatingInternasionalServer";
import ReviewInternasionalServer from "@/app/components/ReviewInternasionalServer";
import StatusServer from "@/app/components/StatusServer";
import { runQuery } from "@/app/db";
import ErrorResult from "@/app/components/ErrorResult";
import { Result } from "antd";
export default async function Page({
  params,
}: {
  params: { task_id: string };
}) {
  const { user } = await validateRequest();
  const id = params.task_id;

  let isItExist: any[] | null;

  try {
    const queryisItExist =
      "select archived from soal_usulan where id_soal_usulan=$1";
    const getisItExist = await runQuery(queryisItExist, [id]);
    isItExist = getisItExist.rows;
  } catch (e) {
    isItExist = null;
  }

  return isItExist != null ? (
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
    ) : (
      <>
        <Suspense fallback={<Skeleton active />}>
          <Task task_id={id} />
        </Suspense>

        <Suspense fallback={<SkeletonAvatar active />}>
          <Download
            id_soal_usulan={id}
            typeDownload="image"
            style={{ insetInlineEnd: 74 }}
          />
        </Suspense>
        <Suspense fallback={<SkeletonAvatar active />}>
          <Download
            id_soal_usulan={id}
            typeDownload="file"
            style={{ insetInlineEnd: 124 }}
          />
        </Suspense>

        <CustomizeDrawer>
          <Suspense fallback={<Skeleton active />} key="review_nasional">
            <ReviewNasionalServer id_soal_usulan={id} tujuan="PENGAJUAN" />
          </Suspense>
          <Suspense fallback={<Skeleton active />} key="rating_nasional">
            <RatingNasionalServer id_soal_usulan={id} tujuan="PENGAJUAN" />
          </Suspense>
          <Suspense fallback={<Skeleton active />} key="rating_internasional">
            <RatingInternasionalServer id_soal_usulan={id} tujuan="PENGAJUAN" />
          </Suspense>
          <Suspense fallback={<Skeleton active />} key="review_internasional">
            <ReviewInternasionalServer id_soal_usulan={id} tujuan="PENGAJUAN" />
          </Suspense>
          <Suspense fallback={<Skeleton active />} key="status">
            <StatusServer id_soal_usulan={id} tujuan="PENGAJUAN" />
          </Suspense>
        </CustomizeDrawer>
      </>
    )
  ) : (
    <ErrorResult subtitle="Unabled to display task" />
  );
}
