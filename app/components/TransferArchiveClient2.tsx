"use client";

import React, { useContext, useState } from "react";
import { Alert, Button, Col, Modal, Row, Space, Table, Transfer } from "antd";
import type {
  GetProp,
  TableColumnsType,
  TableProps,
  TransferProps,
} from "antd";
import Link from "next/link";
import { TransferKey } from "antd/lib/transfer/interface";
import { TransferDirection } from "antd/lib/transfer";
import { AddArchiveToPengajuan } from "../actions";
import { useRouter } from "next/navigation";
import { PlusCircleOutlined } from "@ant-design/icons";
import { MyContext } from "./ProLayoutComp";

type TransferItem = GetProp<TransferProps, "dataSource">[number];
type TableRowSelection<T extends object> = TableProps<T>["rowSelection"];

interface DataType {
  key: string;
  task_title: string;
  tahun: string;
  answer_type: string;
}

interface TableTransferProps extends TransferProps<TransferItem> {
  dataSource: DataType[];
  leftColumns: TableColumnsType<DataType>;
  rightColumns: TableColumnsType<DataType>;
}

// Customize Table Transfer
const TableTransfer: React.FC<TableTransferProps> = (props) => {
  const openNotification = useContext(MyContext);
  const { leftColumns, rightColumns, ...restProps } = props;
  const router = useRouter();
  function isNumberArray(arr: unknown): arr is number[] {
    return Array.isArray(arr) && arr.every((item) => typeof item === "number");
  }
  return (
    <Transfer
      style={{ width: "100%" }}
      {...restProps}
      onChange={async (
        targetKeys: TransferKey[],
        direction: TransferDirection,
        moveKeys: TransferKey[]
      ) => {
        try {
          if (direction == "left") {
            if (isNumberArray(moveKeys)) {
              await AddArchiveToPengajuan(moveKeys, true);
            }
          } else {
            if (isNumberArray(moveKeys)) {
              await AddArchiveToPengajuan(moveKeys, false);
            }
          }
          router.refresh();
          if (openNotification) {
            if (direction == "left") {
              openNotification(
                "success",
                "Successfully remove task from archive"
              );
            } else if (direction == "right") {
              openNotification("success", "Successfully add task from archive");
            }
          }
        } catch (e) {
          if (openNotification) {
            if (e instanceof Error) {
              openNotification("error", e.message);
            }
          }
        }
      }}
    >
      {({
        direction,
        filteredItems,
        onItemSelect,
        onItemSelectAll,
        selectedKeys: listSelectedKeys,
        disabled: listDisabled,
      }) => {
        const columns = direction === "left" ? leftColumns : rightColumns;
        const rowSelection: TableRowSelection<TransferItem> = {
          getCheckboxProps: () => ({ disabled: listDisabled }),
          onChange(selectedRowKeys) {
            onItemSelectAll(selectedRowKeys, "replace");
          },
          selectedRowKeys: listSelectedKeys,
          selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
          ],
        };

        return (
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={filteredItems}
            size="small"
            style={{ pointerEvents: listDisabled ? "none" : undefined }}
          />
        );
      }}
    </Transfer>
  );
};

const columnsLeft: TableColumnsType<DataType> = [
  {
    dataIndex: "task_title",
    title: "Name",
    render(value, record, index) {
      return (
        <Link
          href={`/tim_nasional/bebras_task/archive/${record.key}`}
          target="_blank"
        >
          {value}
        </Link>
      );
    },
  },
  {
    dataIndex: "answer_type",
    title: "Answer Type",
  },
  {
    dataIndex: "tahun",
    title: "Tahun",
  },
];

const columnsRight: TableColumnsType<DataType> = [
  {
    dataIndex: "task_title",
    title: "Name",
    render(value, record, index) {
      return (
        <Link
          href={`/tim_nasional/bebras_task/pengajuan/${record.key}`}
          target="_blank"
        >
          {value}
        </Link>
      );
    },
  },
  {
    dataIndex: "answer_type",
    title: "Answer Type",
  },
  {
    dataIndex: "tahun",
    title: "Tahun",
  },
];

const filterOption = (input: string, item: DataType) =>
  item.task_title?.includes(input);

export default function TransferArchiveClient2({
  archiveAccepted,
  pengajuanDariArchived,
}: {
  archiveAccepted: any[];
  pengajuanDariArchived: any[];
}) {
  // const [targetKeys, setTargetKeys] = useState<TransferProps["targetKeys"]>([]);
  const [disabled, setDisabled] = useState(false);

  // const onChange: TableTransferProps["onChange"] = (nextTargetKeys) => {
  //   setTargetKeys(nextTargetKeys);
  // };

  const toggleDisabled = (checked: boolean) => {
    setDisabled(checked);
  };

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Row style={{ marginBottom: "10px" }}>
        <Col span={8} offset={8}>
          <Button
            block
            onClick={() => setShowModal(true)}
            icon={<PlusCircleOutlined />}
          >
            Add or Remove task from Archive
          </Button>
        </Col>
      </Row>

      <Modal
        footer={null}
        centered
        width="80vw"
        height="90vh"
        title="Get Accepted Task from Archive"
        open={showModal}
        onCancel={() => setShowModal(false)}
      >
        {/* <Flex align="start" gap="middle" vertical> */}
        <Space direction="vertical" style={{ width: "100%" }}>
          <Alert
            message="Warning"
            description="Pastikan soal belum muncul di kegiatan lain!"
            type="warning"
            showIcon
          />
          <TableTransfer
            titles={["Archive", "Pengajuan"]}
            dataSource={archiveAccepted}
            targetKeys={pengajuanDariArchived}
            disabled={disabled}
            showSearch
            showSelectAll={false}
            // onChange={onChange}
            filterOption={filterOption}
            leftColumns={columnsLeft}
            rightColumns={columnsRight}
          />
          {/* </Flex> */}
        </Space>
      </Modal>
    </>
  );
}
