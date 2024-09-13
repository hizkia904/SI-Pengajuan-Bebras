import { LoadingOutlined } from "@ant-design/icons";
import { Select, Spin } from "antd";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function CustomizeSelect({
  value,
  options,
  onChange,
}: {
  value: any;
  options: {
    value: string;
    label: string;
  }[];
  onChange: (
    value: any,
    setLoading: Dispatch<SetStateAction<boolean>>
  ) => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [value]);

  return (
    <>
      {loading == false ? (
        <Select
          value={value}
          style={{ width: 120 }}
          onChange={async (changedValue: any) => {
            setLoading(true);
            await onChange(changedValue, setLoading);
          }}
          options={options}
        />
      ) : (
        <Spin indicator={<LoadingOutlined spin />} />
      )}
    </>
  );
}
