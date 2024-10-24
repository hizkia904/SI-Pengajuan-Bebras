import TableArchiveServer from "@/app/components/TableArchiveServer";

import { Skeleton } from "antd";

import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <Suspense fallback={<Skeleton />}>
      <TableArchiveServer searchParams={searchParams} />
    </Suspense>
  );
}
