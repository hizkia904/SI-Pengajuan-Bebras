import Jodit, { IJoditEditorProps } from "jodit-react";
import type {
  IUploaderOptions,
  IUploaderAnswer,
  IUploaderData,
} from "jodit/esm/types/uploader";
import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";

const optionsWithoutImage = [
  "bold",
  "italic",
  "underline",
  "strikethrough",
  "eraser",
  "|",
  "ul",
  "ol",
  "|",
  "fontsize",
  "paragraph",
  "|",
  "outdent",
  "indent",
  "align",
  "lineHeight",
  "|",
  "superscript",
  "subscript",
  "selectall",
  "|",
  "table",
  "link",
  "|",
  "source",
  "undo",
  "redo",
];
const optionsWithImage = [
  "bold",
  "italic",
  "underline",
  "strikethrough",
  "eraser",
  "|",
  "ul",
  "ol",
  "|",
  "fontsize",
  "paragraph",
  "|",
  "outdent",
  "indent",
  "align",
  "lineHeight",
  "|",
  "superscript",
  "subscript",
  "selectall",
  "|",
  "image",
  "table",
  "link",
  "|",
  "source",
  "undo",
  "redo",
];
export default function JoditEditor({
  setField,
  nama,
  addImage,
  value,
  useID = false,
  useImage = true,
}: {
  setField: any;
  nama: string;
  addImage?: (fileName: string, path: string) => void;
  value: string;
  useID?: boolean;
  useImage?: boolean;
}) {
  const uploader: Partial<IUploaderOptions<string>> = {
    url: "/api/uploadImage",
    isSuccess: function (resp) {
      return !resp.error;
    },
    error: function (e) {
      console.log("error", e);
    },
    process(resp: IUploaderAnswer) {
      if (addImage) {
        resp.data.files.forEach(
          (value: string, index: number, array: string[]) => {
            addImage(resp.data.fileNames[index], value);
          }
        );
      }
      return {
        baseurl: resp.data.baseurl,
        files: resp.data.files,
        isImages: resp.data.isImages,
        messages: resp.data.messages,
        path: resp.data.path,
      } satisfies IUploaderData;
    },
  };

  const config = useMemo(
    () => ({
      createAttributes: {
        table: {
          style: "border:1px solid;border-collapse:collapse;width: 100%;",
        },
        tr: { style: " border: 1px solid;" },
        td: { style: " border: 1px solid;" },
      },
      uploader: uploader,

      readonly: false,
      placeholder: "Insert here",
      defaultActionOnPaste: "insert_as_html",
      defaultLineHeight: 1.5,
      // enter: "P",
      // options that we defined in above step.
      buttons: useImage == true ? optionsWithImage : optionsWithoutImage,
      buttonsMD: useImage == true ? optionsWithImage : optionsWithoutImage,
      buttonsSM: useImage == true ? optionsWithImage : optionsWithoutImage,
      buttonsXS: useImage == true ? optionsWithImage : optionsWithoutImage,
      statusbar: true,
      sizeLG: 900,
      sizeMD: 700,
      sizeSM: 400,
      toolbarAdaptive: false,
    }),
    []
  );

  const propsEditor = {
    // onChange: function (newValue: string) {
    //   if (newValue == "<p><br></p>") {
    //     setField(nama, "");
    //   } else {
    //     setField(nama, newValue);
    //   }
    // },

    onBlur(newValue) {
      if (newValue == "<p><br></p>") {
        setField(nama, "");
      } else {
        setField(nama, newValue);
      }
    },

    config: config,
  } satisfies IJoditEditorProps;

  return (
    <>
      <div
        id={useID == true ? nama : undefined}
        style={{ marginBottom: "10px" }}
      >
        <Jodit value={value} {...propsEditor} />
      </div>
    </>
  );
}
