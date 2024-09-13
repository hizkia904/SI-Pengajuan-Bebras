import {
  FileImageOutlined,
  FileOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { runQuery } from "../db";
import DownloadFloatButton from "./DownloadFloatButton";
import { CSSProperties, ReactNode } from "react";
import { FloatButton } from "antd";

export default async function Download({
  id_soal_usulan,
  typeDownload,
  style,
}: {
  id_soal_usulan: string;
  typeDownload: "image" | "file";
  style: CSSProperties;
}) {
  let title: string | null;
  try {
    const query =
      "select (soal).task_title from soal_usulan where id_soal_usulan=$1";
    const getTitle = await runQuery(query, [id_soal_usulan]);
    title = getTitle.rows[0].task_title;
  } catch (e) {
    title = null;
  }

  return typeof title == "string" ? (
    <DownloadFloatButton
      style={style}
      title={title}
      id_soal_usulan={id_soal_usulan}
      typeDownload={typeDownload}
      icon={
        typeDownload == "file" ? (
          <FileTextOutlined style={{ color: "#323ea8" }} />
        ) : (
          <FileImageOutlined style={{ color: "#323ea8" }} />
        )
      }
    />
  ) : undefined;
}
