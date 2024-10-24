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
export default async function Page({
  params,
}: {
  params: { task_id: string };
}) {
  const { user } = await validateRequest();
  const id_user = user?.id;
  const id = params.task_id;

  return (
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
  );
}
