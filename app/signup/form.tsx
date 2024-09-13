"use client";

import {
  Button,
  Col,
  Input,
  Layout,
  Row,
  Space,
  Typography,
  Form,
  Select,
} from "antd";
const { Content } = Layout;
const { Text } = Typography;
const { Password } = Input;

import {
  LockOutlined,
  LoginOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ActionResult } from "@/interface";
import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from "@fortawesome/free-regular-svg-icons";
import { faAt, faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { checkUsername, signup } from "../actions";
import { useRouter } from "next/navigation";

const { Item } = Form;
export function SignUpForm({ biro }: { biro: any[] }) {
  const [pesan, setPesan] = useState("");

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const res = await signup(values);
      if (res.error) {
        setPesan(res.error);
        setLoading(false);
      } else {
        setPesan("");
        setLoading(false);
        window.location.reload();
      }
    } catch (e) {
      setPesan("Terjadi kesalahan dalam basis data");
      setLoading(false);
    }
  };

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <Form layout="vertical" onFinish={onFinish} form={form}>
      <Row align="middle" style={{ height: "70vh" }}>
        <Row align="top" style={{ height: "40vh", width: "100vw" }} gutter={10}>
          <Col span={6} style={{ textAlign: "right" }}>
            <Button
              type="text"
              style={{ fontSize: "1.5em" }}
              icon={
                <FontAwesomeIcon
                  icon={faLeftLong}
                  style={{ color: "#1677ff" }}
                />
              }
              onClick={() => router.push("/signin")}
            />
          </Col>
          <Col span={6}>
            <Item
              label="Username"
              name="username"
              validateDebounce={1000}
              hasFeedback
              validateFirst={true}
              rules={[
                { required: true, message: "Please fill out this field" },
                {
                  min: 5,
                  message: "Too short! Please enter at least 5 characters",
                },
                {
                  async validator(rule, value, callback) {
                    let res;
                    try {
                      res = await checkUsername(value);
                    } catch (e) {
                      return Promise.reject("Terjadi kesalahan pada database");
                    }

                    if (res[0].exists == false) {
                      return Promise.resolve();
                    } else if (res[0].exists == true) {
                      return Promise.reject("This username is already taken");
                    }
                  },
                },
                {
                  max: 20,
                  message: "Too long! Please limit your input to 20 characters",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                maxLength={20}
                autoFocus={true}
                placeholder="Username"
              />
            </Item>
            <Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please fill out this field" },
                {
                  min: 5,
                  message: "Too short! Please enter at least 5 characters",
                },
                {
                  max: 10,
                  message: "Too long! Please limit your input to 10 characters",
                },
              ]}
            >
              <Password
                prefix={<LockOutlined />}
                maxLength={10}
                placeholder="Password"
              />
            </Item>
            <Item
              label="Repeat Password"
              name="retype_password"
              rules={[
                { required: true, message: "Please fill out this field" },
                {
                  validator(rule, value, callback) {
                    if (value == form.getFieldValue("password")) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject(
                        new Error(
                          "Passwords must match. Please retype your password"
                        )
                      );
                    }
                  },
                },
              ]}
            >
              <Password
                prefix={<LockOutlined />}
                maxLength={10}
                placeholder="Password"
              />
            </Item>
            <Item
              label="Name"
              name="nama"
              rules={[
                { required: true, message: "Please fill out this field" },
                {
                  min: 1,
                  message: "Too short! Please enter at least 1 characters",
                },
                {
                  max: 50,
                  message: "Too long! Please limit your input to 50 characters",
                },
              ]}
            >
              <Input
                prefix={<FontAwesomeIcon icon={faAddressCard} />}
                maxLength={50}
                placeholder="Name"
              />
            </Item>
          </Col>

          <Col span={6}>
            <Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please fill out this field" },
                {
                  min: 1,
                  message: "Too short! Please enter at least 1 characters",
                },
                {
                  max: 320,
                  message: "Too long! Please limit your input to 50 characters",
                },
              ]}
            >
              <Input
                prefix={<FontAwesomeIcon icon={faAt} />}
                maxLength={320}
                placeholder="Email"
              />
            </Item>
            <Item
              label="Biro"
              name="biro"
              rules={[
                { required: true, message: "Please fill out this field" },
              ]}
            >
              <Select
                showSearch
                optionFilterProp="nama"
                placeholder="Biro"
                fieldNames={{ label: "nama", value: "id_biro" }}
                options={biro}
              />
            </Item>
            <Item
              label="Role"
              name="role"
              rules={[
                { required: true, message: "Please fill out this field" },
              ]}
            >
              <Select
                showSearch
                placeholder="Role"
                options={[
                  { label: "BIRO", value: "BIRO" },
                  { label: "ADMIN", value: "ADMIN" },
                  { label: "TIM NASIONAL", value: "TIM NASIONAL" },
                ]}
              />
            </Item>
          </Col>
        </Row>
      </Row>
      <Row align="top">
        <Col span={12} offset={6}>
          <Button
            htmlType="submit"
            type="primary"
            icon={<UserAddOutlined />}
            block={true}
            loading={loading}
          >
            Sign Up
          </Button>
          <Text type="danger">{pesan}</Text>
        </Col>
      </Row>
    </Form>
  );
}
