"use client";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { Descriptions, DescriptionsProps, Tag, Typography } from "antd";

const { Text } = Typography;

export default function StatusSectionBiroClient({ status }: { status: any }) {
  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      style: { textAlign: "center" },
      label: "Status Nasional",
      children:
        status.status_nasional == "ACCEPTED" ? (
          <Tag color="success">{status.status_nasional}</Tag>
        ) : status.status_nasional == "REJECTED" ? (
          <Tag color="error">{status.status_nasional}</Tag>
        ) : (
          <Tag color="default">{status.status_nasional}</Tag>
        ),
    },
    {
      key: "2",
      style: { textAlign: "center" },
      label: "Go To International",
      children:
        status.gotointernational == true ? (
          <CheckCircleOutlined style={{ color: "green" }} />
        ) : (
          <CloseCircleOutlined style={{ color: "red" }} />
        ),
    },
    {
      key: "3",
      style: { textAlign: "center" },
      label: "Status Internasional",
      children:
        status.status_internasional == null ? (
          <Tag color="default">-</Tag>
        ) : status.status_internasional == "ACCEPTED" ? (
          <Tag color="success">{status.status_internasional}</Tag>
        ) : status.status_internasional == "HELDBACK" ? (
          <Tag color="error">{status.status_internasional}</Tag>
        ) : status.status_internasional == "WORK NEEDED" ? (
          <Tag color="warning">{status.status_internasional}</Tag>
        ) : (
          <Tag color="default">-</Tag>
        ),
    },
  ];

  return <Descriptions bordered items={items} layout="vertical" />;
}
