"use client";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Descriptions, DescriptionsProps, Tag, Typography } from "antd";
import CustomizeSelect from "./CustomizeSelect";
import {
  changeGoToInternational,
  changeInternationalStatus,
  changeNationalStatus,
} from "../actions";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useContext } from "react";
import { MyContext } from "./ProLayoutComp";
import CustomizeCheckbox from "./CustomizeCheckbox";

const { Text } = Typography;
// biro archive, biro pengajuan

////biro archive ,biro pengajuan, StatusSectionBiro(id_soal_usulan),StatusSectionBiroClient(status)
//timnas archive StatusSectionArchive(id_soal_usulan),StatusSectionArchiveClient(status,id_soal_usulan)
//timnas pengajuan StatusSection(id_soal_usulan),StatusSectionClient(id_soal_usulan,gotointernational,status_nasional,status_internaisonal)

export default function StatusClient({
  status,
  role,
  tujuan,
  id_soal_usulan,
  tahap_sekarang,
}: {
  status: any;
  role: string;
  tujuan: "ARCHIVE" | "PENGAJUAN";
  id_soal_usulan: string;
  tahap_sekarang: number;
}) {
  const router = useRouter();
  const openNotification = useContext(MyContext);
  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      style: { textAlign: "center" },
      label: "Status Nasional",
      children:
        role == "BIRO" || (role == "TIM NASIONAL" && tujuan == "ARCHIVE") ? (
          status.status_nasional == "ACCEPTED" ? (
            <Tag color="success">{status.status_nasional}</Tag>
          ) : status.status_nasional == "REJECTED" ? (
            <Tag color="error">{status.status_nasional}</Tag>
          ) : status.status_nasional == "ADDED FROM ARCHIVE" ? (
            <Tag color="lime">{status.status_nasional}</Tag>
          ) : (
            <Tag color="default">{status.status_nasional}</Tag>
          )
        ) : tahap_sekarang >= 5 ? (
          status.status_nasional == "ACCEPTED" ? (
            <Tag color="success">{status.status_nasional}</Tag>
          ) : status.status_nasional == "REJECTED" ? (
            <Tag color="error">{status.status_nasional}</Tag>
          ) : status.status_nasional == "ADDED FROM ARCHIVE" ? (
            <Tag color="lime">{status.status_nasional}</Tag>
          ) : undefined
        ) : status.status_nasional == "ACCEPTED" ||
          status.status_nasional == "REJECTED" ||
          status.status_nasional == "FILTERING" ? (
          <CustomizeSelect
            options={[
              { value: "ACCEPTED", label: "ACCEPTED" },
              { value: "REJECTED", label: "REJECTED" },
            ]}
            value={
              status.status_nasional == "FILTERING"
                ? undefined
                : status.status_nasional
            }
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
        ) : status.status_nasional == "ADDED FROM ARCHIVE" ? (
          <Tag color="lime">{status.status_nasional}</Tag>
        ) : (
          <Tag color="default">{status.status_nasional}</Tag>
        ),
    },
    {
      key: "2",
      style: { textAlign: "center" },
      label: "Go To International",
      children:
        role == "BIRO" || (role == "TIM NASIONAL" && tujuan == "ARCHIVE") ? (
          status.gotointernational == true ? (
            <CheckCircleOutlined style={{ color: "green" }} />
          ) : (
            <CloseCircleOutlined style={{ color: "red" }} />
          )
        ) : tahap_sekarang >= 5 ||
          status.status_nasional == "ADDED FROM ARCHIVE" ? (
          status.gotointernational == true ? (
            <CheckCircleOutlined style={{ color: "green" }} />
          ) : (
            <CloseCircleOutlined style={{ color: "red" }} />
          )
        ) : (
          <CustomizeCheckbox
            disabled={
              tahap_sekarang <= 3 ||
              (tahap_sekarang == 4 &&
                (status.status_nasional == "FILTERING" ||
                  status.status_nasional == "REJECTED"))
            }
            checked={status.gotointernational}
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
        role == "BIRO" ? (
          status.status_internasional == null ? (
            <Tag color="cyan">-</Tag>
          ) : status.status_internasional == "ACCEPTED" ? (
            <Tag color="success">{status.status_internasional}</Tag>
          ) : status.status_internasional == "HELDBACK" ? (
            <Tag color="error">{status.status_internasional}</Tag>
          ) : status.status_internasional == "WORK NEEDED" ? (
            <Tag color="warning">{status.status_internasional}</Tag>
          ) : (
            <Tag color="default">{status.status_internasional}</Tag>
          )
        ) : role == "TIM NASIONAL" ? (
          tujuan == "ARCHIVE" ? (
            status.status_internasional == null ? (
              <Tag color="cyan">-</Tag>
            ) : status.status_internasional == "ACCEPTED" ? (
              <Tag color="success">{status.status_internasional}</Tag>
            ) : status.status_internasional == "HELDBACK" ? (
              <Tag color="error">{status.status_internasional}</Tag>
            ) : status.status_internasional == "WORK NEEDED" ? (
              <Tag color="warning">{status.status_internasional}</Tag>
            ) : status.status_internasional == "WAITING FOR RESULT" ? (
              <CustomizeSelect
                options={[
                  { value: "ACCEPTED", label: "ACCEPTED" },
                  { value: "WORK NEEDED", label: "WORK NEEDED" },
                  { value: "HELDBACK", label: "HELDBACK" },
                ]}
                value={undefined}
                onChange={async (changedValue: any) => {
                  try {
                    await changeInternationalStatus(
                      changedValue,
                      id_soal_usulan
                    );
                    router.refresh();
                    if (openNotification) {
                      openNotification(
                        "success",
                        "Successfully Updated the International Status"
                      );
                    }
                  } catch (e) {
                    router.refresh();
                    if (openNotification) {
                      openNotification(
                        "error",
                        "Failed to update the International Status"
                      );
                    }
                  }
                }}
              />
            ) : undefined
          ) : status.status_internasional == "WAITING FOR RESULT" ||
            status.status_internasional == "ACCEPTED" ||
            status.status_internasional == "WORK NEEDED" ||
            status.status_internasional == "HELDBACK" ? (
            <CustomizeSelect
              options={[
                { value: "ACCEPTED", label: "ACCEPTED" },
                { value: "WORK NEEDED", label: "WORK NEEDED" },
                { value: "HELDBACK", label: "HELDBACK" },
              ]}
              value={
                status.status_internasional == "WAITING FOR RESULT"
                  ? undefined
                  : status.status_internasional
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
          ) : status.status_internasional == null ? (
            <Tag color="cyan">-</Tag>
          ) : (
            <Tag color="default">{status.status_internasional}</Tag>
          )
        ) : undefined,
    },
  ];

  return <Descriptions bordered items={items} layout="vertical" />;
}

