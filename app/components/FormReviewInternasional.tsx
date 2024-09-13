"use client";

import {
  ArrowDownOutlined,
  StarOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, message, Upload, UploadProps, Typography } from "antd";
import { RcFile, UploadFile } from "antd/es/upload";
import FileSaver from "file-saver";
import { useRouter } from "next/navigation";
import { ReactElement, useContext, useEffect, useState } from "react";
import { addReviewInternational } from "../actions";
import { NotificationType } from "@/allType";
import { UploadFileStatus } from "antd/es/upload/interface";
import { MyContext } from "./ProLayoutComp";
const { Text } = Typography;
export default function FormReviewInternasional({
  id_soal_usulan,
  review_internasional,
}: {
  id_soal_usulan: string;
  review_internasional: any[];
}) {
  const openNotification = useContext(MyContext);

  const router = useRouter();

  const [status, setStatus] = useState<UploadFileStatus>("done");

  const props: UploadProps = {
    showUploadList: {
      showDownloadIcon: true,
      showRemoveIcon: false,
    },
    onDownload() {
      const buffer = Buffer.from(
        review_internasional[0].review_internasional,
        "base64"
      );
      const blob = new Blob([buffer], {
        type: "application/octet-stream",
      });
      FileSaver.saveAs(blob, "reviews.txt");
    },
    name: "file",
    data: { id_soal_usulan },
    accept: ".txt",

    onChange: async (info) => {
      const arrayBuffer = await info.file.originFileObj?.arrayBuffer();

      console.log(info.fileList);
      let buffer;
      if (arrayBuffer) {
        buffer = Buffer.from(arrayBuffer);
      }

      const file = JSON.stringify(buffer);
      setStatus("uploading");
      try {
        await addReviewInternational(file, id_soal_usulan);

        router.refresh();
        if (openNotification) {
          openNotification("success", "Successfully add international review");
        }
      } catch (e) {
        router.refresh();
        if (openNotification) {
          openNotification("error", "Failed to add international review");
        }
      }
    },
  };

  useEffect(() => {
    setStatus("done");
  }, [review_internasional]);
  return (
    <>
      <Upload
        {...props}
        fileList={
          review_internasional[0].review_internasional != null
            ? [
                {
                  uid: "-1",
                  name: "reviews.txt",
                  status: status,
                },
              ]
            : []
        }
      >
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </>
  );
}
