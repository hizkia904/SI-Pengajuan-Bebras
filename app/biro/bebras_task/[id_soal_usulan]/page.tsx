import { validateRequest } from "@/app/auth";
import CustomizeDrawer from "@/app/components/CustomizeDrawer";
import CustomizeSwitch from "@/app/components/CustomizeSwitch";
import Download from "@/app/components/Download";
import FormAddTask from "@/app/components/FormAddTask";
import RatingInternasionalSectionBiro from "@/app/components/RatingInternasionalSectionBiro";
import RatingNasionalSectionBiro from "@/app/components/RatingNasionalSectionBiro";
import ReviewInternasionalSectionBiro from "@/app/components/ReviewInternasionalSectionBiro";
import ReviewNasionalSectionBiro from "@/app/components/ReviewNasionalSectionBiro";
import StatusSectionBiro from "@/app/components/StatusSectionBiro";
import Task from "@/app/components/Task";
import UpdateTask from "@/app/components/UpdateTask";
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
      <CustomizeSwitch>
        <Suspense key="view" fallback={<Skeleton active />}>
          <Task task_id={id_soal_usulan} />
        </Suspense>
        <Suspense key="edit" fallback={<Skeleton active />}>
          <UpdateTask id_soal_usulan={id_soal_usulan} />
        </Suspense>
      </CustomizeSwitch>
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
          <ReviewNasionalSectionBiro id_soal_usulan={id_soal_usulan} />
        </Suspense>
        <Suspense fallback={<Skeleton active />} key="rating_nasional">
          <RatingNasionalSectionBiro id_soal_usulan={id_soal_usulan} />
        </Suspense>
        <Suspense fallback={<Skeleton active />} key="rating_internasional">
          <RatingInternasionalSectionBiro id_soal_usulan={id_soal_usulan} />
        </Suspense>
        <Suspense fallback={<Skeleton active />} key="review_internasional">
          <ReviewInternasionalSectionBiro id_soal_usulan={id_soal_usulan} />
        </Suspense>
        <Suspense fallback={<Skeleton active />} key="status">
          <StatusSectionBiro id_soal_usulan={id_soal_usulan} />
        </Suspense>
      </CustomizeDrawer>
    </>
  );
}
