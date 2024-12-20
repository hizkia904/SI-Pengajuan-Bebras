"use client";

import {
  Button,
  Divider,
  Form,
  Input,
  List,
  Rate,
  Spin,
  Space,
  Typography,
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
import { MyContext } from "./ProLayoutComp";

const { Item } = Form;
const { Text } = Typography;
const { Item: ItemList } = List;
const { Compact } = Space;
export default function FormRatingInternasional({
  id_soal_usulan,
  ratingInternasional,
}: {
  id_soal_usulan: string;
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
      await addRating(values, false, undefined, undefined, id_soal_usulan);
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

function RatingInternasional({ value }: { value: any }) {
  const openNotification = useContext(MyContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isLastActionSucces, setLastActionSuccess] = useState(true);
  const [openUpdateForm, setOpenForm] = useState(false);
  const [form] = Form.useForm();
  const onFinishUpdateRating = async (values: any) => {
    try {
      setLoading(true);
      await addRating(values, false, value.id_rating_internasional);
      setLastActionSuccess(true);
      router.refresh();
      if (openNotification) {
        openNotification("success", "Successfully update international rating");
      }
    } catch (err) {
      setLastActionSuccess(false);
      router.refresh();
      if (openNotification) {
        openNotification("error", "Failed to update international rating");
      }
    }
  };
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
          <Text strong>{value.name}</Text>
          <Text>As for now</Text>
          <Rate count={6} value={value.as_for_now} disabled />
          <Text>Potential</Text>
          <Rate count={6} value={value.potential} disabled />
          <Button
            type="default"
            icon={<EditOutlined />}
            onClick={() => setOpenForm(true)}
          >
            Update International Rating
          </Button>
        </Space>
      ) : (
        <>
          {loading == false ? (
            <>
              <Space direction="vertical">
                <Form
                  form={form}
                  onFinish={onFinishUpdateRating}
                  layout="vertical"
                >
                  <Item
                    name="nama"
                    label="Nama"
                    rules={[
                      {
                        required: true,
                        message: "Please insert name",
                      },
                    ]}
                    initialValue={value.name}
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
                      Update International Rating
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
