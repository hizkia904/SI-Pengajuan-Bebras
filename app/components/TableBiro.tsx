"use client";
import { EditOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Spin, Table } from "antd";
import { useContext, useState } from "react";
import {
  addBiro,
  addCategories,
  updateBiro,
  updateCategories,
} from "../actions";
import { useRouter } from "next/navigation";
import { MyContext } from "./ProLayoutComp";

const { Item } = Form;
export default function TableBiro({ dataSource }: { dataSource: any[] }) {
  const openNotification = useContext(MyContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [id_biro, setIdBiro] = useState<number | null>(null);
  const [initialValue, setInitialValue] = useState<string | undefined>(
    undefined
  );
  const [formAdd] = Form.useForm();
  const [formUpdate] = Form.useForm();
  const showUpdateModal = (id_biro: number, initialValue: string) => {
    setIdBiro(id_biro);
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
        Add Biro
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
            title: "Action",
            render(value, record, index) {
              return (
                <Button
                  onClick={() => {
                    showUpdateModal(record.id_biro, record.nama);
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
        title={"Add Biro"}
        open={addModalOpen}
        onOk={() => formAdd.submit()}
        onCancel={hideAddModal}
        destroyOnClose={true}
      >
        {loading != true ? (
          <Form
            form={formAdd}
            onFinish={async (values: any) => {
              setLoading(true);
              try {
                await addBiro(values.biro);
                router.refresh();
                hideAddModal();
                setLoading(false);
                if (openNotification) {
                  openNotification("success", "Successfully add new Biro");
                }
              } catch (e) {
                setLoading(false);
                if (openNotification) {
                  openNotification("error", "Failed to add new Biro");
                }
              }
            }}
          >
            <Item
              name="biro"
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
        title="Update Biro"
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
                if (id_biro) {
                  await updateBiro(id_biro, values.biro);
                }
                router.refresh();
                hideUpdateModal();
                setLoading(false);
                if (openNotification) {
                  openNotification("success", "Successfully update Biro");
                }
              } catch (e) {
                setLoading(false);
                if (openNotification) {
                  openNotification("error", "Failed to update Biro");
                }
              }
            }}
          >
            <Item
              name="biro"
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
