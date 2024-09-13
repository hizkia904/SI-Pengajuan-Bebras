"use client";
import { EditOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Spin, Table } from "antd";
import { useContext, useState } from "react";
import { addCategories, updateCategories } from "../actions";
import { useRouter } from "next/navigation";
import { MyContext } from "./ProLayoutComp";

const { Item } = Form;
export default function TableCategories({ dataSource }: { dataSource: any[] }) {
  const openNotification = useContext(MyContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [id_categories, setIdCategories] = useState<number | null>(null);
  const [initialValue, setInitialValue] = useState<string | undefined>(
    undefined
  );
  const [formAdd] = Form.useForm();
  const [formUpdate] = Form.useForm();
  const showUpdateModal = (id_categories: number, initialValue: string) => {
    setIdCategories(id_categories);
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
        Add Categories
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
                    showUpdateModal(record.id_categories, record.nama);
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
        title={"Add Categories"}
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
                await addCategories(values.categories);
                router.refresh();
                hideAddModal();
                setLoading(false);
                if (openNotification) {
                  openNotification("success", "Successfully add new category");
                }
              } catch (e) {
                setLoading(false);
                if (openNotification) {
                  openNotification("error", "Failed to add new category");
                }
              }
            }}
          >
            <Item
              name="categories"
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
        title="Update Categories"
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
                if (id_categories) {
                  await updateCategories(id_categories, values.categories);
                }
                router.refresh();
                hideUpdateModal();
                setLoading(false);
                if (openNotification) {
                  openNotification("success", "Successfully update category");
                }
              } catch (e) {
                setLoading(false);
                if (openNotification) {
                  openNotification("error", "Failed to update category");
                }
              }
            }}
          >
            <Item
              name="categories"
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
