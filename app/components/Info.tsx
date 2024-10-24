"use client";
import {
  FileAddOutlined,
  FileDoneOutlined,
  FileSearchOutlined,
  FileSyncOutlined,
} from "@ant-design/icons";
import { faFilter, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row, Space, Steps, Typography } from "antd";
import { useState } from "react";
const { Paragraph, Title } = Typography;
export default function Info() {
  const [current, setCurrent] = useState(1);
  const onChange = (value: number) => {
    console.log("onChange:", value);
    setCurrent(value);
  };
  return (
    <>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Title level={3}>Info</Title>
        <Row>
          <Col span={8}>
            <Steps
              direction="vertical"
              size="default"
              current={undefined}
              onChange={onChange}
              initial={1}
              items={[
                {
                  title: "Pengumpulan Soal",
                  icon: <FileAddOutlined />,
                  status: current == 1 ? "process" : "wait",
                },
                {
                  title: "Review Nasional",
                  icon: <FileSearchOutlined />,
                  status: current == 2 ? "process" : "wait",
                },
                {
                  title: "Revisi Nasional (oleh Biro)",
                  icon: <FileSyncOutlined />,
                  status: current == 3 ? "process" : "wait",
                },
                {
                  title: "Penjaringan",
                  icon: <FontAwesomeIcon icon={faFilter} />,
                  status: current == 4 ? "process" : "wait",
                },
                {
                  title: "Review Internasional",
                  icon: <FontAwesomeIcon icon={faPeopleGroup} />,
                  status: current == 5 ? "process" : "wait",
                },
                {
                  title: "Revisi Internasional (oleh Biro)",
                  icon: <FileSyncOutlined />,
                  status: current == 6 ? "process" : "wait",
                },
                {
                  title: "Hasil Internasional",
                  icon: <FileDoneOutlined />,
                  status: current == 7 ? "process" : "wait",
                },
              ]}
            />
          </Col>
          <Col span={12}>
            {current == 1 ? (
              <>
                <Title level={5}>Tahap 1 Pengumpulan Soal</Title>
                <Paragraph>
                  Pada tahap ini Biro mengumpulkan soal-soal usulan yang nanti
                  akan direview oleh Tim Nasional.
                </Paragraph>
              </>
            ) : current == 2 ? (
              <>
                <Title level={5}>Tahap 2 Review Nasional</Title>
                <Paragraph>
                  Pada tahap ini Tim Nasional memberi review dan rating dari
                  tiap soal yang dikumpulkan oleh Biro.
                </Paragraph>
              </>
            ) : current == 3 ? (
              <>
                <Title level={5}>Tahap 3 Revisi Nasional (oleh Biro)</Title>
                <Paragraph>
                  Pada tahap ini Biro melakukan revisi berdasarkan review dan
                  rating yang diberikan oleh Tim Nasional.
                </Paragraph>
              </>
            ) : current == 4 ? (
              <>
                <Title level={5}>Tahap 4 Penjaringan</Title>
                <Paragraph>
                  Pada tahap ini Tim Nasional akan memutuskan soal usulan mana
                  yang diterima dan ditolak, serta apakah soal yang diterima
                  akan maju ke internasional atau tidak.
                </Paragraph>
              </>
            ) : current == 5 ? (
              <>
                <Title level={5}>Tahap 5 Review Internasional</Title>
                <Paragraph>
                  Pada tahap ini tim nasional akan memasukkan review dan rating
                  internasional dari tiap soal yang dikumpulkan
                </Paragraph>
              </>
            ) : current == 6 ? (
              <>
                <Title level={5}>
                  Tahap 6 Revisi Internasional (oleh Biro)
                </Title>
                <Paragraph>
                  Pada tahap ini Biro melakukan revisi berdasarkan review dan
                  rating yang diberikan oleh tim internasional
                </Paragraph>
              </>
            ) : current == 7 ? (
              <>
                <Title level={5}>Tahap 7 Hasil Internasional</Title>
                <Paragraph>
                  Pada tahap ini Tim Nasional memasukkan hasil internasional
                  dari tiap soal usulan yang maju ke internasional
                </Paragraph>
              </>
            ) : undefined}
          </Col>
        </Row>
      </Space>
    </>
  );
}
