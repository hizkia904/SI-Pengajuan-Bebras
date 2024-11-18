"use client";

import { ArrowDownOutlined, LoadingOutlined } from "@ant-design/icons";
import { FloatButton, Tooltip } from "antd";
import { useContext, useState } from "react";
import { downloadUsingPandoc, getImage } from "../actions";
import { MyContext } from "./ProLayoutComp";
import JSZip from "jszip";
import FileSaver from "file-saver";

export default function DownloadFloatButton({
  id_soal_usulan,
  title,
}: {
  id_soal_usulan: string;
  title: string;
}) {
  const [loading, setLoading] = useState(false);

  const openNotification = useContext(MyContext);

  const handleClick = async () => {
    setLoading(true);
    await onClickDownloadImageAndFile();
    setLoading(false);
  };

  const onClickDownloadImageAndFile = async () => {
    try {
      const imagePath = await getImage(id_soal_usulan);
      const arrBuff = await downloadUsingPandoc(id_soal_usulan);
      const buff = Buffer.from(arrBuff);
      const blob2 = new Blob([buff]);
      const zip = new JSZip();
      zip.file(title + ".odt", blob2, { base64: true });
      if (imagePath.length != 0) {
        const graphics = zip.folder("graphics");
        for (let i = 0; i < imagePath.length; i++) {
          graphics?.file(imagePath[i].file_name, imagePath[i].path, {
            base64: true,
          });
        }
      }

      const blob = await zip.generateAsync({ type: "blob" });
      FileSaver.saveAs(blob, `${title}.zip`);
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
    <Tooltip title="Download">
      <FloatButton
        style={{ insetInlineEnd: 74 }}
        icon={
          loading == true ? (
            <LoadingOutlined spin={false} />
          ) : (
            <ArrowDownOutlined style={{ color: "#323ea8" }} />
          )
        }
        onClick={loading == false ? handleClick : undefined}
      />
    </Tooltip>
  );
}
