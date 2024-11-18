import { LoadingOutlined } from "@ant-design/icons";
import { Select, Spin } from "antd";
import {
  CSSProperties,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

export default function CustomizeSelect({
  value,
  options,
  onChange,
  style = { width: 120 },
  showSearch = false,
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
  style?: CSSProperties;
  showSearch?: boolean;
}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [value]);

  return (
    <>
      {loading == false ? (
        <Select
          optionFilterProp="label"
          showSearch={showSearch}
          value={value}
          style={style}
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
