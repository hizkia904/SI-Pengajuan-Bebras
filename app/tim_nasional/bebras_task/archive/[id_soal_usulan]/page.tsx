import CustomizeDrawer from "@/app/components/CustomizeDrawer";
import Download from "@/app/components/Download";

import RatingInternasionalServer from "@/app/components/RatingInternasionalServer";
import RatingNasionalServer from "@/app/components/RatingNasionalServer";

import ReviewInternasionalServer from "@/app/components/ReviewInternasionalServer";
import ReviewNasionalServer from "@/app/components/ReviewNasionalServer";

import StatusServer from "@/app/components/StatusServer";
import Task from "@/app/components/Task";
import { Skeleton } from "antd";
import SkeletonAvatar from "antd/lib/skeleton/Avatar";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: { id_soal_usulan: string };
}) {
  const { id_soal_usulan } = params;

  return (
    <>
      <Suspense key="view" fallback={<Skeleton active />}>
        <Task task_id={id_soal_usulan} />
      </Suspense>

      <Suspense fallback={<SkeletonAvatar active />}>
        <Download
          id_soal_usulan={id_soal_usulan}
          typeDownload="image"
          style={{ insetInlineEnd: 74 }}
        />
      </Suspense>
      <Suspense fallback={<SkeletonAvatar active />}>
        <Download
          id_soal_usulan={id_soal_usulan}
          typeDownload="file"
          style={{ insetInlineEnd: 124 }}
        />
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
  );
}
