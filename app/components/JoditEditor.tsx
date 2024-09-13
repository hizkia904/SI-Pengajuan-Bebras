import Jodit, { IJoditEditorProps } from "jodit-react";
import type {
  IUploaderOptions,
  IUploaderAnswer,
  IUploaderData,
} from "jodit/esm/types/uploader";
import React, { Fragment, useMemo, useRef, useState } from "react";

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
  const button = [
    "bold",
    "italic",
    "underline",
    "strikethrough",
    "eraser",
    "ul",
    "ol",
    "font",
    "fontsize",
    "paragraph",
    "lineHeight",
    "superscript",
    "subscript",
    "selectall",
    "table",
    "link",
    "source",
  ];
  if (useImage == true) {
    button.push("image");
  }
  const uploader: Partial<IUploaderOptions<string>> = {
    url: "/api/uploadImage",
    isSuccess: function (resp) {
      return !resp.error;
    },
    error: function (e) {
      console.log("error", e);
    },
    process(resp: IUploaderAnswer) {
      console.log(resp);
      if (addImage) {
        console.log(resp);
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
      events: {
        onBeforeDelete: (node: any) => console.log("delete"),
      },
      createAttributes: {
        table: {
          style: "border:1px solid;border-collapse:collapse;width: 100%;",
        },
        tr: { style: " border: 1px solid;" },
        td: { style: " border: 1px solid;" },
      },
      uploader: uploader,
      removeButtons: [
        "spellcheck",
        "speechRecognize",
        "cut",
        "copy",
        "paste",
        "font",
        "brush",
      ],
      toolbarButtonSize: "middle",
      toolbarAdaptive: false,
      readonly: false,

      buttons: button,
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
