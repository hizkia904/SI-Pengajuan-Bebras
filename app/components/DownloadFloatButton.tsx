"use client";

import { LoadingOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import { CSSProperties, ReactNode, useContext, useState } from "react";
import { downloadUsingPandoc, getImage } from "../actions";
import { MyContext } from "./ProLayoutComp";
import JSZip from "jszip";
import FileSaver from "file-saver";

export default function DownloadFloatButton({
  icon,
  typeDownload,
  id_soal_usulan,
  title,
  style,
}: {
  icon: ReactNode;
  typeDownload: "image" | "file";
  id_soal_usulan: string;
  title: string;
  style: CSSProperties;
}) {
  const [loading, setLoading] = useState(false);

  const openNotification = useContext(MyContext);

  const handleClick = async () => {
    setLoading(true);
    if (typeDownload == "image") {
      await onClickImageDownload();
    } else {
      await onClickFileDownload();
    }
    setLoading(false);
  };

  const onClickImageDownload = async () => {
    try {
      const imagePath = await getImage(id_soal_usulan);
      if (imagePath.length == 0) {
        if (openNotification) {
          openNotification("error", "No Image to be downloaded!");
        }
      } else {
        const zip = new JSZip();
        const graphics = zip.folder("graphics");
        for (let i = 0; i < imagePath.length; i++) {
          graphics?.file(imagePath[i].file_name, imagePath[i].path, {
            base64: true,
          });
        }
        const blob = await zip.generateAsync({ type: "blob" });
        FileSaver.saveAs(blob, `${title}.zip`);
        if (openNotification) {
          openNotification("success", "Download Successfull!");
        }
      }
    } catch (e) {
      if (openNotification) {
        openNotification("error", "Download Failed!");
      }
    }
  };

  const onClickFileDownload = async () => {
    try {
      const arrBuff = await downloadUsingPandoc(id_soal_usulan);
      const buff = Buffer.from(arrBuff);
      const blob = new Blob([buff]);
      FileSaver.saveAs(blob, `${title}.odt`);
      if (openNotification) {
        openNotification("success", "Download Successfull!");
      }
    } catch (e) {
      if (openNotification) {
        openNotification("error", "Download Failed!");
      }
    }
  };
  return (
    <FloatButton
      style={style}
      icon={loading == true ? <LoadingOutlined spin={false} /> : icon}
      onClick={loading == false ? handleClick : undefined}
    />
  );
}
