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
const { Group: RadioGroup } = Radio;

Chart.register(...registerables);

export default function TabelDashboardClient({
  dashboardData,
  grafik,
  role,
}: {
  dashboardData: DashboardData[];
  grafik: Grafik;
  role: string;
}) {
  const tambahanColumnTimnas: TableProps<DashboardData>["columns"] = [
    {
      title: "Partisipasi Biro",
      dataIndex: "partisipasibiro",
      align: "center",
    },
  ];

  const columns: TableProps<DashboardData>["columns"] = [
    { title: "Tahun", dataIndex: "tahun", align: "center" },
    {
      title: "Total Soal",
      dataIndex: "totalsoalterkumpul",
      align: "center",
    },
    ...(role == "TIM NASIONAL" ? tambahanColumnTimnas : []),
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

  const [datasets, setDatasets] = useState<ChartDataset<"bar", number[]>[]>([
    {
      borderColor: "#979ff7",
      backgroundColor: "#979ff7",
      label: "Soal Terkumpul",
      data: grafik.totalsoalterkumpul,
    },
  ]);
  const options = [
    "Soal Terkumpul",
    ...(role == "TIM NASIONAL" ? ["Partisipasi Biro"] : []),
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
        ...(role == "TIM NASIONAL" ? ["Partisipasi Biro"] : []),
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
          backgroundColor: "#979ff7",
          label: "Soal Terkumpul",
          data: grafik.totalsoalterkumpul,
        },
        ...(role == "TIM NASIONAL"
          ? [
              {
                label: "Partisipasi Biro",
                borderColor: "#489da8",
                backgroundColor: "#489da8",
                data: grafik.partisipasibiro,
              },
            ]
          : []),
        {
          label: "Accepted Nasional",
          borderColor: "#a2e8a8",
          backgroundColor: "#a2e8a8",
          data: grafik.nasionalaccepted,
        },
        {
          label: "Rejected Nasional",
          borderColor: "#f7a797",
          backgroundColor: "#f7a797",
          data: grafik.nasionalrejected,
        },
        {
          label: "Masuk Tahap Internasional",
          borderColor: "#f797ee",
          backgroundColor: "#f797ee",
          data: grafik.gotointernational,
        },
        {
          label: "Accepted Internasional",
          borderColor: "#97f7cc",
          backgroundColor: "#97f7cc",
          data: grafik.internationalaccepted,
        },
        {
          label: "Heldback Internasional",
          borderColor: "#d7e32b",
          backgroundColor: "#d7e32b",
          data: grafik.internationalheldback,
        },
        {
          label: "Work Needed Internasional",
          borderColor: "#e32b4d",
          backgroundColor: "#e32b4d",
          data: grafik.internationalworkNeeded,
        },
      ]);
    } else {
      setValueGroup([]);
      setDatasets([]);
    }
  };
  const [valueGroup, setValueGroup] = useState<String[]>(["Soal Terkumpul"]);

  const [tipeGrafik, setTipeGrafik] = useState<"bar" | "line">("bar");

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
            scroll={{ y: 54 * 7 }}
          />
        ) : (
          <>
            <RadioGroup
              // block
              options={[
                { label: "Line", value: "line" },
                { label: "Bar", value: "bar" },
              ]}
              value={tipeGrafik}
              onChange={(e) => {
                setTipeGrafik(e.target.value);
              }}
              optionType="button"
              buttonStyle="solid"
            />
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
                setValueGroup(checkedValue);
                const newArr: ChartDataset<"line", number[]>[] = [];
                if (checkedValue.includes("Soal Terkumpul")) {
                  newArr.push({
                    borderColor: "#979ff7",
                    backgroundColor: "#979ff7",
                    label: "Soal Terkumpul",
                    data: grafik.totalsoalterkumpul,
                  });
                }
                if (
                  checkedValue.includes("Partisipasi Biro") &&
                  role == "TIM NASIONAL"
                ) {
                  newArr.push({
                    label: "Partisipasi Biro",
                    borderColor: "#489da8",
                    backgroundColor: "#489da8",
                    data: grafik.partisipasibiro,
                  });
                }
                if (checkedValue.includes("Accepted Nasional")) {
                  newArr.push({
                    label: "Accepted Nasional",
                    borderColor: "#a2e8a8",
                    backgroundColor: "#a2e8a8",
                    data: grafik.nasionalaccepted,
                  });
                }
                if (checkedValue.includes("Rejected Nasional")) {
                  newArr.push({
                    label: "Rejected Nasional",
                    borderColor: "#f7a797",
                    backgroundColor: "#f7a797",
                    data: grafik.nasionalrejected,
                  });
                }
                if (checkedValue.includes("Masuk Tahap Internasional")) {
                  newArr.push({
                    label: "Masuk Tahap Internasional",
                    borderColor: "#f797ee",
                    backgroundColor: "#f797ee",
                    data: grafik.gotointernational,
                  });
                }
                if (checkedValue.includes("Accepted Internasional")) {
                  newArr.push({
                    label: "Accepted Internasional",
                    borderColor: "#97f7cc",
                    backgroundColor: "#97f7cc",
                    data: grafik.internationalaccepted,
                  });
                }
                if (checkedValue.includes("Heldback Internasional")) {
                  newArr.push({
                    label: "Heldback Internasional",
                    borderColor: "#d7e32b",
                    backgroundColor: "#d7e32b",
                    data: grafik.internationalheldback,
                  });
                }
                if (checkedValue.includes("Work Needed Internasional")) {
                  newArr.push({
                    label: "Work Needed Internasional",
                    borderColor: "#e32b4d",
                    backgroundColor: "#e32b4d",
                    data: grafik.internationalworkNeeded,
                  });
                }
                setDatasets(newArr);
              }}
            />
            {tipeGrafik == "line" ? (
              <>
                <Line
                  style={{ width: "100%" }}
                  options={{
                    scales: {
                      y: {
                        suggestedMax: 10,
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
            ) : (
              <Bar
                style={{ width: "100%" }}
                options={{
                  scales: {
                    y: {
                      suggestedMax: 10,
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
            )}
          </>
        )}
      </Space>
    </>
  );
}
