"use client";
import { EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Modal, Spin, Table } from "antd";
import { useContext, useState } from "react";
import { addUsia, updateUsia } from "../actions";
import { useRouter } from "next/navigation";
import { MyContext } from "./ProLayoutComp";

const { Item } = Form;
export default function TableUsia({ dataSource }: { dataSource: any[] }) {
  const openNotification = useContext(MyContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [id_usia, setIdUsia] = useState<number | null>(null);
  const [initialValue, setInitialValue] = useState<
    { from_age: number; to_age: number } | undefined
  >(undefined);
  const [formAdd] = Form.useForm();
  const [formUpdate] = Form.useForm();
  const showUpdateModal = (
    id_usia: number,
    from_age: number,
    to_age: number
  ) => {
    setIdUsia(id_usia);
    setInitialValue({ from_age: from_age, to_age: to_age });
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
        Add Age
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
            title: "Range Age",
            render(value, record, index) {
              return `${record.from_age} - ${record.to_age}`;
            },
          },
          {
            align: "center",
            key: 4,
            title: "Action",
            render(value, record, index) {
              return (
                <Button
                  onClick={() => {
                    showUpdateModal(
                      record.id_usia,
                      record.from_age,
                      record.to_age
                    );
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
        title={"Add Age"}
        open={addModalOpen}
        onOk={() => formAdd.submit()}
        onCancel={hideAddModal}
        destroyOnClose={true}
      >
        {loading != true ? (
          <Form
            layout="inline"
            form={formAdd}
            onFinish={async (values: any) => {
              setLoading(true);
              try {
                await addUsia(values.from_age, values.to_age);
                router.refresh();
                hideAddModal();
                setLoading(false);
                if (openNotification) {
                  openNotification("success", "Successfully add new age");
                }
              } catch (e) {
                setLoading(false);
                if (openNotification) {
                  openNotification("error", "Failed to add new age");
                }
              }
            }}
          >
            <Item
              name="from_age"
              label="From Age"
              rules={[{ required: true, message: "Please fill this field!" }]}
            >
              <InputNumber min={1} />
            </Item>
            <Item
              name="to_age"
              label="To Age"
              rules={[{ required: true, message: "Please fill this field!" }]}
            >
              <InputNumber min={1} />
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
            layout="inline"
            form={formUpdate}
            onFinish={async (values: any) => {
              setLoading(true);
              try {
                if (id_usia) {
                  await updateUsia(id_usia, values.from_age, values.to_age);
                }
                router.refresh();
                hideUpdateModal();
                setLoading(false);
                if (openNotification) {
                  openNotification("success", "Successfully update age");
                }
              } catch (e) {
                setLoading(false);
                if (openNotification) {
                  openNotification("error", "Failed to update age");
                }
              }
            }}
          >
            <Item
              name="from_age"
              label="From Age"
              rules={[{ required: true, message: "Please fill this field!" }]}
              initialValue={initialValue?.from_age}
            >
              <InputNumber min={1} />
            </Item>
            <Item
              name="to_age"
              label="To Age"
              rules={[{ required: true, message: "Please fill this field!" }]}
              initialValue={initialValue?.to_age}
            >
              <InputNumber min={1} />
            </Item>
          </Form>
        ) : (
          <Spin indicator={<LoadingOutlined spin />} />
        )}
      </Modal>
    </>
  );
}
