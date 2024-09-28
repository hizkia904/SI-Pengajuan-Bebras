import { LoadingOutlined } from "@ant-design/icons";
import { Checkbox, Spin } from "antd";
import { useEffect, useState } from "react";

export default function CustomizeCheckbox({
  checked,
  onChange,
  disabled = false,
}: {
  checked: any;
  onChange: (e: any) => Promise<void>;
  disabled?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(false);
  }, [checked]);
  return (
    <>
      {loading == false ? (
        <Checkbox
          disabled={disabled}
          checked={checked}
          onChange={async (e) => {
            const changedValue = e.target.checked;
            setLoading(true);
            try {
              await onChange(changedValue);
            } catch (e) {
              setLoading(false);
            }
          }}
        />
      ) : (
        <Spin indicator={<LoadingOutlined spin />} />
      )}
    </>
  );
}
