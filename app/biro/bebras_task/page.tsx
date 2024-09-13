import { Suspense } from "react";
import { Skeleton } from "antd";
import TabelTaskBiro from "@/app/components/TabelTaskBiro";

import { Button, Col, Row } from "antd/lib";
import { FileAddOutlined } from "@ant-design/icons";

export default async function Page() {
  return (
    <>
      <Row style={{ marginBottom: "10px" }}>
        <Col span={8} offset={8}>
          <Button
            type="primary"
            href="/biro/bebras_task/add_task"
            block
            icon={<FileAddOutlined />}
          >
            Add Task
          </Button>
        </Col>
      </Row>

      <Suspense fallback={<Skeleton active />}>
        <TabelTaskBiro />
      </Suspense>
    </>
  );
}
