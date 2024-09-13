"use client";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Descriptions, DescriptionsProps } from "antd";

export default function StatusSectionBiroClient({ status }: { status: any }) {
  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      style: { textAlign: "center" },
      label: "Status Nasional",
      children: status.status_nasional == null ? "-" : status.status_nasional,
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
        status.status_internasional == null ? "-" : status.status_internasional,
    },
  ];

  return <Descriptions bordered items={items} layout="vertical" />;
}
