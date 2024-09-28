"use client";

import { EditOutlined, KeyOutlined } from "@ant-design/icons";
import {
  Button,
  Descriptions,
  DescriptionsProps,
  Form,
  Modal,
  Select,
  Space,
  Typography,
  Input,
  Carousel,
  Tabs,
} from "antd";
import {
  changeBiro,
  changeEmail,
  changeName,
  changeUsername,
  checkPassword,
  updatePassword,
} from "../actions";
import { useContext, useState } from "react";
import { MyContext } from "./ProLayoutComp";
import { useRouter } from "next/navigation";
const { Text } = Typography;
const { Item } = Form;
const { Password } = Input;
export default function Profile({
  userData,
  id_user,
  biro,
}: {
  userData: any;
  id_user: number;
  biro: any[];
}) {
  const router = useRouter();
  const openNotification = useContext(MyContext);
  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "UserName",
      children: (
        <Text
          editable={{
            async onChange(value) {
              try {
                if (id_user) {
                  await changeUsername(value, id_user);
                }
                router.refresh();
                if (openNotification) {
                  openNotification("success", "Successfully change username");
                }
              } catch (e) {
                if (openNotification) {
                  openNotification("error", "Failed to change username");
                }
              }
            },
          }}
        >
          {userData.username}
        </Text>
      ),
    },
    {
      key: "2",
      label: "Nama",
      children: (
        <Text
          editable={{
            async onChange(value) {
              try {
                if (id_user) {
                  await changeName(value, id_user);
                }
                router.refresh();
                if (openNotification) {
                  openNotification("success", "Successfully change name");
                }
              } catch (e) {
                if (openNotification) {
                  openNotification("error", "Failed to change name");
                }
              }
            },
          }}
        >
          {userData.nama}
        </Text>
      ),
    },
    {
      key: "3",
      label: "Email",
      children: (
        <Text
          editable={{
            async onChange(value) {
              try {
                if (id_user) {
                  await changeEmail(value, id_user);
                }
                router.refresh();
                if (openNotification) {
                  openNotification("success", "Successfully change email");
                }
              } catch (e) {
                if (openNotification) {
                  openNotification("error", "Failed to change email");
                }
              }
            },
          }}
        >
          {userData.email}
        </Text>
      ),
    },
    {
      key: "4",
      label: "Biro",
      children: (
        <>
          {userData.nama_biro}
          <Button
            icon={<EditOutlined />}
            type="link"
            size="small"
            onClick={() => setOpenFormBiro(true)}
          />
        </>
      ),
    },
    {
      key: "5",
      label: "Role",
      children: userData.role,
    },
  ];

  const [openFormBiro, setOpenFormBiro] = useState(false);
  const [formBiro] = Form.useForm();

  const [openFormPass, setOpenFormPass] = useState(false);
  const [tahap, setTahap] = useState<"input_old" | "input_new">("input_old");
  const [formOldPass] = Form.useForm();
  const [formNewPass] = Form.useForm();
  const hidePassForm = () => {
    setTahap("input_old");
    setOpenFormPass(false);
    formOldPass.resetFields();
    formNewPass.resetFields();
  };
  return (
    <>
      <Descriptions title="User Data" layout="vertical" items={items} />
      <Button icon={<KeyOutlined />} onClick={() => setOpenFormPass(true)}>
        Change Password
      </Button>
      <Modal
        title="Change Password"
        open={openFormPass}
        onCancel={hidePassForm}
        onOk={() => {
          if (tahap == "input_old") {
            formOldPass.submit();
          } else {
            formNewPass.submit();
          }
        }}
      >
        <Tabs
          activeKey={tahap}
          centered
          items={[
            {
              forceRender: true,
              key: "input_old",
              label: "Old Password",
              children: (
                <Form
                  layout="vertical"
                  form={formOldPass}
                  onFinish={async (values) => {
                    try {
                      if (id_user) {
                        const res = await checkPassword(
                          values.oldPass,
                          id_user
                        );
                        if (res == true) {
                          setTahap("input_new");
                        } else {
                          if (openNotification) {
                            openNotification(
                              "error",
                              "Your Password is incorrect"
                            );
                          }
                        }
                      }
                    } catch (e) {
                      if (openNotification) {
                        openNotification(
                          "error",
                          "Something wrong with database"
                        );
                      }
                    }
                  }}
                >
                  <Item
                    label="Please enter your old password"
                    name="oldPass"
                    rules={[
                      { required: true, message: "Please fill out this field" },
                    ]}
                  >
                    <Password />
                  </Item>
                </Form>
              ),
            },
            {
              forceRender: true,
              key: "input_new",
              label: "New Password",
              children: (
                <Form
                  form={formNewPass}
                  layout="vertical"
                  onFinish={async (values) => {
                    try {
                      if (id_user) {
                        await updatePassword(values.newPass, id_user);
                      }
                      if (openNotification) {
                        openNotification(
                          "success",
                          "Successfully change password"
                        );
                      }
                      hidePassForm();
                    } catch (e) {
                      if (openNotification) {
                        openNotification("error", "Failed to change password");
                      }
                    }
                  }}
                >
                  <Item
                    label="Please enter your new password"
                    name="newPass"
                    rules={[
                      { required: true, message: "Please fill out this field" },
                      {
                        min: 5,
                        message:
                          "Too short! Please enter at least 5 characters",
                      },
                      {
                        max: 10,
                        message:
                          "Too long! Please limit your input to 10 characters",
                      },
                    ]}
                  >
                    <Password />
                  </Item>
                </Form>
              ),
            },
          ]}
        />
      </Modal>
      <Modal
        open={openFormBiro}
        onCancel={() => {
          formBiro.resetFields();
          setOpenFormBiro(false);
        }}
        onOk={() => formBiro.submit()}
      >
        <Form
          form={formBiro}
          layout="vertical"
          onFinish={async (values: any) => {
            try {
              if (id_user) {
                await changeBiro(values.biro, id_user);
              }
              router.refresh();
              setOpenFormBiro(false);
              if (openNotification) {
                openNotification("success", "Successfully change biro");
              }
            } catch (e) {
              if (openNotification) {
                openNotification("error", "Failed to change biro");
              }
            }
          }}
        >
          <Item
            label="Biro"
            name="biro"
            rules={[{ required: true, message: "Please fill out this field" }]}
          >
            <Select
              defaultValue={userData.id_biro}
              showSearch
              optionFilterProp="nama"
              placeholder="Biro"
              fieldNames={{ label: "nama", value: "id_biro" }}
              options={biro}
            />
          </Item>
        </Form>
      </Modal>
    </>
  );
}
