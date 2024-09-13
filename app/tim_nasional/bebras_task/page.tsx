import TabelTask from "@/app/components/TabelTask";
import { Suspense } from "react";
import { Skeleton } from "antd";

import { runQuery } from "@/app/db";
import Persiapan from "@/app/components/Persiapan";
import ErrorResult from "@/app/components/ErrorResult";

export default async function Page() {
  let tahap_sekarang: any[] | null;
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
          <Persiapan tahap_sekarang={tahap_sekarang} />
        ) : (
          <Suspense fallback={<Skeleton />}>
            <TabelTask />
          </Suspense>
        )
      ) : (
        <ErrorResult subtitle="Unabled to load bebras task page" />
      )}
    </>
  );
}
