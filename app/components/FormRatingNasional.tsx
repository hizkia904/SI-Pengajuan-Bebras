"use client";

import {
  Button,
  Divider,
  Form,
  List,
  Rate,
  Spin,
  Typography,
  Space,
} from "antd";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { addRating } from "../actions";
import {
  LoadingOutlined,
  SendOutlined,
  CloseOutlined,
  EditOutlined,
} from "@ant-design/icons";
import transformTimestamp from "@/dateTransform";

import { MyContext } from "./ProLayoutComp";
const { Item } = Form;
const { Text } = Typography;
const { Item: ItemList } = List;
const { Compact } = Space;
export default function FormRatingNasional({
  id_user,
  id_soal_usulan,
  rating,
  rata_rating,
}: {
  id_user: number | undefined;
  id_soal_usulan: string;
  rating: any[];
  rata_rating: any;
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
      <Space direction="vertical" style={{ width: "100%" }}>
        <Text>Average Rating of this task : {rata_rating}</Text>
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
      </Space>
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

function RatingNasional({ value }: { value: any }) {
  const openNotification = useContext(MyContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isLastActionSucces, setLastActionSuccess] = useState(true);
  const [openUpdateForm, setOpenForm] = useState(false);
  const onFinishUpdateRating = async (values: any) => {
    try {
      setLoading(true);
      await addRating(values, true, value.id_rating);
      setLastActionSuccess(true);
      router.refresh();
      if (openNotification) {
        openNotification("success", "Successfully update rating");
      }
    } catch (err) {
      setLastActionSuccess(false);
      router.refresh();
      if (openNotification) {
        openNotification("error", "Failed to update rating");
      }
    }
  };

  const [form] = Form.useForm();

  useEffect(() => {
    if (isLastActionSucces == true) {
      form.resetFields();
      setOpenForm(false);
    }
    setLoading(false);
  }, [value]);

  return (
    <ItemList>
      {openUpdateForm == false ? (
        <Space direction="vertical">
          <Text italic>{transformTimestamp(value.time_stamp)}</Text>
          <Text>As for now</Text>
          <Rate count={6} value={value.as_for_now} disabled />
          <Text>Potential</Text>
          <Rate count={6} value={value.potential} disabled />
          <Button
            type="default"
            icon={<EditOutlined />}
            onClick={() => setOpenForm(true)}
          >
            Update Rating
          </Button>
        </Space>
      ) : (
        <>
          {loading == false ? (
            <>
              <Space direction="vertical">
                <Text italic>{transformTimestamp(value.time_stamp)}</Text>
                <Form
                  form={form}
                  onFinish={onFinishUpdateRating}
                  layout="vertical"
                >
                  <Item
                    name="rating_as_for_now"
                    label="Rating As for Now"
                    rules={[
                      {
                        required: true,
                        message: "Please insert the as for now rating",
                      },
                    ]}
                    initialValue={value.as_for_now}
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
                    initialValue={value.potential}
                  >
                    <Rate count={6} allowClear={false} />
                  </Item>
                  <Compact>
                    <Button
                      type="primary"
                      htmlType="submit"
                      icon={<SendOutlined />}
                    >
                      Update rating
                    </Button>
                    <Button
                      danger
                      type="default"
                      onClick={() => {
                        setOpenForm(false);
                        form.resetFields();
                      }}
                      icon={<CloseOutlined />}
                    >
                      Cancel
                    </Button>
                  </Compact>
                </Form>
              </Space>
            </>
          ) : (
            <Spin indicator={<LoadingOutlined spin />} />
          )}
        </>
      )}
    </ItemList>
  );
}
