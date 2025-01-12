"use client";

import {
  Input,
  Button,
  Typography,
  Checkbox,
  FloatButton,
  Row,
  Col,
  FormListFieldData,
  Divider,
  Spin,
  Tooltip,
  Alert,
} from "antd";

import { Form, Select } from "antd";
import { Fragment, ReactNode, useContext, useEffect, useState } from "react";
import {
  LoadingOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { Authors, BebrasTask, imagePath, ValuesFormAddTask } from "@/interface";

import JoditEditor from "./JoditEditor";

import { addTask, updateTask } from "../actions";
import { MyContext } from "./ProLayoutComp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAsterisk } from "@fortawesome/free-solid-svg-icons";

const { Item, List } = Form;
// const { Title, Paragraph } = Typography;
export default function FormAddTask({
  categories,
  age,
  anggota,
  id_user,
  chosenAge,
  chosenCategories,
  chosenAuthors,
  editedValue,
  id_soal_usulan,
  chosenImage,
  roleUser,
  biro,
  non_registered_author,
}: {
  biro: any[];
  categories: any[];
  age: any[];
  anggota: any[];
  id_user: number;
  id_soal_usulan?: string;
  chosenAge?: any[];
  chosenCategories?: any[];
  editedValue?: BebrasTask;
  chosenAuthors?: Authors[];
  chosenImage?: imagePath[];
  roleUser?: string;
  non_registered_author?: any[];
}) {
  const [form] = Form.useForm();

  const openNotification = useContext(MyContext);

  const optionAnswerType = [
    { label: "Multiple-Choice", value: "Multiple-Choice" },
    {
      label: "Multiple-Choice with Images",
      value: "Multiple-Choice with Images",
    },
    { label: "Multiple-Select", value: "Multiple-Select" },
    {
      label: "Multiple-Select with Images",
      value: "Multiple-Select with Images",
    },
    {
      label: "Dropdown-Select",
      value: "Dropdown-Select",
    },
    {
      label: "Open Integer",
      value: "Open Integer",
    },
    {
      label: "Open Text",
      value: "Open Text",
    },
    {
      label: "Interactive (Click-On-Object)",
      value: "Interactive (Click-On-Object)",
    },
    {
      label: "Interactive (Drag & Drop)",
      value: "Interactive (Drag & Drop)",
    },
    {
      label: "Interactive (Other)",
      value: "Interactive (Other)",
    },
    {
      label: "Other",
      value: "Other",
    },
  ];
  const role = [
    { label: "author", value: "author" },
    { label: "contributor", value: "contributor" },
    { label: "editor", value: "editor" },
  ];

  const difficulty = [
    { label: "EASY", value: "EASY" },
    {
      label: "MEDIUM",
      value: "MEDIUM",
    },
    {
      label: "HARD",
      value: "HARD",
    },
  ];

  const setField = (nama: string, value: string) => {
    form.setFieldsValue({ [nama]: value });
  };
  const arrImage: imagePath[] = chosenImage == undefined ? [] : chosenImage;

  const addImage = (fileName: string, path: string) => {
    arrImage.push({ fileName: fileName, path: path });
  };

  const onFinish = async (values: ValuesFormAddTask) => {
    setLoading(true);
    try {
      values.imagePaths = arrImage;
      if (roleUser) {
        await addTask(values, id_user, roleUser);
      }
      if (roleUser == "BIRO") {
        window.location.href = "/biro/bebras_task/pengajuan?p=1";
      } else if (roleUser == "TIM NASIONAL") {
        window.location.href = "/tim_nasional/bebras_task/pengajuan?p=1";
      }
    } catch (err) {
      if (err instanceof Error) {
        if (openNotification) {
          openNotification("error", err.message);
        }
        setLoading(false);
      }
    }
  };
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(false);
  }, [chosenAge]);
  const onFinishUpdate = async (value: ValuesFormAddTask) => {
    setLoading(true);
    try {
      value.imagePaths = arrImage;
      await updateTask(value, id_user, id_soal_usulan);
      router.refresh();
      if (openNotification) {
        openNotification("success", "Successfully updated the question bank");
      }
    } catch (err) {
      if (openNotification) {
        openNotification("error", "Failed to Add Task");
      }
      setLoading(false);
    }
  };

  return (
    <>
      {loading == true ? (
        <Spin indicator={<LoadingOutlined spin />} />
      ) : (
        <>
          <Form
            scrollToFirstError={{ behavior: "smooth" }}
            onFinish={id_soal_usulan == undefined ? onFinish : onFinishUpdate}
            form={form}
            layout="vertical"
          >
            <Row gutter={20}>
              <Col span={12}>
                <Item
                  initialValue={editedValue?.task_title}
                  name="title"
                  label="Title"
                  rules={[
                    { required: true, message: "Please fill this field!" },
                  ]}
                >
                  <Input name="title" />
                </Item>
                <Item label="Age and Difficulty">
                  <List
                    initialValue={
                      chosenAge == undefined
                        ? [{ age: null, diff: null }]
                        : chosenAge
                    }
                    name="age_diff"
                    rules={[
                      {
                        validator: async (_, names) => {
                          if (!names || names.length < 1) {
                            return Promise.reject(
                              new Error("Please fill at least 1 age")
                            );
                          } else {
                            return Promise.resolve();
                          }
                        },
                      },
                    ]}
                  >
                    {(
                      fields: FormListFieldData[],
                      { add, remove },
                      meta: { errors: ReactNode[]; warnings: ReactNode[] }
                    ) => (
                      <>
                        {fields.map(
                          (
                            { key, name, ...restField },
                            index: number,
                            array: FormListFieldData[]
                          ) => {
                            const dependencies = array.map(
                              (value: FormListFieldData, index: number) => [
                                "age_diff",
                                index,
                                "age",
                              ]
                            );
                            dependencies.splice(index, 1);

                            return (
                              <Fragment key={key}>
                                <Row gutter={5}>
                                  <Col span={11}>
                                    <Form.Item
                                      dependencies={dependencies}
                                      {...restField}
                                      name={[name, "age"]}
                                      rules={[
                                        {
                                          required: true,
                                          message: "Please fill this field!",
                                        },
                                        {
                                          validator(rule, value, callback) {
                                            const alreadyChosen =
                                              form.getFieldValue("age_diff");

                                            const alreadyChosenValue = [];

                                            for (
                                              let i = 0;
                                              i < alreadyChosen.length;
                                              i++
                                            ) {
                                              if (alreadyChosen[i]) {
                                                alreadyChosenValue.push(
                                                  alreadyChosen[i].age
                                                );
                                              }
                                            }

                                            if (
                                              alreadyChosenValue.length == 1
                                            ) {
                                              return Promise.resolve();
                                            }

                                            let duplicateIdx = null;
                                            for (
                                              let i = 0;
                                              i < alreadyChosenValue.length;
                                              i++
                                            ) {
                                              if (
                                                alreadyChosenValue[i] ==
                                                  alreadyChosenValue[index] &&
                                                i != index
                                              ) {
                                                duplicateIdx = i;
                                                break;
                                              }
                                            }

                                            if (duplicateIdx != null) {
                                              return Promise.reject(
                                                "Already Chosen"
                                              );
                                            } else {
                                              return Promise.resolve();
                                            }
                                          },
                                        },
                                      ]}
                                    >
                                      <Select
                                        style={{ width: "100%" }}
                                        placeholder="Please select"
                                        options={age}
                                      />
                                    </Form.Item>
                                  </Col>
                                  <Col span={11}>
                                    <Form.Item
                                      {...restField}
                                      name={[name, "diff"]}
                                      rules={[
                                        {
                                          required: true,
                                          message: "Please fill this field!",
                                        },
                                      ]}
                                    >
                                      <Select
                                        style={{ width: "100%" }}
                                        placeholder="Please select"
                                        options={difficulty}
                                      />
                                    </Form.Item>
                                  </Col>
                                  <Col span={2}>
                                    <Button
                                      icon={<MinusCircleOutlined />}
                                      onClick={() => remove(name)}
                                      type="text"
                                    />
                                  </Col>
                                </Row>
                              </Fragment>
                            );
                          }
                        )}
                        <Item>
                          <Button
                            icon={<PlusOutlined />}
                            block
                            onClick={() => {
                              if (fields.length < 6) {
                                add();
                              } else {
                                if (openNotification) {
                                  openNotification(
                                    "error",
                                    "You can't add more than 6 age"
                                  );
                                }
                              }
                            }}
                          >
                            Add Age and Difficulty
                          </Button>
                          <Form.ErrorList errors={meta.errors} />
                        </Item>
                      </>
                    )}
                  </List>
                </Item>
              </Col>

              <Col span={12}>
                <Row gutter={10}>
                  <Col span={12}>
                    <Item
                      initialValue={editedValue?.answer_type}
                      name="answer_type"
                      label="Answer Type"
                      rules={[
                        {
                          required: true,
                          message: "Please choose one answer type",
                        },
                      ]}
                    >
                      <Select
                        showSearch={true}
                        allowClear
                        style={{ width: "100%" }}
                        placeholder="Please select"
                        options={optionAnswerType}
                      />
                    </Item>
                  </Col>
                  <Col span={12}>
                    <Item
                      name="keep_order"
                      valuePropName="checked"
                      initialValue={
                        editedValue == undefined
                          ? false
                          : editedValue.keep_order
                      }
                      label="Keep order of multiple-choice/-select"
                    >
                      <Checkbox />
                    </Item>
                  </Col>
                </Row>
                <Item
                  initialValue={chosenCategories}
                  name="categories"
                  label="Categories"
                  rules={[
                    {
                      required: true,
                      message: "Please choose at least one categories!",
                    },
                  ]}
                >
                  <Select
                    optionFilterProp="nama"
                    mode="multiple"
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Please select"
                    options={categories}
                    fieldNames={{ label: "nama", value: "id_categories" }}
                    labelRender={(props) =>
                      props.label?.toString().substring(0, 8) + "..."
                    }
                  />
                </Item>
              </Col>
            </Row>
            <Divider style={{ borderColor: "#1677ff" }}>
              <FontAwesomeIcon
                icon={faAsterisk}
                fontSize="0.6em"
                style={{
                  verticalAlign: "super",
                  marginRight: "5px",
                }}
                color="#ff4d4f"
              />
              Body
            </Divider>
            <Item
              name="body"
              rules={[
                {
                  validator(rule, value, callback) {
                    if (
                      value == "<p><br></p>" ||
                      value == "" ||
                      value == "<p></p>" ||
                      value == null
                    ) {
                      return Promise.reject(
                        new Error("Please fill this field!")
                      );
                    } else {
                      return Promise.resolve();
                    }
                  },
                },
              ]}
              initialValue={editedValue?.body}
            >
              <JoditEditor
                useID={true}
                value={form.getFieldValue("body")}
                setField={setField}
                nama="body"
                addImage={addImage}
              />
            </Item>
            <Divider style={{ borderColor: "#1677ff" }}>
              <FontAwesomeIcon
                icon={faAsterisk}
                fontSize="0.6em"
                style={{
                  verticalAlign: "super",
                  marginRight: "5px",
                }}
                color="#ff4d4f"
              />
              Question
            </Divider>
            <Item
              initialValue={editedValue?.question}
              name="question"
              rules={[
                {
                  validator(rule, value, callback) {
                    if (
                      value == "<p><br></p>" ||
                      value == "" ||
                      value == "<p></p>" ||
                      value == null
                    ) {
                      return Promise.reject(
                        new Error("Please fill this field!")
                      );
                    } else {
                      return Promise.resolve();
                    }
                  },
                },
              ]}
            >
              <JoditEditor
                useID={true}
                value={form.getFieldValue("question")}
                setField={setField}
                nama="question"
                addImage={addImage}
              />
            </Item>
            <Divider style={{ borderColor: "#1677ff" }}>
              <FontAwesomeIcon
                icon={faAsterisk}
                fontSize="0.6em"
                style={{
                  verticalAlign: "super",
                  marginRight: "5px",
                }}
                color="#ff4d4f"
              />
              Answer Options
            </Divider>
            <Item
              initialValue={editedValue?.answer_options}
              name="answer_options"
              rules={[
                {
                  validator(rule, value, callback) {
                    if (
                      value == "<p><br></p>" ||
                      value == "" ||
                      value == "<p></p>" ||
                      value == null
                    ) {
                      return Promise.reject(
                        new Error("Please fill this field!")
                      );
                    } else {
                      return Promise.resolve();
                    }
                  },
                },
              ]}
            >
              <JoditEditor
                useID={true}
                value={form.getFieldValue("answer_options")}
                setField={setField}
                nama="answer_options"
                addImage={addImage}
              />
            </Item>
            <Divider style={{ borderColor: "#1677ff" }}>
              <FontAwesomeIcon
                icon={faAsterisk}
                fontSize="0.6em"
                style={{
                  verticalAlign: "super",
                  marginRight: "5px",
                }}
                color="#ff4d4f"
              />
              Answer Explanation
            </Divider>
            <Item
              initialValue={editedValue?.answer_explanation}
              name="answer_explanation"
              rules={[
                {
                  validator(rule, value, callback) {
                    if (
                      value == "<p><br></p>" ||
                      value == "" ||
                      value == "<p></p>" ||
                      value == null
                    ) {
                      return Promise.reject(
                        new Error("Please fill this field!")
                      );
                    } else {
                      return Promise.resolve();
                    }
                  },
                },
              ]}
            >
              <JoditEditor
                useID={true}
                value={form.getFieldValue("answer_explanation")}
                setField={setField}
                nama="answer_explanation"
                addImage={addImage}
              />
            </Item>
            <Divider style={{ borderColor: "#1677ff" }}>
              <FontAwesomeIcon
                icon={faAsterisk}
                fontSize="0.6em"
                style={{
                  verticalAlign: "super",
                  marginRight: "5px",
                }}
                color="#ff4d4f"
              />
              This is Informatics
            </Divider>
            <Item
              initialValue={editedValue?.this_is_if}
              name="this_is_if"
              rules={[
                {
                  validator(rule, value, callback) {
                    if (
                      value == "<p><br></p>" ||
                      value == "" ||
                      value == "<p></p>" ||
                      value == null
                    ) {
                      return Promise.reject(
                        new Error("Please fill this field!")
                      );
                    } else {
                      return Promise.resolve();
                    }
                  },
                },
              ]}
            >
              <JoditEditor
                useID={true}
                value={form.getFieldValue("this_is_if")}
                setField={setField}
                nama="this_is_if"
                addImage={addImage}
              />
            </Item>
            <Divider style={{ borderColor: "#1677ff" }}>
              <FontAwesomeIcon
                icon={faAsterisk}
                fontSize="0.6em"
                style={{
                  verticalAlign: "super",
                  marginRight: "5px",
                }}
                color="#ff4d4f"
              />
              This is Computational Thinking
            </Divider>
            <Item
              initialValue={editedValue?.this_is_ct}
              name="this_is_ct"
              rules={[
                {
                  validator(rule, value, callback) {
                    if (
                      value == "<p><br></p>" ||
                      value == "" ||
                      value == "<p></p>" ||
                      value == null
                    ) {
                      return Promise.reject(
                        new Error("Please fill this field!")
                      );
                    } else {
                      return Promise.resolve();
                    }
                  },
                },
              ]}
            >
              <JoditEditor
                useID={true}
                value={form.getFieldValue("this_is_ct")}
                setField={setField}
                nama="this_is_ct"
                addImage={addImage}
              />
            </Item>
            <Divider style={{ borderColor: "#1677ff" }}>
              <FontAwesomeIcon
                icon={faAsterisk}
                fontSize="0.6em"
                style={{
                  verticalAlign: "super",
                  marginRight: "5px",
                }}
                color="#ff4d4f"
              />
              Informatics Keywords and Websites
            </Divider>
            <Item
              initialValue={editedValue?.if_keywords}
              name="if_keywords"
              rules={[
                {
                  validator(rule, value, callback) {
                    if (
                      value == "<p><br></p>" ||
                      value == "" ||
                      value == "<p></p>" ||
                      value == null
                    ) {
                      return Promise.reject(
                        new Error("Please fill this field!")
                      );
                    } else {
                      return Promise.resolve();
                    }
                  },
                },
              ]}
            >
              <JoditEditor
                useID={true}
                value={form.getFieldValue("if_keywords")}
                setField={setField}
                nama="if_keywords"
                useImage={false}
              />
            </Item>
            <Divider style={{ borderColor: "#1677ff" }}>
              <FontAwesomeIcon
                icon={faAsterisk}
                fontSize="0.6em"
                style={{
                  verticalAlign: "super",
                  marginRight: "5px",
                }}
                color="#ff4d4f"
              />
              Computational Thinking Keywords and Websites
            </Divider>
            <Item
              initialValue={editedValue?.ct_keywords}
              name="ct_keywords"
              rules={[
                {
                  validator(rule, value, callback) {
                    if (
                      value == "<p><br></p>" ||
                      value == "" ||
                      value == "<p></p>" ||
                      value == null
                    ) {
                      return Promise.reject(
                        new Error("Please fill this field!")
                      );
                    } else {
                      return Promise.resolve();
                    }
                  },
                },
              ]}
            >
              <JoditEditor
                useID={true}
                value={form.getFieldValue("ct_keywords")}
                setField={setField}
                nama="ct_keywords"
                useImage={false}
              />
            </Item>
            <Divider style={{ borderColor: "#1677ff" }}>
              Wording and Phrases
            </Divider>
            <Item
              initialValue={editedValue?.wording_phrases}
              name="wording_phrases"
            >
              <JoditEditor
                value={form.getFieldValue("wording_phrases")}
                setField={setField}
                nama="wording_phrases"
                useImage={false}
              />
            </Item>
            <Divider style={{ borderColor: "#1677ff" }}>Comments</Divider>
            <Item name="comments" initialValue={editedValue?.comments}>
              <JoditEditor
                value={form.getFieldValue("comments")}
                setField={setField}
                nama="comments"
                useImage={false}
              />
            </Item>
            <Divider style={{ borderColor: "#1677ff" }}>Graphics</Divider>
            <Item initialValue={editedValue?.graphics} name="graphics">
              <JoditEditor
                value={form.getFieldValue("graphics")}
                setField={setField}
                nama="graphics"
                useImage={false}
              />
            </Item>
            <Divider style={{ borderColor: "#1677ff" }}>
              <FontAwesomeIcon
                icon={faAsterisk}
                fontSize="0.6em"
                style={{
                  verticalAlign: "super",
                  marginRight: "5px",
                }}
                color="#ff4d4f"
              />
              Authors
            </Divider>
            <Item>
              <List
                initialValue={
                  chosenAuthors == undefined
                    ? [{ authors: null, peran: null }]
                    : chosenAuthors
                }
                name="authors_peran"
                // rules={[
                //   {
                //     validator: async (_, names) => {
                //       if (!names || names.length < 1) {
                //         return Promise.reject(
                //           new Error("Please fill at least 1 authors")
                //         );
                //       } else {
                //         return Promise.resolve();
                //       }
                //     },
                //   },
                // ]}
              >
                {(
                  fields: FormListFieldData[],
                  { add, remove },
                  meta: { errors: ReactNode[]; warnings: ReactNode[] }
                ) => (
                  <>
                    {fields.map(
                      (
                        { key, name, ...restField },
                        index: number,
                        array: FormListFieldData[]
                      ) => {
                        const dependencies = array.map(
                          (value: FormListFieldData, index: number) => [
                            "authors_peran",
                            index,
                            "authors",
                          ]
                        );

                        dependencies.splice(index, 1);

                        return (
                          <Fragment key={key}>
                            <Row gutter={5}>
                              <Col span={12}>
                                <Item
                                  dependencies={dependencies}
                                  {...restField}
                                  name={[name, "authors"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please fill this field!",
                                    },
                                    {
                                      validator(rule, value, callback) {
                                        const alreadyChosen =
                                          form.getFieldValue("authors_peran");

                                        const alreadyChosenValue = [];

                                        for (
                                          let i = 0;
                                          i < alreadyChosen.length;
                                          i++
                                        ) {
                                          if (alreadyChosen[i]) {
                                            alreadyChosenValue.push(
                                              alreadyChosen[i].authors
                                            );
                                          }
                                        }

                                        if (alreadyChosenValue.length == 1) {
                                          return Promise.resolve();
                                        }

                                        let duplicateIdx = null;
                                        for (
                                          let i = 0;
                                          i < alreadyChosenValue.length;
                                          i++
                                        ) {
                                          if (
                                            alreadyChosenValue[i] ==
                                              alreadyChosenValue[index] &&
                                            i != index
                                          ) {
                                            duplicateIdx = i;
                                            break;
                                          }
                                        }

                                        if (duplicateIdx != null) {
                                          return Promise.reject(
                                            "Already Chosen"
                                          );
                                        } else {
                                          return Promise.resolve();
                                        }
                                      },
                                    },
                                  ]}
                                >
                                  <Select
                                    style={{ width: "100%" }}
                                    placeholder="Please select"
                                    options={anggota}
                                  />
                                </Item>
                              </Col>
                              <Col span={11}>
                                <Form.Item
                                  {...restField}
                                  name={[name, "peran"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please fill this field!",
                                    },
                                  ]}
                                >
                                  <Select
                                    style={{ width: "100%" }}
                                    placeholder="Please select"
                                    options={role}
                                  />
                                </Form.Item>
                              </Col>
                              <Col span={1}>
                                <Button
                                  icon={<MinusCircleOutlined />}
                                  onClick={() => remove(name)}
                                  type="text"
                                />
                              </Col>
                            </Row>
                          </Fragment>
                        );
                      }
                    )}
                    <Item>
                      <Button
                        icon={<PlusOutlined />}
                        block
                        onClick={() => {
                          add();
                        }}
                      >
                        Add Authors
                      </Button>
                      <Form.ErrorList errors={meta.errors} />
                    </Item>
                  </>
                )}
              </List>
            </Item>
            <Item>
              <Alert
                message="Info"
                description="If the author is not exist on the dropdown above, add the author below!"
                type="info"
                showIcon
              />
            </Item>
            <Item>
              <List
                initialValue={
                  non_registered_author == undefined
                    ? []
                    : non_registered_author
                }
                name="non_registered_authors_peran"
                rules={[
                  {
                    validator: async (_, names) => {
                      if (
                        form.getFieldValue("authors_peran").length == 0 &&
                        form.getFieldValue("non_registered_authors_peran")
                          .length == 0
                      ) {
                        return Promise.reject(
                          new Error("Please fill at least 1 authors")
                        );
                      } else {
                        return Promise.resolve();
                      }
                    },
                  },
                ]}
              >
                {(
                  fields: FormListFieldData[],
                  { add, remove },
                  meta: { errors: ReactNode[]; warnings: ReactNode[] }
                ) => (
                  <>
                    {fields.map(
                      (
                        { key, name, ...restField },
                        index: number,
                        array: FormListFieldData[]
                      ) => {
                        return (
                          <Fragment key={key}>
                            <Row gutter={5}>
                              <Col span={6}>
                                <Item
                                  // dependencies={dependencies}
                                  {...restField}
                                  name={[name, "authors"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please fill this field!",
                                    },
                                  ]}
                                >
                                  <Input placeholder="Name" />
                                </Item>
                              </Col>
                              <Col span={6}>
                                <Item
                                  name={[name, "email"]}
                                  {...restField}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please fill this field!",
                                    },
                                  ]}
                                >
                                  <Input placeholder="Email" />
                                </Item>
                              </Col>
                              <Col span={3}>
                                <Form.Item
                                  {...restField}
                                  name={[name, "peran"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please fill this field!",
                                    },
                                  ]}
                                >
                                  <Select
                                    style={{ width: "100%" }}
                                    placeholder="Role"
                                    options={role}
                                  />
                                </Form.Item>
                              </Col>
                              <Col span={8}>
                                <Item
                                  name={[name, "biro"]}
                                  {...restField}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please fill this field!",
                                    },
                                  ]}
                                >
                                  <Select
                                    style={{ width: "100%" }}
                                    placeholder="Biro"
                                    options={biro}
                                    fieldNames={{
                                      label: "nama",
                                      value: "id_biro",
                                    }}
                                  />
                                </Item>
                              </Col>
                              <Col span={1}>
                                <Button
                                  icon={<MinusCircleOutlined />}
                                  onClick={() => remove(name)}
                                  type="text"
                                />
                              </Col>
                            </Row>
                          </Fragment>
                        );
                      }
                    )}
                    <Item>
                      <Button
                        icon={<PlusOutlined />}
                        block
                        onClick={() => {
                          add();
                        }}
                      >
                        Add Unregistered Authors
                      </Button>
                      <Form.ErrorList errors={meta.errors} />
                    </Item>
                  </>
                )}
              </List>
            </Item>
            <Tooltip title="Submit">
              <FloatButton
                onClick={() => form.submit()}
                type="primary"
                icon={<SendOutlined />}
                style={
                  editedValue != undefined ? { insetInlineEnd: 124 } : undefined
                }
              />
            </Tooltip>
          </Form>
        </>
      )}
    </>
  );
}
