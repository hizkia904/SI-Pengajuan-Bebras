import TableDashboardServer from "@/app/components/TableDashboardServer";
import { Skeleton } from "antd";
import { Suspense } from "react";

export default async function Page() {
  return (
    <Suspense fallback={<Skeleton active />}>
      <TableDashboardServer />
    </Suspense>
  );
}
