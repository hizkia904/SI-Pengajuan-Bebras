import DeadlineServer from "@/app/components/DeadlineServer";
import { Skeleton } from "antd";
import { Suspense } from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={<Skeleton />}>
        <DeadlineServer />
      </Suspense>
      {children}
    </>
  );
}
