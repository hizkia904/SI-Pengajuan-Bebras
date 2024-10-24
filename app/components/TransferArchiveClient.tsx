"use client";

import { Table, TableColumnsType, Transfer, TransferProps } from "antd";
import { TransferDirection, TransferItem } from "antd/lib/transfer";
import { TransferKey } from "antd/lib/transfer/interface";
import { useRouter } from "next/navigation";
import { AddArchiveToPengajuan } from "../actions";
import { TableRows } from "@/interface";
import { TableRowSelection } from "antd/lib/table/interface";
import Link from "next/link";

export default function TransferArchiveClient({
  archiveAccepted,
  pengajuanDariArchived,
}: {
  archiveAccepted: any[];
  pengajuanDariArchived: any[];
}) {
  const router = useRouter();

  return (
    <>
      <Transfer
        targetKeys={pengajuanDariArchived}
        dataSource={archiveAccepted}
        titles={["Accepted Task From Archived", "Target"]}
        render={(item) => {
          return item.task_title;
        }}
        onChange={async (
          targetKeys: TransferKey[],
          direction: TransferDirection,
          moveKeys: TransferKey[]
        ) => {
          console.log("changed");
          console.log(moveKeys);
          console.log(direction);
          if (direction == "left") {
            await AddArchiveToPengajuan(moveKeys, true);
          } else {
            await AddArchiveToPengajuan(moveKeys, false);
          }

          router.refresh();
        }}
        oneWay
        style={{ marginBottom: 16 }}
      />
    </>
  );
}
