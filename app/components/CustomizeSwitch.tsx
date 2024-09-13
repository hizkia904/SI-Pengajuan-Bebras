"use client";
import React, { useState } from "react";

import { Affix, Space, Switch } from "antd";
import { useRouter } from "next/navigation";

export default function CustomizeSwitch({
  children,
}: {
  children: React.ReactNode;
}) {
  const arr = React.Children.toArray(children);
  const view = arr.find(
    (child) => (child as React.ReactElement).key == ".$view"
  );
  const edit = arr.find(
    (child) => (child as React.ReactElement).key == ".$edit"
  );

  // console.log(arr);
  const [mode, setMode] = useState(false);

  return (
    <>
      <Space style={{ width: "100%" }} direction="vertical">
        <Affix offsetTop={20}>
          <Switch
            unCheckedChildren="View"
            checkedChildren="Edit"
            value={mode}
            onChange={(checked: boolean) => setMode(checked)}
          />
        </Affix>

        {mode == false ? view : edit}
      </Space>
    </>
  );
}
