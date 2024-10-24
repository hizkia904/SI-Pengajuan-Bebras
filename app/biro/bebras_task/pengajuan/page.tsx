import { Suspense } from "react";
import { Skeleton } from "antd";
import { Col, Result, Row } from "antd/lib";

import TablePengajuanServer from "@/app/components/TablePengajuanServer";
import AddTaskButton from "@/app/components/AddTaskButton";
import SkeletonButton from "antd/lib/skeleton/Button";
import { runQuery } from "@/app/db";
import ErrorResult from "@/app/components/ErrorResult";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let tahap: number | null;

  try {
    const queryTahap = "select tahap_sekarang from info_bebras";
    const getTahapSekarang = await runQuery(queryTahap, []);
    tahap = getTahapSekarang.rows[0].tahap_sekarang;
  } catch (e) {
    tahap = null;
  }
  return (
    <>
      {tahap != null ? (
        tahap != 0 ? (
          <>
            <Row style={{ marginBottom: "10px" }}>
              <Col span={8} offset={8}>
                <Suspense fallback={<SkeletonButton block active />}>
                  <AddTaskButton />
                </Suspense>
              </Col>
            </Row>
            <Suspense fallback={<Skeleton active />}>
              <TablePengajuanServer searchParams={searchParams} />
            </Suspense>
          </>
        ) : (
          <Result
            status="403"
            title="Saat ini bukan periode pengajuan Bebras Task"
            subTitle="Saat ini bukan periode pengajuan Bebras Task"
          />
        )
      ) : (
        <ErrorResult subtitle="Unabled to load the page" />
      )}
    </>
  );
}
