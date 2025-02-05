"use client";
import { useEffect, useState } from "react";

import transformTimestamp from "@/dateTransform";
import { Affix, Space, Steps, Typography, Skeleton } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";

import {
  FileAddOutlined,
  FileDoneOutlined,
  FileSearchOutlined,
  FileSyncOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Input: SkeletonInput } = Skeleton;
export default function DeadlineClient({
  due_date,
  tahap,
}: {
  due_date: Date;
  tahap: number;
}) {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [displayCountdown, setDisplayCountdown] = useState(false);

  useEffect(() => {
    const fetchEventTime = async () => {
      updateCountdown(due_date);
    };

    const updateCountdown = (due_date: Date) => {
      const interval = setInterval(() => {
        const now = new Date();
        const timeDifference = due_date.getTime() - now.getTime();

        if (timeDifference <= 0) {
          clearInterval(interval);
          setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
          setDisplayCountdown(true);
          return;
        }

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
        setDisplayCountdown(true);
      }, 1000);
    };

    fetchEventTime();
  }, [tahap]);
  return (
    <>
      {tahap > 0 ? (
        <>
          {/* <Affix offsetTop={100}> */}
          <Steps
            size="default"
            current={tahap - 1}
            initial={0}
            labelPlacement="vertical"
            items={[
              {
                title: "Pengumpulan Soal",
                icon: tahap <= 1 ? <FileAddOutlined /> : undefined,
              },
              {
                title: "Review Nasional",
                icon: tahap <= 2 ? <FileSearchOutlined /> : undefined,
              },
              {
                title: "Revisi Nasional (oleh Biro)",
                icon: tahap <= 3 ? <FileSyncOutlined /> : undefined,
              },
              {
                title: "Penjaringan",
                icon:
                  tahap <= 4 ? <FontAwesomeIcon icon={faFilter} /> : undefined,
              },
              {
                title: "Review Internasional",
                icon:
                  tahap <= 5 ? (
                    <FontAwesomeIcon icon={faPeopleGroup} />
                  ) : undefined,
              },
              {
                title: "Revisi Internasional (oleh Biro)",
                icon: tahap <= 6 ? <FileSyncOutlined /> : undefined,
              },
              {
                title: "Hasil Internasional",
                icon: tahap <= 7 ? <FileDoneOutlined /> : undefined,
              },
            ]}
          />
          {/* </Affix> */}

          <Space
            direction="vertical"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",

              marginBottom: "20px",
            }}
            size={-30}
          >
            <Title level={4}>Due Date : {transformTimestamp(due_date)}</Title>
            {displayCountdown == false ? (
              <SkeletonInput active block={true} />
            ) : (
              <Text
                type={
                  countdown.days >= 2
                    ? "success"
                    : countdown.days >= 1
                    ? "warning"
                    : "danger"
                }
                style={{ fontSize: "15px" }}
              >
                {countdown.days} Days {countdown.hours} Hours{" "}
                {countdown.minutes} Minutes {countdown.seconds} Seconds
              </Text>
            )}
          </Space>
        </>
      ) : undefined}
    </>
  );
}
