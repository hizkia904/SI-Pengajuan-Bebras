"use client";
import { TableRows } from "@/interface";
import {
  Typography,
  Table,
  TableProps,
  Button,
  Tooltip,
  Tag,
  Form,
  Row,
  Col,
  Input,
  Select,
  DatePicker,
  Space,
  Skeleton,
} from "antd";
import Link from "next/link";
import {
  changeGoToInternational,
  changeInternationalStatus,
  changeNationalStatus,
  downloadUsingPandoc,
  getImage,
} from "../actions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CustomizeSelect from "./CustomizeSelect";

import transformTimestamp from "@/dateTransform";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  FileImageOutlined,
  FileOutlined,
  ReloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import FileSaver from "file-saver";
import JSZip from "jszip";
import ButtonWithLoading from "./ButtonWithLoading";
import CustomizeCheckbox from "./CustomizeCheckbox";
import { useContext } from "react";
import { MyContext } from "./ProLayoutComp";
import dayjs from "dayjs";

const { Text, Title } = Typography;
const { Item } = Form;
const { YearPicker } = DatePicker;

export function TablePengajuanClient({
  dataSource,
  rating,
  total,
  biro,
  role,
  tahap_sekarang,
}: {
  dataSource: TableRows[];
  rating: any[];
  total: number;
  biro: any[];
  role: string;
  tahap_sekarang: number;
}) {
  const router = useRouter();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const p = searchParams.get("p");
  const s = searchParams.get("s");
  const biro_uploader = searchParams.get("biro_uploader");
  const a = searchParams.get("a");
  const stat_nas = searchParams.get("stat_nas");
  const stat_inter = searchParams.get("stat_inter");
  const go_inter = searchParams.get("go_inter");
  const t = searchParams.get("t");
  const openNotification = useContext(MyContext);

  function CustomRow(props: any) {
    let who;
    let when;
    let biro;
    for (let i = 0; i < props.children.length; i++) {
      if (props.children[i].props.record.key == props["data-row-key"]) {
        who = props.children[i].props.record.who_last_updated;
        when = transformTimestamp(props.children[i].props.record.last_updated);
        biro = props.children[i].props.record.biro_last_updated;
        break;
      }
    }
    const tooltip = (
      <Text>
        Last updated by <Text strong>{who}</Text> ({biro}) at{" "}
        <Text italic>{when}</Text>
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
      render: (value: any, record: TableRows, index: number) => {
        if (role == "BIRO") {
          return (
            <Link href={`/biro/bebras_task/pengajuan/${record.key}`}>
              {record.task_title}
            </Link>
          );
        } else if (role == "TIM NASIONAL") {
          return (
            <Link href={`/tim_nasional/bebras_task/pengajuan/${record.key}`}>
              {record.task_title}
            </Link>
          );
        } else {
          return value;
        }
      },
      align: "center",
    },
    {
      title: "Uploaded by",
      key: "uploader",
      align: "center",
      render(value, record, index) {
        return (
          <>
            {record.uploader}
            <br />({record.biro_uploader})
          </>
        );
      },
    },
    {
      title: "Rata-rata Rating",
      dataIndex: "dummy",
      key: "avg_rating",
      align: "center",
      render(value: any, record: TableRows, index: number) {
        return rating[Number(record.key)].rata_rata;
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
      render(value, record, index) {
        if (role == "BIRO") {
          if (value == "ACCEPTED") {
            return <Tag color="success">{value}</Tag>;
          } else if (value == "REJECTED") {
            return <Tag color="error">{value}</Tag>;
          } else if (value == "ADDED FROM ARCHIVE") {
            return <Tag color="lime">{value}</Tag>;
          } else {
            return <Tag color="default">{value}</Tag>;
          }
        } else if (role == "TIM NASIONAL") {
          if (tahap_sekarang >= 5) {
            if (value == "ACCEPTED") {
              return <Tag color="success">{value}</Tag>;
            } else if (value == "REJECTED") {
              return <Tag color="error">{value}</Tag>;
            } else if (value == "ADDED FROM ARCHIVE") {
              return <Tag color="lime">{value}</Tag>;
            }
          } else {
            if (
              value == "ACCEPTED" ||
              value == "REJECTED" ||
              value == "FILTERING"
            ) {
              return (
                <CustomizeSelect
                  options={[
                    { value: "ACCEPTED", label: "ACCEPTED" },
                    { value: "REJECTED", label: "REJECTED" },
                  ]}
                  value={value == "FILTERING" ? undefined : value}
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
            } else if (value == "ADDED FROM ARCHIVE") {
              return <Tag color="lime">{value}</Tag>;
            } else {
              return <Tag color="default">{value}</Tag>;
            }
          }
        }
      },
    },
    {
      title: "Go To International",
      dataIndex: "gotointernational",
      key: "gotointernational",
      align: "center",
      render(value, record, index) {
        if (role == "BIRO") {
          if (value == true) {
            return <CheckCircleOutlined style={{ color: "green" }} />;
          } else {
            return <CloseCircleOutlined style={{ color: "red" }} />;
          }
        } else {
          if (
            tahap_sekarang >= 5 ||
            record.status_nasional == "ADDED FROM ARCHIVE"
          ) {
            if (value == true) {
              return <CheckCircleOutlined style={{ color: "green" }} />;
            } else {
              return <CloseCircleOutlined style={{ color: "red" }} />;
            }
          } else {
            return (
              <>
                <CustomizeCheckbox
                  disabled={
                    tahap_sekarang <= 3 ||
                    (tahap_sekarang == 4 &&
                      (record.status_nasional == "FILTERING" ||
                        record.status_nasional == "REJECTED"))
                  }
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
          }
        }
      },
    },
    {
      title: "Status Internasional",
      dataIndex: "status_internasional",
      key: "status_internasional",
      align: "center",
      render(value: any, record: TableRows, index: number) {
        if (role == "BIRO") {
          if (value == null) {
            return <Tag color="cyan">-</Tag>;
          } else if (value == "ACCEPTED") {
            return <Tag color="success">{value}</Tag>;
          } else if (value == "HELDBACK") {
            return <Tag color="error">{value}</Tag>;
          } else if (value == "WORK NEEDED") {
            return <Tag color="warning">{value}</Tag>;
          } else {
            return <Tag color="default">{value}</Tag>;
          }
        } else if (role == "TIM NASIONAL") {
          if (
            value == "WAITING FOR RESULT" ||
            value == "ACCEPTED" ||
            value == "WORK NEEDED" ||
            value == "HELDBACK"
          ) {
            return (
              <CustomizeSelect
                options={[
                  { value: "ACCEPTED", label: "ACCEPTED" },
                  { value: "WORK NEEDED", label: "WORK NEEDED" },
                  { value: "HELDBACK", label: "HELDBACK" },
                ]}
                value={value == "WAITING FOR RESULT" ? undefined : value}
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
          } else {
            if (value == null) {
              return <Tag color="cyan">-</Tag>;
            } else {
              return <Tag color="default">{value}</Tag>;
            }
          }
        }
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
              icon={<FileOutlined style={{ color: "#323ea8" }} />}
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
  const runFilter = () => {
    const search = form.getFieldValue("s");
    const params = new URLSearchParams(searchParams.toString());
    params.set("p", "1");
    if (search != "") {
      params.set("s", search);
    } else {
      params.delete("s");
    }

    const params_string = params.toString();

    router.push(pathname + "?" + params_string);
  };
  let waktuTunggu = 1000;
  let tunggulSelesaiMengetik: NodeJS.Timeout;

  const onKeyUp = () => {
    clearTimeout(tunggulSelesaiMengetik);
    tunggulSelesaiMengetik = setTimeout(runFilter, waktuTunggu);
  };

  const onKeyDown = () => {
    clearTimeout(tunggulSelesaiMengetik);
  };

  const [form] = Form.useForm();
  return (
    <>
      <Title level={3}>Pengajuan</Title>

      <Form form={form} layout="vertical">
        <Row gutter={7}>
          <Col span={8}>
            <Item name="s" label="Search" initialValue={s}>
              <Input
                placeholder="search task title"
                prefix={<SearchOutlined />}
                onKeyDown={onKeyDown}
                onKeyUp={onKeyUp}
              />
            </Item>
          </Col>
          <Col span={6}>
            <Item
              name="biro_uploader"
              label="Biro Uploader"
              initialValue={
                biro_uploader != null
                  ? Number.isNaN(Number(biro_uploader))
                    ? undefined
                    : Number(biro_uploader)
                  : undefined
              }
            >
              <Select
                optionFilterProp="nama"
                fieldNames={{ label: "nama", value: "id_biro" }}
                showSearch={true}
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
                options={biro}
                onChange={(value: any) => {
                  const params = new URLSearchParams(searchParams.toString());
                  console.log(params.toString());
                  params.set("p", "1");
                  if (value) {
                    params.set("biro_uploader", value);
                  } else {
                    params.delete("biro_uploader");
                  }

                  const params_string = params.toString();
                  router.push(pathname + "?" + params_string);
                }}
              />
            </Item>
          </Col>
          <Col span={5}>
            <Item name="a" label="Answer Type" initialValue={a}>
              <Select
                showSearch={true}
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
                options={[
                  { label: "Multiple-Choice", value: "Multiple-Choice" },
                  {
                    label: "Multiple-Choice with Images",
                    value: "Multiple-Choice with Images",
                  },
                  { label: "Open Integer", value: "Open Integer" },
                  { label: "Open Text", value: "Open Text" },
                ]}
                onChange={(value: any) => {
                  const params = new URLSearchParams(searchParams.toString());
                  console.log(params.toString());
                  params.set("p", "1");
                  if (value) {
                    params.set("a", value);
                  } else {
                    params.delete("a");
                  }

                  const params_string = params.toString();
                  router.push(pathname + "?" + params_string);
                }}
              />
            </Item>
          </Col>
        </Row>
        <Row gutter={7}>
          <Col span={4}>
            <Item
              name="stat_nas"
              label="Status Nasional"
              initialValue={
                typeof stat_nas == "string" ? stat_nas.toUpperCase() : undefined
              }
            >
              <Select
                showSearch={true}
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
                options={[
                  { label: "ACCEPTED", value: "ACCEPTED" },
                  {
                    label: "REJECTED",
                    value: "REJECTED",
                  },
                ]}
                onChange={(value: any) => {
                  const params = new URLSearchParams(searchParams.toString());
                  console.log(params.toString());
                  params.set("p", "1");
                  if (value) {
                    params.set("stat_nas", value);
                  } else {
                    params.delete("stat_nas");
                  }

                  const params_string = params.toString();
                  router.push(pathname + "?" + params_string);
                }}
              />
            </Item>
          </Col>
          <Col span={5}>
            <Item
              name="stat_inter"
              label="Status Internasional"
              initialValue={
                typeof stat_inter == "string"
                  ? stat_inter.toUpperCase()
                  : undefined
              }
            >
              <Select
                showSearch={true}
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
                options={[
                  { label: "ACCEPTED", value: "ACCEPTED" },
                  {
                    label: "WORK NEEDED",
                    value: "WORK NEEDED",
                  },
                  {
                    label: "HELDBACK",
                    value: "HELDBACK",
                  },
                  {
                    label: "WAITING FOR RESULT",
                    value: "WAITING FOR RESULT",
                  },
                ]}
                onChange={(value: any) => {
                  const params = new URLSearchParams(searchParams.toString());
                  console.log(params.toString());
                  params.set("p", "1");
                  if (value) {
                    params.set("stat_inter", value);
                  } else {
                    params.delete("stat_inter");
                  }

                  const params_string = params.toString();
                  router.push(pathname + "?" + params_string);
                }}
              />
            </Item>
          </Col>
          <Col span={4}>
            <Item
              name="go_inter"
              label="Go To International"
              initialValue={
                typeof go_inter == "string"
                  ? go_inter.toUpperCase() == "TRUE"
                    ? true
                    : go_inter.toUpperCase() == "FALSE"
                    ? false
                    : undefined
                  : undefined
              }
            >
              <Select
                showSearch={true}
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
                options={[
                  {
                    label: <CheckCircleOutlined style={{ color: "green" }} />,
                    value: true,
                  },
                  {
                    label: <CloseCircleOutlined style={{ color: "red" }} />,
                    value: false,
                  },
                ]}
                onChange={(value: any) => {
                  const params = new URLSearchParams(searchParams.toString());
                  console.log(params.toString());
                  params.set("p", "1");
                  if (value != null) {
                    params.set("go_inter", value);
                  } else {
                    params.delete("go_inter");
                  }

                  const params_string = params.toString();
                  router.push(pathname + "?" + params_string);
                }}
              />
            </Item>
          </Col>
          <Col span={5}>
            <Item
              name="t"
              label="Tahun"
              initialValue={t == undefined ? t : dayjs(new Date(Number(t), 1))}
            >
              <YearPicker
                onChange={(
                  date: dayjs.Dayjs,
                  dateString: string | string[]
                ) => {
                  const tahun = date?.year();
                  const params = new URLSearchParams(searchParams.toString());
                  console.log(params.toString());
                  params.set("p", "1");
                  if (tahun) {
                    params.set("t", tahun + "");
                  } else {
                    params.delete("t");
                  }
                  const params_string = params.toString();
                  router.push(pathname + "?" + params_string);
                }}
              />
            </Item>
          </Col>
        </Row>
      </Form>
      <Space direction="vertical">
        <Button
          size="middle"
          type="primary"
          icon={<ReloadOutlined />}
          onClick={() => {
            const params = new URLSearchParams(searchParams.toString());
            console.log(params.toString());
            params.set("p", "1");
            params.delete("a");
            params.delete("s");
            params.delete("biro_uploader");
            params.delete("stat_nas");
            params.delete("go_inter");
            params.delete("stat_inter");
            params.delete("t");
            form.setFieldValue("a", undefined);
            form.setFieldValue("s", undefined);
            form.setFieldValue("biro_uploader", undefined);
            form.setFieldValue("stat_nas", undefined);
            form.setFieldValue("go_inter", undefined);
            form.setFieldValue("stat_inter", undefined);
            form.setFieldValue("t", undefined);

            const params_string = params.toString();
            router.push(pathname + "?" + params_string);
          }}
        >
          Reset Filter
        </Button>
        <Table
          pagination={{
            total: total,
            current: Number(p),
            onChange(page, pageSize) {
              const params = new URLSearchParams(searchParams.toString());
              console.log(params.toString());
              params.set("p", page + "");
              const params_string = params.toString();
              router.push(pathname + "?" + params_string);
            },
          }}
          dataSource={dataSource}
          columns={columns}
          components={{
            body: {
              row: CustomRow,
            },
          }}
        />
      </Space>
    </>
  );
}
