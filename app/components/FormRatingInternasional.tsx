"use client";

import { Button, Divider, Form, Input, List, Rate, Spin } from "antd";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import RatingInternasional from "./RatingInternasional";
import { addRating } from "../actions";

import { LoadingOutlined, SendOutlined } from "@ant-design/icons";
import { MyContext } from "./ProLayoutComp";

const { Item } = Form;

export default function FormRatingInternasional({
  id_soal_usulan,
  id_user,
  ratingInternasional,
}: {
  id_soal_usulan: string;
  id_user: number | undefined;
  ratingInternasional: any[];
}) {
  const openNotification = useContext(MyContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isLastActionSuccess, setSuccess] = useState(false);
  const [page, changePage] = useState(1);
  const [form] = Form.useForm();
  const onFinishRatingInternasional = async (values: any) => {
    try {
      setLoading(true);
      await addRating(values, false, undefined, id_user, id_soal_usulan);
      setSuccess(true);
      router.refresh();
      if (openNotification) {
        openNotification("success", "Successfully add International Rating");
      }
    } catch (e) {
      setSuccess(false);
      router.refresh();
      if (openNotification) {
        openNotification("error", "Failed to add international rating");
      }
    }
  };
  useEffect(() => {
    if (isLastActionSuccess == true) {
      form.resetFields();
    }
    setLoading(false);
  }, [ratingInternasional]);

  return (
    <>
      {ratingInternasional.length !== 0 && (
        <>
          <List
            header="Rating Internasional"
            pagination={{
              current: page,
              total: ratingInternasional.length,
              pageSize: 1,
              onChange(page, pageSize) {
                changePage(page);
              },
            }}
            bordered
            dataSource={ratingInternasional}
            renderItem={(item: any, index: number) => {
              return <RatingInternasional key={item.id_rating} value={item} />;
            }}
          />
        </>
      )}
      <Divider style={{ borderColor: "#1677ff" }}>Add new rating</Divider>
      {loading == false ? (
        <Form
          form={form}
          onFinish={onFinishRatingInternasional}
          layout="vertical"
        >
          <Item
            name="nama"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please insert the name",
              },
            ]}
          >
            <Input />
          </Item>
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
            Add International rating
          </Button>
        </Form>
      ) : (
        <Spin indicator={<LoadingOutlined spin />} />
      )}
    </>
  );
}
