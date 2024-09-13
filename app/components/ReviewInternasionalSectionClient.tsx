"use client";

import { Button, Upload, UploadProps, Typography } from "antd";
import FileSaver from "file-saver";
const { Text } = Typography;
export default function ReviewInternasionalSectionClient({
  review_internasional,
}: {
  review_internasional: any[];
}) {
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

    accept: ".txt",
  };
  return review_internasional[0].review_internasional != null ? (
    <Upload
      {...props}
      fileList={[
        {
          uid: "-1",
          name: "reviews.txt",
          status: "done",
        },
      ]}
    />
  ) : (
    <Text italic type="secondary">
      No Reviews found
    </Text>
  );
}
