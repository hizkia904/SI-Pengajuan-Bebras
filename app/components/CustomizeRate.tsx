"use client";

import { BankSoalTableRows } from "@/interface";
import { LoadingOutlined } from "@ant-design/icons";
import { Rate, Spin } from "antd";
import { useEffect, useState } from "react";

export default function CustomizeRate({
  value,

  onChange,
}: {
  value: number | undefined;
  onChange: (value: number) => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [value]);

  return (
    <>
      {loading == false ? (
        <Rate
          allowClear={false}
          count={6}
          value={value}
          style={{ fontSize: "1em" }}
          onChange={async (newValue: number) => {
            if (newValue != value) {
              setLoading(true);
              try {
                await onChange(newValue);
              } catch (e) {
                setLoading(false);
              }
            }
          }}
        />
      ) : (
        <Spin indicator={<LoadingOutlined spin />} />
      )}
    </>
  );
}
