"use client";

import { Checkbox, Table } from "antd";
import CustomizeSelect from "./CustomizeSelect";
import { useContext } from "react";
import { MyContext } from "./ProLayoutComp";
import { changeBiro, changeKetua, changeRole } from "../actions";
import { useRouter } from "next/navigation";
import CustomizeCheckbox from "./CustomizeCheckbox";

export default function TableUser({
  dataSource,
  biro,
}: {
  dataSource: any[];
  biro: any[];
}) {
  const openNotification = useContext(MyContext);
  const router = useRouter();
  return (
    <Table
      pagination={false}
      dataSource={dataSource}
      columns={[
        { align: "center", key: 1, title: "Username", dataIndex: "username" },
        { align: "center", key: 2, title: "Role", dataIndex: "role" },
        {
          align: "center",
          key: 2,
          title: "Ketua Tim Nasional",
          dataIndex: "ketua",
          render(value, record, index) {
            return record.role == "TIM NASIONAL" ? (
              <CustomizeCheckbox
                checked={value}
                onChange={async (changedValue: any) => {
                  try {
                    await changeKetua(record.id, changedValue);
                    router.refresh();
                    if (openNotification) {
                      openNotification(
                        "success",
                        "Successfully Updated Go To International"
                      );
                    }
                  } catch (e) {
                    router.refresh();
                    if (openNotification) {
                      openNotification(
                        "error",
                        "Failed to update Go To International"
                      );
                    }
                  }
                }}
              />
            ) : (
              <Checkbox value={value} disabled />
            );
          },
        },
        {
          align: "center",
          key: 3,
          title: "Biro",
          dataIndex: "id_biro",
          render(value, record, index) {
            return (
              <CustomizeSelect
                showSearch={true}
                style={{ width: 240 }}
                options={biro}
                value={value}
                onChange={async (changedValue: any) => {
                  try {
                    await changeBiro(changedValue, record.id);
                    router.refresh();
                    if (openNotification) {
                      openNotification(
                        "success",
                        "Successfully Updated the Biro"
                      );
                    }
                  } catch (e) {
                    router.refresh();
                    if (openNotification) {
                      openNotification("error", "Failed to update the Biro");
                    }
                  }
                }}
              />
            );
          },
        },
      ]}
    />
  );
}
