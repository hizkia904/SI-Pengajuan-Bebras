"use client";

import { Button, Col, Form, Input, Row, Space, Typography } from "antd";
import Image from "next/image";
import { login } from "../actions";
import { useState } from "react";
import { LockOutlined, LoginOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
const { Item } = Form;
const { Password } = Input;
const { Text } = Typography;
export default function Page() {
  const [pesan, setPesan] = useState("");
  const [loading, setLoading] = useState(false);
  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const res = await login(values);
      if (res.error) {
        setPesan(res.error);
        setLoading(false);
      } else {
        setPesan("");
        setLoading(false);
        window.location.reload();
      }
    } catch (e) {
      setPesan("Terjadi kesalahan dalam database");
    }
  };
  return (
    <>
      <Row align="middle" style={{ height: "100vh" }}>
        <Col span={4} offset={8}>
          <Image
            src="/mascot_bebras_indo.png"
            width="191"
            height="240"
            alt="mascot bebras indonesia"
          />
        </Col>
        <Col span={4}>
          <Form layout="vertical" onFinish={onFinish}>
            <Item
              // label="Username"
              name="username"
              rules={[
                { required: true, message: "Please fill out this field" },
                {
                  min: 5,
                  message: "Too short! Please enter at least 5 characters",
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
              // label="Password"

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
            <Button
              htmlType="submit"
              type="primary"
              icon={<LoginOutlined />}
              block={true}
              loading={loading}
            >
              LOG IN
            </Button>
          </Form>
          <Space direction="vertical">
            <Text type="danger">{pesan}</Text>
            <Link href="/signup">Don't have account ?</Link>
          </Space>
        </Col>
      </Row>
    </>
  );
}
