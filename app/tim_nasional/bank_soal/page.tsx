import TableBankSoalClient from "@/app/components/TableBankSoalClient";
import { runQuery } from "@/app/db";
import { BankSoalTableRows } from "@/interface";
import { FileAddOutlined } from "@ant-design/icons";
import { Skeleton } from "antd";
import { Button, Col, Row } from "antd/lib";

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

async function TableBankSoal() {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  let dataSource: BankSoalTableRows[] | string;
  try {
    const query =
      "select id_bank_soal,kode_soal,tahun,answer_type,rating_nasional,rating_internasional,best_task,negara.nama as negara,terpilih" +
      " from bank_soal inner join negara on negara.kode_negara=bank_soal.kode_negara order by id_bank_soal desc";
    const getTable = await runQuery(query, []);
    dataSource = getTable.rows;
  } catch (e) {
    dataSource =
      "Unable to load data for question bank table. Please try again shortly.";
  }

  return (
    <>
      <TableBankSoalClient dataSource={dataSource} />
    </>
  );
}
