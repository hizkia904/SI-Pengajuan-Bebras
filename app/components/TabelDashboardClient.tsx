"use client";
import { DashboardData, Grafik } from "@/interface";
import {
  Radio,
  Select,
  Space,
  Table,
  TableProps,
  Typography,
  Checkbox,
  CheckboxProps,
} from "antd";
import { Bar, Line } from "react-chartjs-2";
import { Chart, ChartDataset, registerables } from "chart.js";
import { useState } from "react";
const { Title } = Typography;
const { Group } = Checkbox;

Chart.register(...registerables);

export default function TabelDashboardClient({
  dashboardData,
  grafik,
}: {
  dashboardData: DashboardData[];
  grafik: Grafik;
}) {
  console.log(grafik.internationalworkNeeded);
  const columns: TableProps<DashboardData>["columns"] = [
    { title: "Tahun", dataIndex: "tahun", align: "center" },
    {
      title: "Total Soal",
      dataIndex: "totalsoalterkumpul",
      align: "center",
    },
    {
      title: "Partisipasi Biro",
      dataIndex: "partisipasibiro",
      align: "center",
    },
    {
      title: "Status Nasional",
      align: "center",
      children: [
        {
          title: "Accepted",
          dataIndex: "nasionalaccepted",
          align: "center",
        },
        {
          title: "Rejected",
          dataIndex: "nasionalrejected",
          align: "center",
        },
      ],
    },

    {
      title: "Maju tahap internasional",
      dataIndex: "gotointernational",
      align: "center",
    },
    {
      title: "Status Internasional",
      align: "center",
      children: [
        {
          title: "Accepted",
          dataIndex: "internationalaccepted",
          align: "center",
        },
        {
          title: "Heldback",
          dataIndex: "internationalheldback",
          align: "center",
        },
        {
          title: "Work Needed",
          dataIndex: "internationalworkneeded",
          align: "center",
        },
      ],
    },
  ];

  const [mode, setMode] = useState<"Grafik" | "Tabel">("Tabel");

  // const [showLine1, setShowLine1] = useState(true);
  // const [showLine2, setShowLine2] = useState(false);
  // const [showLine3, setShowLine3] = useState(false);
  // const [showLine4, setShowLine4] = useState(false);
  // const [showLine5, setShowLine5] = useState(false);
  // const [showLine6, setShowLine6] = useState(false);
  // const [showLine7, setShowLine7] = useState(false);
  // const [showLine8, setShowLine8] = useState(false);

  const [datasets, setDatasets] = useState<ChartDataset<"line", number[]>[]>([
    {
      borderColor: "#979ff7",
      label: "Soal Terkumpul",
      data: grafik.totalsoalterkumpul,
    },
  ]);
  console.log(dashboardData);
  const options = [
    "Soal Terkumpul",
    "Partisipasi Biro",
    "Accepted Nasional",
    "Rejected Nasional",
    "Masuk Tahap Internasional",
    "Accepted Internasional",
    "Heldback Internasional",
    "Work Needed Internasional",
  ];
  const indeterminate = datasets.length > 0 && datasets.length < options.length;
  const checkAll = options.length === datasets.length;
  const onCheckAllChange: CheckboxProps["onChange"] = (e) => {
    if (e.target.checked) {
      setValueGroup([
        "Soal Terkumpul",
        "Partisipasi Biro",
        "Accepted Nasional",
        "Rejected Nasional",
        "Masuk Tahap Internasional",
        "Accepted Internasional",
        "Heldback Internasional",
        "Work Needed Internasional",
      ]);
      setDatasets([
        {
          borderColor: "#979ff7",
          label: "Soal Terkumpul",
          data: grafik.totalsoalterkumpul,
        },
        {
          label: "Partisipasi Biro",
          borderColor: "#489da8",
          data: grafik.partisipasibiro,
        },
        {
          label: "Accepted Nasional",
          borderColor: "#a2e8a8",
          data: grafik.nasionalaccepted,
        },
        {
          label: "Rejected Nasional",
          borderColor: "#f7a797",
          data: grafik.nasionalrejected,
        },
        {
          label: "Masuk Tahap Internasional",
          borderColor: "#f797ee",
          data: grafik.gotointernational,
        },
        {
          label: "Accepted Internasional",
          borderColor: "#97f7cc",
          data: grafik.internationalaccepted,
        },
        {
          label: "Heldback Internasional",
          borderColor: "#d7e32b",
          data: grafik.internationalheldback,
        },
        {
          label: "Work Needed Internasional",
          borderColor: "#e32b4d",
          data: grafik.internationalworkNeeded,
        },
      ]);
    } else {
      setValueGroup([]);
      setDatasets([]);
    }
  };
  const [valueGroup, setValueGroup] = useState<String[]>(["Soal Terkumpul"]);
  return (
    <>
      <Title level={3}>Dashboard</Title>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Select
          onChange={(value) => {
            setMode(value);
          }}
          value={mode}
          allowClear={false}
          style={{ width: "30%" }}
          options={[
            { label: "Tabel", value: "Tabel" },
            { label: "Grafik", value: "Grafik" },
          ]}
        />
        {mode == "Tabel" ? (
          <Table
            pagination={false}
            bordered
            columns={columns}
            dataSource={dashboardData}
          />
        ) : (
          <>
            <Checkbox
              indeterminate={indeterminate}
              onChange={onCheckAllChange}
              checked={checkAll}
            >
              Check all
            </Checkbox>
            <Group
              value={valueGroup}
              defaultValue={["Soal Terkumpul"]}
              options={options}
              onChange={(checkedValue) => {
                console.log(checkedValue);
                setValueGroup(checkedValue);
                const newArr: ChartDataset<"line", number[]>[] = [];
                if (checkedValue.includes("Soal Terkumpul")) {
                  newArr.push({
                    borderColor: "#979ff7",
                    label: "Soal Terkumpul",
                    data: grafik.totalsoalterkumpul,
                  });
                }
                if (checkedValue.includes("Partisipasi Biro")) {
                  newArr.push({
                    label: "Partisipasi Biro",
                    borderColor: "#489da8",
                    data: grafik.partisipasibiro,
                  });
                }
                if (checkedValue.includes("Accepted Nasional")) {
                  newArr.push({
                    label: "Accepted Nasional",
                    borderColor: "#a2e8a8",
                    data: grafik.nasionalaccepted,
                  });
                }
                if (checkedValue.includes("Rejected Nasional")) {
                  newArr.push({
                    label: "Rejected Nasional",
                    borderColor: "#f7a797",
                    data: grafik.nasionalrejected,
                  });
                }
                if (checkedValue.includes("Masuk Tahap Internasional")) {
                  newArr.push({
                    label: "Masuk Tahap Internasional",
                    borderColor: "#f797ee",
                    data: grafik.gotointernational,
                  });
                }
                if (checkedValue.includes("Accepted Internasional")) {
                  newArr.push({
                    label: "Accepted Internasional",
                    borderColor: "#97f7cc",
                    data: grafik.internationalaccepted,
                  });
                }
                if (checkedValue.includes("Heldback Internasional")) {
                  newArr.push({
                    label: "Heldback Internasional",
                    borderColor: "#d7e32b",
                    data: grafik.internationalheldback,
                  });
                }
                if (checkedValue.includes("Work Needed Internasional")) {
                  newArr.push({
                    label: "Work Needed Internasional",
                    borderColor: "#e32b4d",
                    data: grafik.internationalworkNeeded,
                  });
                }
                setDatasets(newArr);
              }}
            />
            <Line
              style={{ width: "100%" }}
              options={{
                scales: {
                  y: {
                    suggestedMax: 30,
                    suggestedMin: 0,
                  },
                },
                responsive: true,
                maintainAspectRatio: false,
                borderColor: "#1677ff",
              }}
              data={{
                datasets: datasets,
                labels: grafik.tahun,
              }}
            />
          </>
        )}
      </Space>
    </>
  );
}
