import { FileAddOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { runQuery } from "../db";

export default async function AddTaskButton() {
  let tahap: any | null;
  try {
    const queryTahap = "select tahap_sekarang from info_bebras";
    const getTahap = await runQuery(queryTahap, []);
    const tahap_rows = getTahap.rows;
    tahap = tahap_rows[0].tahap_sekarang;
  } catch (e) {
    tahap = null;
  }
  return (
    <>
      {tahap != null ? (
        tahap == 1 ? (
          <Button
            type="primary"
            href="/biro/bebras_task/pengajuan/add_task"
            block
            icon={<FileAddOutlined />}
          >
            Add Task
          </Button>
        ) : (
          <Button
            type="primary"
            href="/biro/bebras_task/pengajuan/add_task"
            block
            icon={<FileAddOutlined />}
            disabled={true}
          >
            Add Task
          </Button>
        )
      ) : undefined}
    </>
  );
}
