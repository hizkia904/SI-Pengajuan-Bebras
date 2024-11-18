import { Suspense } from "react";
import { Button, Col, Row, Skeleton } from "antd";

import { runQuery } from "@/app/db";
import Persiapan from "@/app/components/Persiapan";
import ErrorResult from "@/app/components/ErrorResult";

import TablePengajuanServer from "@/app/components/TablePengajuanServer";
import { DoubleRightOutlined, FileAddOutlined } from "@ant-design/icons";
import TransferArchive from "@/app/components/TransferArchive";
import SkeletonButton from "antd/es/skeleton/Button";
import MoveToNextPhase from "@/app/components/MoveToNextPhase";
import { validateRequest } from "@/app/auth";
import { Result } from "antd/lib";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let tahap_sekarang: any[] | null;
  const { user } = await validateRequest();
  if (user == null) {
    return <p>....</p>;
  }
  const ketua = user.ketua;
  try {
    const query = "select tahap_sekarang from info_bebras";
    const getTahapSekarang = await runQuery(query, []);
    tahap_sekarang = getTahapSekarang.rows;
  } catch (e) {
    tahap_sekarang = null;
  }

  return (
    <>
      {tahap_sekarang != null ? (
        tahap_sekarang[0].tahap_sekarang == 0 ? (
          ketua == true ? (
            <Persiapan tahap_sekarang={tahap_sekarang} />
          ) : (
            <Result
              status="403"
              title="Saat ini bukan periode pengajuan Bebras Task"
              subTitle="Saat ini bukan periode pengajuan Bebras Task"
            />
          )
        ) : (
          <>
            <Row style={{ marginBottom: "5px" }}>
              <Col span={8} offset={8}>
                <Button
                  disabled={tahap_sekarang[0].tahap_sekarang > 4}
                  type="primary"
                  href="/tim_nasional/bebras_task/pengajuan/add_task"
                  block
                  icon={<FileAddOutlined />}
                >
                  Add Task
                </Button>
                {ketua == true ? <MoveToNextPhase /> : undefined}
              </Col>
            </Row>
            {tahap_sekarang[0].tahap_sekarang == 4 && ketua == true ? (
              <Suspense fallback={<SkeletonButton />}>
                <TransferArchive />
              </Suspense>
            ) : undefined}

            <Suspense fallback={<Skeleton />}>
              <TablePengajuanServer searchParams={searchParams} />
            </Suspense>
          </>
        )
      ) : (
        <ErrorResult subtitle="Unabled to load bebras task page" />
      )}
    </>
  );
}
