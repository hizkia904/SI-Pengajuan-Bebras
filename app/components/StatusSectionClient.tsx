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
  Tag,
  Typography,
} from "antd";
import CustomizeCheckbox from "./CustomizeCheckbox";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

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
      children:
        status_internasional != null ? (
          status_nasional == "ACCEPTED" ? (
            <Tag color="success">{status_nasional}</Tag>
          ) : (
            <Tag color="error">{status_nasional}</Tag>
          )
        ) : status_nasional == "ACCEPTED" ||
          status_nasional == "REJECTED" ||
          status_nasional == "FILTERING" ? (
          <CustomizeSelect
            options={[
              { value: "ACCEPTED", label: "ACCEPTED" },
              { value: "REJECTED", label: "REJECTED" },
            ]}
            value={status_nasional == "FILTERING" ? undefined : status_nasional}
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
        ) : (
          <Tag color="default">{status_nasional}</Tag>
        ),
    },
    {
      key: "2",
      style: { textAlign: "center" },
      label: "Go To International",
      children:
        status_internasional != null ? (
          gotointernational == true ? (
            <CheckCircleOutlined style={{ color: "green" }} />
          ) : (
            <CloseCircleOutlined style={{ color: "red" }} />
          )
        ) : (
          <CustomizeCheckbox
            disabled={
              status_nasional == "FILTERING" ||
              status_nasional == "ACCEPTED" ||
              status_nasional == "REJECTED"
                ? false
                : true
            }
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
                router.refresh();
                if (openNotification) {
                  openNotification(
                    "error",
                    "Failed to update Go To International"
                  );
                }
              }
            }}
          />
        ),
    },
    {
      key: "3",
      style: { textAlign: "center" },
      label: "Status Internasional",
      children:
        status_internasional == "WAITING FOR RESULT" ||
        status_internasional == "ACCEPTED" ||
        status_internasional == "WORK NEEDED" ||
        status_internasional == "HELDBACK" ? (
          <CustomizeSelect
            options={[
              { value: "ACCEPTED", label: "ACCEPTED" },
              { value: "WORK NEEDED", label: "WORK NEEDED" },
              { value: "HELDBACK", label: "HELDBACK" },
            ]}
            value={
              status_internasional == "WAITING FOR RESULT"
                ? undefined
                : status_internasional
            }
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
        ) : status_internasional == null ? (
          <Tag color="default">-</Tag>
        ) : (
          <Tag color="default">{status_internasional}</Tag>
        ),
    },
  ];
  return (
    <>
      <Descriptions bordered items={items} layout="vertical" />
    </>
  );
}
