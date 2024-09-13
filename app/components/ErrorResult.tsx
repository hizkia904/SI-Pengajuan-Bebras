"use client";
import { ReloadOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";

export default function ErrorResult({ subtitle }: { subtitle: string }) {
  return (
    <Result
      status="error"
      title="Failed to retrieve data"
      subTitle={subtitle}
      extra={[
        <Button
          icon={<ReloadOutlined />}
          type="primary"
          key="reload"
          onClick={() => window.location.reload()}
        >
          Reload
        </Button>,
      ]}
    />
  );
}
