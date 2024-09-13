"use client";
import { useRouter } from "next/navigation";
import {
  changeGoToInternational,
  changeInternationalStatus,
  changeNationalStatus,
} from "../actions";
import CustomizeSelect from "./CustomizeSelect";
import { Dispatch, SetStateAction, useContext } from "react";
import { MyContext } from "./ProLayoutComp";
import {
  Col,
  Descriptions,
  DescriptionsProps,
  Row,
  Space,
  Typography,
} from "antd";
import CustomizeCheckbox from "./CustomizeCheckbox";

const { Text } = Typography;

export default function StatusSectionClient({
  status_nasional,
  status_internasional,
  gotointernational,
  id_soal_usulan,
}: {
  status_nasional: string;
  gotointernational: boolean;
  status_internasional: string;
  id_soal_usulan: string;
}) {
  const router = useRouter();
  const openNotification = useContext(MyContext);

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      style: { textAlign: "center" },
      label: "Status Nasional",
      children: (
        <CustomizeSelect
          options={[
            { value: "ACCEPTED", label: "ACCEPTED" },
            { value: "REJECTED", label: "REJECTED" },
          ]}
          value={status_nasional}
          onChange={async (
            changedValue: any,
            setLoading: Dispatch<SetStateAction<boolean>>
          ) => {
            try {
              await changeNationalStatus(changedValue, id_soal_usulan);
              router.refresh();
              if (openNotification) {
                openNotification(
                  "success",
                  "Successfully Updated the National Status"
                );
              }
            } catch (e) {
              setLoading(false);
              if (openNotification) {
                openNotification(
                  "error",
                  "Failed to update the National Status"
                );
              }
            }
          }}
        />
      ),
    },
    {
      key: "2",
      style: { textAlign: "center" },
      label: "Go To International",
      children: (
        <CustomizeCheckbox
          checked={gotointernational}
          onChange={async (changedValue: any) => {
            try {
              await changeGoToInternational(changedValue, id_soal_usulan);
              router.refresh();
              if (openNotification) {
                openNotification(
                  "success",
                  "Successfully Updated Go To International"
                );
              }
            } catch (e) {
              if (openNotification) {
                openNotification(
                  "error",
                  "Failed to update Go To International"
                );
              }
              throw new Error();
            }
          }}
        />
      ),
    },
    {
      key: "3",
      style: { textAlign: "center" },
      label: "Status Internasional",
      children: (
        <CustomizeSelect
          options={[
            { value: "ACCEPTED", label: "ACCEPTED" },
            { value: "WORK NEEDED", label: "WORK NEEDED" },
            { value: "HELDBACK", label: "HELDBACK" },
          ]}
          value={status_internasional}
          onChange={async (
            changedValue: any,
            setLoading: Dispatch<SetStateAction<boolean>>
          ) => {
            try {
              await changeInternationalStatus(changedValue, id_soal_usulan);
              router.refresh();
              if (openNotification) {
                openNotification(
                  "success",
                  "Successfully Updated the International Status"
                );
              }
            } catch (e) {
              setLoading(false);
              if (openNotification) {
                openNotification(
                  "error",
                  "Failed to update the International Status"
                );
              }
            }
          }}
        />
      ),
    },
  ];
  return (
    <>
      <Descriptions bordered items={items} layout="vertical" />
    </>
  );
}
