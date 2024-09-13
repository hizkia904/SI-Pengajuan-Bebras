"use client";
import { TableRows } from "@/interface";
import { Typography, Table, TableProps, Tooltip } from "antd";
import Link from "next/link";
import {
  changeGoToInternational,
  changeInternationalStatus,
  changeNationalStatus,
  downloadUsingPandoc,
  getImage,
} from "../actions";
import { useRouter } from "next/navigation";
import CustomizeSelect from "./CustomizeSelect";

import transformTimestamp from "@/dateTransform";
import {
  FileImageOutlined,
  FileOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import FileSaver from "file-saver";
import JSZip from "jszip";
import ButtonWithLoading from "./ButtonWithLoading";
import CustomizeCheckbox from "./CustomizeCheckbox";
import { useContext } from "react";
import { MyContext } from "./ProLayoutComp";
const { Text } = Typography;

export function TableClient({
  dataSource,
  rating,
}: {
  dataSource: TableRows[];
  rating: any[];
}) {
  const router = useRouter();

  const openNotification = useContext(MyContext);

  function CustomRow(props: any) {
    let who;
    let when;
    for (let i = 0; i < props.children.length; i++) {
      if (props.children[i].props.record.key == props["data-row-key"]) {
        who = props.children[i].props.record.who_last_updated;
        when = transformTimestamp(props.children[i].props.record.last_updated);
        break;
      }
    }
    const tooltip = (
      <Text>
        Last updated by <Text strong>{who}</Text> at <Text italic>{when}</Text>
      </Text>
    );

    return (
      <>
        {props.children instanceof Array ? (
          <Tooltip title={tooltip} color="white" placement="left">
            <tr {...props} />
          </Tooltip>
        ) : (
          <tr {...props} />
        )}
      </>
    );
  }
  const columns: TableProps<TableRows>["columns"] = [
    {
      title: "Title",
      dataIndex: "task_title",
      key: "task_title",
      render: (value: any, record: TableRows, index: number) => (
        <Link href={`/tim_nasional/bebras_task/${record.key}`}>
          {record.task_title}
        </Link>
      ),
      align: "center",
    },
    {
      title: "Uploaded by",
      dataIndex: "uploader",
      key: "uploader",
      align: "center",
    },
    {
      title: "Rata-rata Rating",
      dataIndex: "dummy",
      key: "avg_rating",
      align: "center",
      render(value: any, record: TableRows, index: number) {
        return rating[index].rata_rata;
      },
    },
    {
      title: "Answer Type",
      dataIndex: "answer_type",
      key: "answer_type",
      align: "center",
    },
    {
      title: "Status Nasional",
      dataIndex: "status_nasional",
      key: "status_nasional",
      align: "center",
      render(value: any, record: TableRows, index: number) {
        return (
          <CustomizeSelect
            options={[
              { value: "ACCEPTED", label: "ACCEPTED" },
              { value: "REJECTED", label: "REJECTED" },
            ]}
            value={value}
            onChange={async (changedValue: any) => {
              try {
                await changeNationalStatus(changedValue, record.key);
                router.refresh();
                if (openNotification) {
                  openNotification(
                    "success",
                    "Successfully Updated the National Status"
                  );
                }
              } catch (e) {
                router.refresh();
                if (openNotification) {
                  openNotification(
                    "error",
                    "Failed to update the National Status"
                  );
                }
              }
            }}
          />
        );
      },
    },
    {
      title: "Go To International",
      dataIndex: "gotointernational",
      key: "gotointernational",
      align: "center",
      render(value: any, record: TableRows, index: number) {
        return (
          <>
            <CustomizeCheckbox
              checked={value}
              onChange={async (changedValue: any) => {
                try {
                  await changeGoToInternational(changedValue, record.key);
                  router.refresh();
                  if (openNotification) {
                    openNotification(
                      "success",
                      "Successfully Updated Go To International"
                    );
                  }
                } catch (e) {
                  router.refresh();
                  if (openNotification) {
                    openNotification(
                      "error",
                      "Failed to update Go To International"
                    );
                  }
                }
              }}
            />
          </>
        );
      },
    },
    {
      title: "Status Internasional",
      dataIndex: "status_internasional",
      key: "status_internasional",
      align: "center",
      render(value: any, record: TableRows, index: number) {
        return (
          <CustomizeSelect
            options={[
              { value: "ACCEPTED", label: "ACCEPTED" },
              { value: "WORK NEEDED", label: "WORK NEEDED" },
              { value: "HELDBACK", label: "HELDBACK" },
            ]}
            value={value}
            onChange={async (changedValue: any) => {
              try {
                await changeInternationalStatus(changedValue, record.key);
                router.refresh();
                if (openNotification) {
                  openNotification(
                    "success",
                    "Successfully Updated the International Status"
                  );
                }
              } catch (e) {
                router.refresh();
                if (openNotification) {
                  openNotification(
                    "error",
                    "Failed to update the International Status"
                  );
                }
              }
            }}
          />
        );
      },
    },
    {
      title: "Tahun",
      dataIndex: "tahun",
      key: "tahun",
      align: "center",
    },
    {
      title: "Download",
      dataIndex: "download",
      key: "download",
      align: "center",
      render(value, record, index) {
        return (
          <>
            <ButtonWithLoading
              icon={<FileTextOutlined style={{ color: "#323ea8" }} />}
              type="text"
              onClick={async () => {
                try {
                  const arrBuff = await downloadUsingPandoc(record.key);
                  const buff = Buffer.from(arrBuff);
                  const blob = new Blob([buff]);
                  FileSaver.saveAs(blob, `${record.task_title}.odt`);
                  if (openNotification) {
                    openNotification("success", "Download Successfull!");
                  }
                } catch (e) {
                  if (openNotification) {
                    openNotification("error", "Download Failed!");
                  }
                }
              }}
            />

            <ButtonWithLoading
              icon={<FileImageOutlined style={{ color: "#323ea8" }} />}
              type="text"
              onClick={async () => {
                try {
                  const imagePath = await getImage(record.key);
                  if (imagePath.length == 0) {
                    if (openNotification) {
                      openNotification("error", "No Image to be downloaded!");
                    }
                  } else {
                    const zip = new JSZip();
                    const graphics = zip.folder("graphics");
                    for (let i = 0; i < imagePath.length; i++) {
                      graphics?.file(
                        imagePath[i].file_name,
                        imagePath[i].path,
                        {
                          base64: true,
                        }
                      );
                    }
                    const blob = await zip.generateAsync({ type: "blob" });
                    FileSaver.saveAs(blob, `${record.task_title}.zip`);
                    if (openNotification) {
                      openNotification("success", "Download Successfull!");
                    }
                  }
                } catch (e) {
                  if (openNotification) {
                    openNotification("error", "Download Failed!");
                  }
                }
              }}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <Table
        dataSource={dataSource}
        columns={columns}
        components={{
          body: {
            row: CustomRow,
          },
        }}
      />
    </>
  );
}
