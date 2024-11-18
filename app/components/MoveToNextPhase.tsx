"use client";

import { DoubleRightOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import { moveToNextPhase } from "../actions";
import { useContext } from "react";
import { MyContext } from "./ProLayoutComp";

export default function MoveToNextPhase() {
  const openNotification = useContext(MyContext);
  return (
    <Popconfirm
      title="Pindah Tahap"
      description="Apakah anda yakin ingin pindah tahap?"
      onConfirm={async () => {
        try {
          await moveToNextPhase();
          window.location.reload();
        } catch (e) {
          if (openNotification) {
            openNotification("error", "Error");
          }
        }
      }}
      okText="Ya"
      cancelText="Tidak"
    >
      <Button
        style={{ marginTop: "5px" }}
        block
        icon={<DoubleRightOutlined />}
        type="default"
        danger
      >
        Pindah ke tahap selanjutnya!
      </Button>
    </Popconfirm>
  );
}
