import BankSoal from "@/app/components/BankSoal";
import CustomizeSwitch from "@/app/components/CustomizeSwitch";
import UpdateBankSoal from "@/app/components/UpdateBankSoal";
import { Skeleton } from "antd/lib";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: { id_bank_soal: string };
}) {
  const { id_bank_soal } = params;

  return (
    <>
      <CustomizeSwitch>
        <Suspense key="view" fallback={<Skeleton active />}>
          <BankSoal id_bank_soal={id_bank_soal} />
        </Suspense>
        <Suspense key="edit" fallback={<Skeleton active />}>
          <UpdateBankSoal id_bank_soal={id_bank_soal} />
        </Suspense>
      </CustomizeSwitch>
    </>
  );
}
