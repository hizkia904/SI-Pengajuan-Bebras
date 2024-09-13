import TableBankSoal from "@/app/components/TableBankSoal";
import { FileAddOutlined } from "@ant-design/icons";
import { Skeleton } from "antd";
import { Button, Col, Row } from "antd/lib";
import Link from "next/link";
import { Suspense } from "react";

export default async function Page() {
  return (
    <>
      <Row style={{ marginBottom: "10px" }}>
        <Col span={8} offset={8}>
          <Button
            type="primary"
            href="/tim_nasional/bank_soal/add_bank_soal"
            block
            icon={<FileAddOutlined />}
          >
            Add Question Bank
          </Button>
        </Col>
      </Row>
      <Suspense fallback={<Skeleton />}>
        <TableBankSoal />
      </Suspense>
    </>
  );
}
