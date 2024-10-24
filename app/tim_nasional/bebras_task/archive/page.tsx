import TableArchiveServer from "@/app/components/TableArchiveServer";

import { Skeleton } from "antd";
import { Suspense } from "react";

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <Suspense fallback={<Skeleton active />}>
      <TableArchiveServer searchParams={searchParams} />
    </Suspense>
  );
}
