import { validateRequest } from "@/app/auth";

import Task from "@/app/components/Task";
import { Suspense, useContext } from "react";
import { FloatButton, Skeleton } from "antd/lib";
import CustomizeDrawer from "@/app/components/CustomizeDrawer";
import ReviewNasionalSection from "@/app/components/ReviewNasionalSection";
import RatingNasionalSection from "@/app/components/RatingNasionalSection";
import RatingInternasionalSection from "@/app/components/RatingInternasionalSection";
import ReviewInternasionalSection from "@/app/components/ReviewInternasionalSection";
import { FileImageOutlined, LoadingOutlined } from "@ant-design/icons";
import DownloadFloatButton from "@/app/components/DownloadFloatButton";
import { getImage } from "@/app/actions";
import { MyContext } from "@/app/components/ProLayoutComp";
import FileSaver from "file-saver";
import JSZip from "jszip";
import Download from "@/app/components/Download";
import SkeletonAvatar from "antd/lib/skeleton/Avatar";
import StatusSection from "@/app/components/StatusSection";
import ReviewInternasionalSectionBiro from "@/app/components/ReviewInternasionalSectionBiro";
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
          <ReviewNasionalSection id_user={id_user} id_soal_usulan={id} />
        </Suspense>
        <Suspense fallback={<Skeleton active />} key="rating_nasional">
          <RatingNasionalSection id_user={id_user} id_soal_usulan={id} />
        </Suspense>
        <Suspense fallback={<Skeleton active />} key="rating_internasional">
          <RatingInternasionalSection id_user={id_user} id_soal_usulan={id} />
        </Suspense>
        <Suspense fallback={<Skeleton active />} key="review_internasional">
          <ReviewInternasionalSection id_soal_usulan={id} />
        </Suspense>
        <Suspense fallback={<Skeleton active />} key="status">
          <StatusSection id_soal_usulan={id} />
        </Suspense>
      </CustomizeDrawer>
    </>
  );
}
