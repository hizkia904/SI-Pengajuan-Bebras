"use client";

import { BankSoalTableRows } from "@/interface";
import {
  CloseCircleOutlined,
  DisconnectOutlined,
  EllipsisOutlined,
  ExclamationCircleOutlined,
  FileUnknownOutlined,
  MinusCircleOutlined,
  QuestionOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { Rate, Table, TableProps, Typography } from "antd";
import Link from "next/link";
import CustomizeCheckbox from "./CustomizeCheckbox";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { MyContext } from "./ProLayoutComp";
import {
  changeFieldBestTask,
  changeFieldTerpilih,
  changeRatingNasional,
} from "../actions";
import ErrorResult from "./ErrorResult";
import CustomizeRate from "./CustomizeRate";

export default function TableBankSoalClient({
  dataSource,
}: {
  dataSource: BankSoalTableRows[] | string;
}) {
  const router = useRouter();
  const openNotification = useContext(MyContext);

  const columns: TableProps<BankSoalTableRows>["columns"] = [
    {
      title: "Kode Soal",
      dataIndex: "kode_soal",
      key: "kode_soal",
      align: "center",
      render(value, record, index) {
        return (
          <Link href={`/tim_nasional/bank_soal/${record.id_bank_soal}`}>
            {value}
          </Link>
        );
      },
    },
    { title: "Tahun", dataIndex: "tahun", key: "tahun", align: "center" },
    {
      title: "Answer Type",
      dataIndex: "answer_type",
      key: "answer_type",
      align: "center",
    },
    {
      title: "Rating Nasional",
      dataIndex: "rating_nasional",
      key: "rating_nasional",
      align: "center",
      render(value, record, index) {
        if (value == null) {
          return (
            <CustomizeRate
              value={value}
              onChange={async (newValue: number) => {
                try {
                  await changeRatingNasional(newValue, record.kode_soal);
                  router.refresh();

                  if (openNotification) {
                    openNotification(
                      "success",
                      "Successfully update national rating"
                    );
                  }
                } catch (e) {
                  if (openNotification) {
                    openNotification(
                      "error",
                      "Failed to update national rating"
                    );
                  }
                  throw new Error();
                }
              }}
            />
          );
        } else {
          return (
            <CustomizeRate
              value={value}
              onChange={async (newValue: number) => {
                try {
                  await changeRatingNasional(newValue, record.kode_soal);
                  router.refresh();
                  if (openNotification) {
                    openNotification(
                      "success",
                      "Successfully update national rating"
                    );
                  }
                } catch (e) {
                  if (openNotification) {
                    openNotification(
                      "error",
                      "Failed to update national rating"
                    );
                  }
                  throw new Error();
                }
              }}
            />
          );
        }
      },
    },
    {
      title: "Rating Internasional",
      dataIndex: "rating_internasional",
      key: "rating_internasional",
      align: "center",
      render(value, record, index) {
        return (
          <Rate disabled count={6} value={value} style={{ fontSize: "1em" }} />
        );
      },
    },
    {
      title: "Best Task",
      dataIndex: "best_task",
      key: "best_task",
      align: "center",
      render(value: any, record: BankSoalTableRows, index: number) {
        return (
          <>
            <CustomizeCheckbox
              checked={record.best_task}
              onChange={async (changedValue: any) => {
                try {
                  await changeFieldBestTask(changedValue, record.kode_soal);
                  router.refresh();
                  if (openNotification) {
                    openNotification(
                      "success",
                      "Successfully to update best task"
                    );
                  }
                } catch (e) {
                  if (openNotification) {
                    openNotification("error", "Failed to update best task");
                  }
                  throw new Error();
                }
              }}
            />
          </>
        );
      },
    },

    {
      title: "Terpilih",
      dataIndex: "terpilih",
      key: "terpilih",
      align: "center",
      render(value: any, record: BankSoalTableRows, index: number) {
        return (
          <>
            <CustomizeCheckbox
              checked={value}
              onChange={async (changedValue: any) => {
                try {
                  await changeFieldTerpilih(changedValue, record.kode_soal);
                  router.refresh();
                  if (openNotification) {
                    openNotification("success", "Successfully Update");
                  }
                } catch (e) {
                  if (openNotification) {
                    openNotification("error", "Failed to update");
                  }

                  throw new Error();
                }
              }}
            />
          </>
        );
      },
    },
    {
      title: "Negara",
      dataIndex: "negara",
      key: "negara",
      align: "center",
    },
  ];

  return (
    <>
      {typeof dataSource == "string" ? (
        <ErrorResult subtitle={dataSource} />
      ) : (
        <Table dataSource={dataSource} columns={columns} rowKey="kode_soal" />
      )}
    </>
  );
}