//biro archive,biro pengajuan
// const items: DescriptionsProps["items"] = [
//   {
//     key: "1",
//     style: { textAlign: "center" },
//     label: "Status Nasional",
//     children:
//       status.status_nasional == "ACCEPTED" ? (
//         <Tag color="success">{status.status_nasional}</Tag>
//       ) : status.status_nasional == "REJECTED" ? (
//         <Tag color="error">{status.status_nasional}</Tag>
//       ) : (
//         <Tag color="default">{status.status_nasional}</Tag>
//       ),
//   },
//   {
//     key: "2",
//     style: { textAlign: "center" },
//     label: "Go To International",
//     children:
//       status.gotointernational == true ? (
//         <CheckCircleOutlined style={{ color: "green" }} />
//       ) : (
//         <CloseCircleOutlined style={{ color: "red" }} />
//       ),
//   },
//   {
//     key: "3",
//     style: { textAlign: "center" },
//     label: "Status Internasional",
//     children:
//       status.status_internasional == null ? (
//         <Tag color="default">-</Tag>
//       ) : status.status_internasional == "ACCEPTED" ? (
//         <Tag color="success">{status.status_internasional}</Tag>
//       ) : status.status_internasional == "HELDBACK" ? (
//         <Tag color="error">{status.status_internasional}</Tag>
//       ) : status.status_internasional == "WORK NEEDED" ? (
//         <Tag color="warning">{status.status_internasional}</Tag>
//       ) : (
//         <Tag color="default">{status.status_internasional}</Tag>
//       ),
//   },
// ];

// timnas archive
// const items: DescriptionsProps["items"] = [
//   {
//     key: "1",
//     style: { textAlign: "center" },
//     label: "Status Nasional",
//     children:
//       status.status_nasional == "ACCEPTED" ? (
//         <Tag color="success">{status.status_nasional}</Tag>
//       ) : status.status_nasional == "REJECTED" ? (
//         <Tag color="error">{status.status_nasional}</Tag>
//       ) : undefined,
//   },
//   {
//     key: "2",
//     style: { textAlign: "center" },
//     label: "Go To International",
//     children:
//       status.gotointernational == true ? (
//         <CheckCircleOutlined style={{ color: "green" }} />
//       ) : (
//         <CloseCircleOutlined style={{ color: "red" }} />
//       ),
//   },
//   {
//     key: "3",
//     style: { textAlign: "center" },
//     label: "Status Internasional",
//     children:
//       status.status_internasional == null ? (
//         <Tag color="default">-</Tag>
//       ) : status.status_internasional == "ACCEPTED" ? (
//         <Tag color="success">{status.status_internasional}</Tag>
//       ) : status.status_internasional == "HELDBACK" ? (
//         <Tag color="error">{status.status_internasional}</Tag>
//       ) : status.status_internasional == "WORK NEEDED" ? (
//         <Tag color="warning">{status.status_internasional}</Tag>
//       ) : status.status_internasional == "WAITING FOR RESULT" ? (
//         <CustomizeSelect
//           options={[
//             { value: "ACCEPTED", label: "ACCEPTED" },
//             { value: "WORK NEEDED", label: "WORK NEEDED" },
//             { value: "HELDBACK", label: "HELDBACK" },
//           ]}
//           value={undefined}
//           onChange={async (changedValue: any) => {
//             try {
//               await changeInternationalStatus(changedValue, id_soal_usulan);
//               router.refresh();
//               if (openNotification) {
//                 openNotification(
//                   "success",
//                   "Successfully Updated the International Status"
//                 );
//               }
//             } catch (e) {
//               router.refresh();
//               if (openNotification) {
//                 openNotification(
//                   "error",
//                   "Failed to update the International Status"
//                 );
//               }
//             }
//           }}
//         />
//       ) : undefined,
//   },
// ];

