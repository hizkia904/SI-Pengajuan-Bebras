"use client";
import { EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Spin, Table } from "antd";
import { useContext, useState } from "react";
import { addNegara, checkKodeNegara, updateNegara } from "../actions";
import { useRouter } from "next/navigation";
import { MyContext } from "./ProLayoutComp";

const { Item } = Form;
export default function TableNegara({ dataSource }: { dataSource: any[] }) {
  const openNotification = useContext(MyContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [kode_negara, setKodeNegara] = useState<string | null>(null);
  const [initialValue, setInitialValue] = useState<string | undefined>(
    undefined
  );
  const [formAdd] = Form.useForm();
  const [formUpdate] = Form.useForm();
  const showUpdateModal = (kode_negara: string, initialValue: string) => {
    setKodeNegara(kode_negara);
    setInitialValue(initialValue);
    setUpdateModalOpen(true);
  };

  const hideUpdateModal = () => {
    setUpdateModalOpen(false);
    formUpdate.resetFields();
  };

  const showAddModal = () => {
    setAddModalOpen(true);
  };

  const hideAddModal = () => {
    setAddModalOpen(false);
    formAdd.resetFields();
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          showAddModal();
        }}
        // icon={<PlusOutlined />}
        style={{ marginBottom: "10px" }}
      >
        Add Country
      </Button>

      <Table
        pagination={false}
        dataSource={dataSource}
        columns={[
          {
            align: "center",
            key: 1,
            title: "No",
            render(value, record, index) {
              return index + 1;
            },
          },
          {
            align: "center",
            key: 2,
            title: "Nama",
            dataIndex: "nama",
          },
          {
            align: "center",
            key: 3,
            title: "Kode Negara",
            dataIndex: "kode_negara",
          },
          {
            align: "center",
            key: 4,
            title: "Action",
            render(value, record, index) {
              return (
                <Button
                  onClick={() => {
                    showUpdateModal(record.kode_negara, record.nama);
                  }}
                  icon={<EditOutlined />}
                  type="dashed"
                >
                  Edit
                </Button>
              );
            },
          },
        ]}
      />

      <Modal
        title={"Add Country"}
        open={addModalOpen}
        onOk={() => formAdd.submit()}
        onCancel={hideAddModal}
        destroyOnClose={true}
      >
        {loading != true ? (
          <Form
            layout="vertical"
            form={formAdd}
            onFinish={async (values: any) => {
              setLoading(true);
              try {
                await addNegara(values.kode_negara, values.negara);
                router.refresh();
                hideAddModal();
                setLoading(false);
                if (openNotification) {
                  openNotification("success", "Successfully add new country");
                }
              } catch (e) {
                setLoading(false);
                if (openNotification) {
                  openNotification("error", "Failed to add new country");
                }
              }
            }}
          >
            <Item
              validateDebounce={1000}
              hasFeedback
              validateFirst={true}
              name="kode_negara"
              label="Country Code"
              rules={[
                { required: true, message: "Please fill this field!" },
                {
                  async validator(rule, value, callback) {
                    let res;
                    try {
                      res = await checkKodeNegara(value);
                    } catch (e) {
                      return Promise.reject("Terjadi kesalahan pada database");
                    }

                    if (res[0].exists == false) {
                      return Promise.resolve();
                    } else if (res[0].exists == true) {
                      return Promise.reject("The code is already taken");
                    }
                  },
                },
                {
                  max: 5,
                  message: "Too long! Please enter maximum 5 characters",
                },
              ]}
            >
              <Input />
            </Item>
            <Item
              label="Name"
              name="negara"
              rules={[
                { required: true, message: "Please fill this field!" },
                {
                  max: 100,
                  message: "Too long! Please enter maximum 100 characters",
                },
              ]}
            >
              <Input />
            </Item>
          </Form>
        ) : (
          <Spin indicator={<LoadingOutlined spin />} />
        )}
      </Modal>
      <Modal
        title="Update Country"
        open={updateModalOpen}
        onOk={() => formUpdate.submit()}
        onCancel={hideUpdateModal}
        destroyOnClose={true}
      >
        {loading != true ? (
          <Form
            form={formUpdate}
            onFinish={async (values: any) => {
              setLoading(true);
              try {
                if (kode_negara) {
                  await updateNegara(kode_negara, values.negara);
                }
                router.refresh();
                hideUpdateModal();
                setLoading(false);
                if (openNotification) {
                  openNotification("success", "Successfully update country");
                }
              } catch (e) {
                setLoading(false);
                if (openNotification) {
                  openNotification("error", "Failed to update country");
                }
              }
            }}
          >
            <Item
              name="negara"
              rules={[
                { required: true, message: "Please fill this field!" },
                {
                  max: 100,
                  message: "Too long! Please enter maximum 100 characters",
                },
              ]}
              initialValue={initialValue}
            >
              <Input />
            </Item>
          </Form>
        ) : (
          <Spin indicator={<LoadingOutlined spin />} />
        )}
      </Modal>
    </>
  );
}
