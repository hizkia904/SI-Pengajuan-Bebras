"use client";

import { LoadingOutlined, SendOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, notification, Spin } from "antd";
import { useContext, useEffect, useState } from "react";
import { addSchedule } from "../actions";
import { useRouter } from "next/navigation";
import { NotificationType } from "@/allType";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { MyContext } from "./ProLayoutComp";
import { useForm } from "antd/lib/form/Form";
const { Item } = Form;
export default function Persiapan({
  tahap_sekarang,
}: {
  tahap_sekarang: any[];
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [form] = useForm();
  const openNotification = useContext(MyContext);
  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const transformValues = { ...values };
      transformValues.deadline_tahap1 =
        transformValues.deadline_tahap1.toDate();
      transformValues.deadline_tahap2 =
        transformValues.deadline_tahap2.toDate();
      transformValues.deadline_tahap3 =
        transformValues.deadline_tahap3.toDate();
      transformValues.deadline_tahap4 =
        transformValues.deadline_tahap4.toDate();
      transformValues.deadline_tahap5 =
        transformValues.deadline_tahap5.toDate();
      transformValues.deadline_tahap6 =
        transformValues.deadline_tahap6.toDate();
      transformValues.deadline_tahap7 =
        transformValues.deadline_tahap7.toDate();

      await addSchedule(transformValues);
      router.refresh();
      if (openNotification) {
        openNotification("success", "Successfully add schedule");
      }
    } catch (e) {
      router.refresh();
      if (openNotification) {
        openNotification("error", "Failed to add schedule");
      }
    }
  };

  useEffect(() => {
    setLoading(false);
  }, [tahap_sekarang]);

  const [tahap1, setTahap1] = useState<dayjs.Dayjs | null>(null);

  const [tahap2, setTahap2] = useState<dayjs.Dayjs | null>(null);

  const [tahap3, setTahap3] = useState<dayjs.Dayjs | null>(null);

  const [tahap4, setTahap4] = useState<dayjs.Dayjs | null>(null);

  const [tahap5, setTahap5] = useState<dayjs.Dayjs | null>(null);

  const [tahap6, setTahap6] = useState<dayjs.Dayjs | null>(null);

  const disabledHoursAndMinutes = (
    hour: number,
    minute: number
  ): { disabledHours: number[]; disabledMinutes: number[] } => {
    if (hour == 23 && minute == 59) {
      const disabledHours = new Array<number>();
      const disabledMinutes = new Array<number>();

      return { disabledHours, disabledMinutes };
    } else {
      const disabledHours = [];

      for (let i = 0; i <= 23; i++) {
        if (minute == 59) {
          if (i <= hour) {
            disabledHours.push(i);
          }
        } else {
          if (i < hour) {
            disabledHours.push(i);
          }
        }
      }

      const disabledMinutes = [];
      for (let i = 0; i <= 59; i++) {
        if (i <= minute) {
          disabledMinutes.push(i);
        }
      }
      return { disabledHours, disabledMinutes };
    }
  };

  return (
    <>
      {loading == true ? (
        <Spin indicator={<LoadingOutlined spin />} />
      ) : (
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Item
            name="deadline_tahap1"
            label="Batas akhir pengumpulan soal"
            rules={[
              {
                required: true,
                message: "Please insert the deadline",
              },
            ]}
          >
            <DatePicker
              showTime
              showSecond={false}
              format="DD-MM-YYYY HH:mm"
              onChange={(date: dayjs.Dayjs, dateString: string | string[]) => {
                if (date.minute() == 59 && date.hour() == 23) {
                  const addOneDay = date.add(1, "day");
                  setTahap1(addOneDay);
                } else {
                  setTahap1(date);
                }
              }}
            />
          </Item>
          <Item
            dependencies={["deadline_tahap1"]}
            name="deadline_tahap2"
            label="Batas akhir review nasional"
            rules={[
              {
                required: true,
                message: "Please insert the deadline",
              },
              {
                validator(rule, value, callback) {
                  if (value.isAfter(tahap1)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "Deadline tahap 2 tidak boleh lebih dulu dari deadline tahap 1"
                    )
                  );
                },
              },
            ]}
          >
            <DatePicker
              showTime
              showSecond={false}
              format="DD-MM-YYYY HH:mm"
              onChange={(date: dayjs.Dayjs, dateString: string | string[]) => {
                if (date.minute() == 59 && date.hour() == 23) {
                  const addOneDay = date.add(1, "day");
                  setTahap2(addOneDay);
                } else {
                  setTahap2(date);
                }
              }}
              disabledTime={(date: dayjs.Dayjs) => {
                if (tahap1 && tahap1.isSame(date, "date")) {
                  const { disabledHours, disabledMinutes } =
                    disabledHoursAndMinutes(tahap1.hour(), tahap1.minute());
                  return {
                    disabledHours: () => disabledHours,
                    disabledMinutes: (hour: number) => {
                      if (hour == tahap1.hour()) {
                        return disabledMinutes;
                      } else {
                        return [];
                      }
                    },
                  };
                } else {
                  return {};
                }
              }}
              minDate={tahap1 != null ? tahap1 : undefined}
            />
          </Item>
          <Item
            dependencies={["deadline_tahap2"]}
            name="deadline_tahap3"
            label="Batas akhir revisi nasional"
            rules={[
              {
                required: true,
                message: "Please insert the deadline",
              },
              {
                validator(rule, value, callback) {
                  if (value.isAfter(tahap2)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "Deadline tahap 3 tidak boleh lebih dulu dari deadline tahap 2"
                    )
                  );
                },
              },
            ]}
          >
            <DatePicker
              showTime
              showSecond={false}
              format="DD-MM-YYYY HH:mm"
              onChange={(date: dayjs.Dayjs, dateString: string | string[]) => {
                if (date.minute() == 59 && date.hour() == 23) {
                  const addOneDay = date.add(1, "day");
                  setTahap3(addOneDay);
                } else {
                  setTahap3(date);
                }
              }}
              disabledTime={(date: dayjs.Dayjs) => {
                if (tahap2 && tahap2.isSame(date, "date")) {
                  const { disabledHours, disabledMinutes } =
                    disabledHoursAndMinutes(tahap2.hour(), tahap2.minute());
                  return {
                    disabledHours: () => disabledHours,
                    disabledMinutes: (hour: number) => {
                      if (hour == tahap2.hour()) {
                        return disabledMinutes;
                      } else {
                        return [];
                      }
                    },
                  };
                } else {
                  return {};
                }
              }}
              minDate={tahap2 != null ? tahap2 : undefined}
            />
          </Item>
          <Item
            dependencies={["deadline_tahap3"]}
            name="deadline_tahap4"
            label="Batas akhir pemilihan usulan soal untuk internasional"
            rules={[
              {
                required: true,
                message: "Please insert the deadline",
              },
              {
                validator(rule, value, callback) {
                  if (value.isAfter(tahap3)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "Deadline tahap 4 tidak boleh lebih dulu dari deadline tahap 3"
                    )
                  );
                },
              },
            ]}
          >
            <DatePicker
              showTime
              showSecond={false}
              format="DD-MM-YYYY HH:mm"
              onChange={(date: dayjs.Dayjs, dateString: string | string[]) => {
                if (date.minute() == 59 && date.hour() == 23) {
                  const addOneDay = date.add(1, "day");
                  setTahap4(addOneDay);
                } else {
                  setTahap4(date);
                }
              }}
              disabledTime={(date: dayjs.Dayjs) => {
                if (tahap3 && tahap3.isSame(date, "date")) {
                  const { disabledHours, disabledMinutes } =
                    disabledHoursAndMinutes(tahap3.hour(), tahap3.minute());
                  return {
                    disabledHours: () => disabledHours,
                    disabledMinutes: (hour: number) => {
                      if (hour == tahap3.hour()) {
                        return disabledMinutes;
                      } else {
                        return [];
                      }
                    },
                  };
                } else {
                  return {};
                }
              }}
              minDate={tahap3 != null ? tahap3 : undefined}
            />
          </Item>
          <Item
            dependencies={["deadline_tahap4"]}
            name="deadline_tahap5"
            label="Batas akhir review internasional"
            rules={[
              {
                required: true,
                message: "Please insert the deadline",
              },
              {
                validator(rule, value, callback) {
                  if (value.isAfter(tahap4)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "Deadline tahap 5 tidak boleh lebih dulu dari deadline tahap 4"
                    )
                  );
                },
              },
            ]}
          >
            <DatePicker
              showTime
              showSecond={false}
              format="DD-MM-YYYY HH:mm"
              onChange={(date: dayjs.Dayjs, dateString: string | string[]) => {
                if (date.minute() == 59 && date.hour() == 23) {
                  const addOneDay = date.add(1, "day");
                  setTahap5(addOneDay);
                } else {
                  setTahap5(date);
                }
              }}
              disabledTime={(date: dayjs.Dayjs) => {
                if (tahap4 && tahap4.isSame(date, "date")) {
                  const { disabledHours, disabledMinutes } =
                    disabledHoursAndMinutes(tahap4.hour(), tahap4.minute());
                  return {
                    disabledHours: () => disabledHours,
                    disabledMinutes: (hour: number) => {
                      if (hour == tahap4.hour()) {
                        return disabledMinutes;
                      } else {
                        return [];
                      }
                    },
                  };
                } else {
                  return {};
                }
              }}
              minDate={tahap4 != null ? tahap4 : undefined}
            />
          </Item>
          <Item
            dependencies={["deadline_tahap5"]}
            name="deadline_tahap6"
            label="Batas akhir revisi internasional"
            rules={[
              {
                required: true,
                message: "Please insert the deadline",
              },
              {
                validator(rule, value, callback) {
                  if (value.isAfter(tahap5)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "Deadline tahap 6 tidak boleh lebih dulu dari deadline tahap 5"
                    )
                  );
                },
              },
            ]}
          >
            <DatePicker
              showTime
              showSecond={false}
              format="DD-MM-YYYY HH:mm"
              onChange={(date: dayjs.Dayjs, dateString: string | string[]) => {
                if (date.minute() == 59 && date.hour() == 23) {
                  const addOneDay = date.add(1, "day");
                  setTahap6(addOneDay);
                } else {
                  setTahap6(date);
                }
              }}
              disabledTime={(date: dayjs.Dayjs) => {
                if (tahap5 && tahap5.isSame(date, "date")) {
                  const { disabledHours, disabledMinutes } =
                    disabledHoursAndMinutes(tahap5.hour(), tahap5.minute());
                  return {
                    disabledHours: () => disabledHours,
                    disabledMinutes: (hour: number) => {
                      if (hour == tahap5.hour()) {
                        return disabledMinutes;
                      } else {
                        return [];
                      }
                    },
                  };
                } else {
                  return {};
                }
              }}
              minDate={tahap5 != null ? tahap5 : undefined}
            />
          </Item>
          <Item
            dependencies={["deadline_tahap6"]}
            name="deadline_tahap7"
            label="Batas akhir hasil usulan soal dari internasional"
            rules={[
              {
                required: true,
                message: "Please insert the deadline",
              },
              {
                validator(rule, value, callback) {
                  if (value.isAfter(tahap6)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "Deadline tahap 7 tidak boleh lebih dulu dari deadline tahap 6"
                    )
                  );
                },
              },
            ]}
          >
            <DatePicker
              showTime
              showSecond={false}
              format="DD-MM-YYYY HH:mm"
              disabledTime={(date: dayjs.Dayjs) => {
                if (tahap6 && tahap6.isSame(date, "date")) {
                  const { disabledHours, disabledMinutes } =
                    disabledHoursAndMinutes(tahap6.hour(), tahap6.minute());
                  return {
                    disabledHours: () => disabledHours,
                    disabledMinutes: (hour: number) => {
                      if (hour == tahap6.hour()) {
                        return disabledMinutes;
                      } else {
                        return [];
                      }
                    },
                  };
                } else {
                  return {};
                }
              }}
              minDate={tahap6 != null ? tahap6 : undefined}
            />
          </Item>
          <Button type="primary" htmlType="submit" icon={<SendOutlined />}>
            Submit
          </Button>
        </Form>
      )}
    </>
  );
}
