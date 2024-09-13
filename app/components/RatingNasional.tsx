"use client";
import { useContext, useEffect, useState } from "react";
import { addRating } from "../actions";
import { useRouter } from "next/navigation";
import { NotificationType } from "@/allType";
import { Button, Form, List, Rate, Space, Spin, Typography } from "antd";
import {
  CloseOutlined,
  EditOutlined,
  LoadingOutlined,
  SendOutlined,
} from "@ant-design/icons";
import transformTimestamp from "@/dateTransform";
import { MyContext } from "./ProLayoutComp";

const { Text } = Typography;
const { Item } = Form;
const { Item: ItemList } = List;
const { Compact } = Space;
export default function RatingNasional({ value }: { value: any }) {
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