//timnas pengajuan
// const items: DescriptionsProps["items"] = [
//   {
//     key: "1",
//     style: { textAlign: "center" },
//     label: "Status Nasional",
//     children:
//       status_internasional != null ? (
//         status_nasional == "ACCEPTED" ? (
//           <Tag color="success">{status_nasional}</Tag>
//         ) : (
//           <Tag color="error">{status_nasional}</Tag>
//         )
//       ) : status_nasional == "ACCEPTED" ||
//         status_nasional == "REJECTED" ||
//         status_nasional == "FILTERING" ? (
//         <CustomizeSelect
//           options={[
//             { value: "ACCEPTED", label: "ACCEPTED" },
//             { value: "REJECTED", label: "REJECTED" },
//           ]}
//           value={status_nasional == "FILTERING" ? undefined : status_nasional}
//           onChange={async (
//             changedValue: any,
//             setLoading: Dispatch<SetStateAction<boolean>>
//           ) => {
//             try {
//               await changeNationalStatus(changedValue, id_soal_usulan);
//               router.refresh();
//               if (openNotification) {
//                 openNotification(
//                   "success",
//                   "Successfully Updated the National Status"
//                 );
//               }
//             } catch (e) {
//               setLoading(false);
//               if (openNotification) {
//                 openNotification(
//                   "error",
//                   "Failed to update the National Status"
//                 );
//               }
//             }
//           }}
//         />
//       ) : (
//         <Tag color="default">{status_nasional}</Tag>
//       ),
//   },
//   {
//     key: "2",
//     style: { textAlign: "center" },
//     label: "Go To International",
//     children:
//       status_internasional != null ? (
//         gotointernational == true ? (
//           <CheckCircleOutlined style={{ color: "green" }} />
//         ) : (
//           <CloseCircleOutlined style={{ color: "red" }} />
//         )
//       ) : (
//         <CustomizeCheckbox
//           disabled={
//             status_nasional == "FILTERING" ||
//             status_nasional == "ACCEPTED" ||
//             status_nasional == "REJECTED"
//               ? false
//               : true
//           }
//           checked={gotointernational}
//           onChange={async (changedValue: any) => {
//             try {
//               await changeGoToInternational(changedValue, id_soal_usulan);
//               router.refresh();
//               if (openNotification) {
//                 openNotification(
//                   "success",
//                   "Successfully Updated Go To International"
//                 );
//               }
//             } catch (e) {
//               router.refresh();
//               if (openNotification) {
//                 openNotification(
//                   "error",
//                   "Failed to update Go To International"
//                 );
//               }
//             }
//           }}
//         />
//       ),
//   },
//   {
//     key: "3",
//     style: { textAlign: "center" },
//     label: "Status Internasional",
//     children:
//       status_internasional == "WAITING FOR RESULT" ||
//       status_internasional == "ACCEPTED" ||
//       status_internasional == "WORK NEEDED" ||
//       status_internasional == "HELDBACK" ? (
//         <CustomizeSelect
//           options={[
//             { value: "ACCEPTED", label: "ACCEPTED" },
//             { value: "WORK NEEDED", label: "WORK NEEDED" },
//             { value: "HELDBACK", label: "HELDBACK" },
//           ]}
//           value={
//             status_internasional == "WAITING FOR RESULT"
//               ? undefined
//               : status_internasional
//           }
//           onChange={async (
//             changedValue: any,
//             setLoading: Dispatch<SetStateAction<boolean>>
//           ) => {
//             try {
//               await changeInternationalStatus(changedValue, id_soal_usulan);
//               router.refresh();
//               if (openNotification) {
//                 openNotification(
//                   "success",
//                   "Successfully Updated the International Status"
//                 );
//               }
//             } catch (e) {
//               setLoading(false);
//               if (openNotification) {
//                 openNotification(
//                   "error",
//                   "Failed to update the International Status"
//                 );
//               }
//             }
//           }}
//         />
//       ) : status_internasional == null ? (
//         <Tag color="default">-</Tag>
//       ) : (
//         <Tag color="default">{status_internasional}</Tag>
//       ),
//   },
// ];
