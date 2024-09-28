"use client";

import { Button, Divider, Form, List, Rate, Spin, Typography } from "antd";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { addRating } from "../actions";
import { LoadingOutlined, SendOutlined } from "@ant-design/icons";

import RatingNasional from "./RatingNasional";
import { MyContext } from "./ProLayoutComp";
const { Item } = Form;

export default function FormRating({
  id_user,
  id_soal_usulan,
  rating,
}: {
  id_user: number | undefined;
  id_soal_usulan: string;
  rating: any[];
}) {
  const openNotification = useContext(MyContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const onFinishRating = async (values: any) => {
    try {
      setLoading(true);
      await addRating(values, true, undefined, id_user, id_soal_usulan);
      setSuccess(true);
      router.refresh();
      if (openNotification) {
        openNotification("success", "Successfully add rating");
      }
    } catch (err) {
      setSuccess(false);
      router.refresh();
      if (openNotification) {
        openNotification("error", "Failed to add rating");
      }
    }
  };

  useEffect(() => {
    if (isLastActionSuccess == true) {
      form.resetFields();
    }
    setLoading(false);
  }, [rating]);

  const [form] = Form.useForm();

  const [page, changePage] = useState(1);

  const [isLastActionSuccess, setSuccess] = useState(false);

  return (
    <>
      {rating.length != 0 && (
        <>
          <List
            header="Rating"
            pagination={{
              current: page,
              total: rating.length,
              pageSize: 1,
              onChange(page, pageSize) {
                changePage(page);
              },
            }}
            bordered
            dataSource={rating}
            renderItem={(item: any, index: number) => {
              return <RatingNasional key={item.id_rating} value={item} />;
            }}
          />
        </>
      )}
      <Divider style={{ borderColor: "#1677ff" }}>Add new rating</Divider>
      {loading == false ? (
        <Form form={form} onFinish={onFinishRating} layout="vertical">
          <Item
            name="rating_as_for_now"
            label="Rating As for Now"
            rules={[
              {
                required: true,
                message: "Please insert the as for now rating",
              },
            ]}
          >
            <Rate count={6} allowClear={false} />
          </Item>
          <Item
            name="rating_potential"
            label="Rating Potential"
            rules={[
              {
                required: true,
                message: "Please insert the potential rating",
              },
            ]}
          >
            <Rate count={6} allowClear={false} />
          </Item>

          <Button type="primary" htmlType="submit" icon={<SendOutlined />}>
            Add rating
          </Button>
        </Form>
      ) : (
        <Spin indicator={<LoadingOutlined spin />} />
      )}
    </>
  );
}
