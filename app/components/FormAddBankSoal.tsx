"use client";

import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  FloatButton,
  Form,
  FormListFieldData,
  Input,
  Rate,
  Row,
  Select,
  Spin,
  Tabs,
  Typography,
} from "antd";

import JoditEditor from "./JoditEditor";

import { ReactNode, Fragment, useContext, useState, useEffect } from "react";
import {
  LoadingOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { MyContext } from "./ProLayoutComp";
import { addBankSoal, checkKodeSoal, updateBankSoal } from "../actions";
import dayjs from "dayjs";
import { BankSoalGeneralInfo, imagePath, KontenSoal } from "@/interface";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAsterisk } from "@fortawesome/free-solid-svg-icons";

const { Item, List } = Form;
const { YearPicker } = DatePicker;
const { Text, Title } = Typography;

export default function FormAddBankSoal({
  categories,
  age,
  negara,
  id_bank_soal,
  infoSoal,
  versi_indonesia,
  versi_inggris,
  chosenCategories,
  chosenAge,
  chosenImage,
}: {
  categories: any[];
  age: any[];
  negara: any[];
  id_bank_soal?: string;
  infoSoal?: BankSoalGeneralInfo;
  versi_indonesia?: KontenSoal;
  versi_inggris?: KontenSoal;
  chosenCategories?: any[];
  chosenAge?: any[];
  chosenImage?: imagePath[];
}) {
  const optionAnswerType = [
    { label: "Multiple-Choice", value: "Multiple-Choice" },
    {
      label: "Multiple-Choice with Images",
      value: "Multiple-Choice with Images",
    },
    {
      label: "Open Integer",
      value: "Open Integer",
    },
    {
      label: "Open Text",
      value: "Open Text",
    },
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("refresh");
    setLoading(false);
  }, [chosenAge]);

  // const arrImage: imagePath[] = chosenImage == undefined ? [] : chosenImage;
  const [arrImage, setImagePath] = useState<imagePath[]>(
    chosenImage == undefined ? [] : chosenImage
  );

  const addImage = (fileName: string, path: string) => {
    arrImage.push({ fileName: fileName, path: path });
    setImagePath(arrImage);
    // arrImage.push({ fileName: fileName, path: path });
  };
  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const copy_values = { ...values };
      copy_values.tahun = copy_values.tahun.year();
      copy_values.imagePaths = arrImage;
      await addBankSoal(copy_values);
      setLoading(false);
      // window.location.href = "/tim_nasional/bank_soal";
    } catch (e) {
      if (openNotification) {
        openNotification("error", "Failed to add question bank");
      }
      setLoading(false);
    }
  };

  const router = useRouter();

  const onFinishUpdate = async (values: any) => {
    setLoading(true);
    try {
      const copy_values = { ...values };
      copy_values.tahun = copy_values.tahun.year();
      copy_values.imagePaths = arrImage;
      await updateBankSoal(copy_values, id_bank_soal);

      router.refresh();
      if (openNotification) {
        openNotification("success", "Successfully updated the question bank");
      }
      // window.location.href = "/tim_nasional/bank_soal";
    } catch (e) {
      if (openNotification) {
        openNotification("error", "Failed to update question bank");
      }
      setLoading(false);
    }
  };

  const [form] = Form.useForm();
  const setField = (nama: string, value: string) => {
    form.setFieldsValue({ [nama]: value });
  };

  const openNotification = useContext(MyContext);

  console.log(chosenCategories);

  const [task_title, set_task_title] = useState("ID");
  const [body, setBody] = useState("ID");
  const [question, setQuestion] = useState("ID");
  const [answer_options, setAnswerOptions] = useState("ID");
  const [answer_explanation, setAnswerExplanation] = useState("ID");
  const [this_is_if, setthisIsIf] = useState("ID");
  const [this_is_ct, setthisIsCt] = useState("ID");
  const [if_keywords, setIfKeywords] = useState("ID");
  const [ct_keywords, setCtKeywords] = useState("ID");
  const [wording_phrases, setWordingPhrases] = useState("ID");

  const [form2] = Form.useForm();
  return (
    <>
      {loading == true ? (
        <Spin indicator={<LoadingOutlined spin />} />
      ) : (
        <>
          <Form
            onFinishFailed={(errorInfo) => {
              const firstErrorField =
                errorInfo.errorFields[0].name[0].toString();
              const end_with_id = firstErrorField.endsWith("id");
              const end_with_en = firstErrorField.endsWith("en");

              if (end_with_id == true || end_with_en == true) {
                let bagian: string = "";
                if (firstErrorField.startsWith("task_title")) {
                  if (end_with_id == true) {
                    set_task_title("ID");
                  } else {
                    set_task_title("EN");
                  }
                  bagian = "task_title";
                } else if (firstErrorField.startsWith("body")) {
                  if (end_with_id == true) {
                    setBody("ID");
                  } else {
                    setBody("EN");
                  }
                  bagian = "body";
                } else if (firstErrorField.startsWith("question")) {
                  if (end_with_id == true) {
                    setQuestion("ID");
                  } else {
                    setQuestion("EN");
                  }
                  bagian = "question";
                } else if (firstErrorField.startsWith("answer_options")) {
                  if (end_with_id == true) {
                    setAnswerOptions("ID");
                  } else {
                    setAnswerOptions("EN");
                  }
                  bagian = "answer_options";
                } else if (firstErrorField.startsWith("answer_explanation")) {
                  if (end_with_id == true) {
                    setAnswerExplanation("ID");
                  } else {
                    setAnswerExplanation("EN");
                  }
                  bagian = "answer_explanation";
                } else if (firstErrorField.startsWith("this_is_if")) {
                  if (end_with_id == true) {
                    setthisIsIf("ID");
                  } else {
                    setthisIsIf("EN");
                  }
                  bagian = "this_is_if";
                } else if (firstErrorField.startsWith("this_is_ct")) {
                  if (end_with_id == true) {
                    setthisIsCt("ID");
                  } else {
                    setthisIsCt("EN");
                  }
                  bagian = "this_is_ct";
                } else if (firstErrorField.startsWith("if_keywords")) {
                  if (end_with_id == true) {
                    setIfKeywords("ID");
                  } else {
                    setIfKeywords("EN");
                  }
                  bagian = "if_keywords";
                } else if (firstErrorField.startsWith("ct_keywords")) {
                  if (end_with_id == true) {
                    setCtKeywords("ID");
                  } else {
                    setCtKeywords("EN");
                  }
                  bagian = "ct_keywords";
                } else if (firstErrorField.startsWith("wording_phrases")) {
                  if (end_with_id == true) {
                    setWordingPhrases("ID");
                  } else {
                    setWordingPhrases("EN");
                  }
                  bagian = "wording_phrases";
                }

                form.scrollToField(bagian, {
                  behavior: "smooth",
                });
              } else {
                form.scrollToField(firstErrorField, {
                  behavior: "smooth",
                });
              }
            }}
            onFinish={id_bank_soal == undefined ? onFinish : onFinishUpdate}
            form={form}
            layout="vertical"
          >
            <Row gutter={20}>
              <Col span={12}>
                <Item
                  initialValue={infoSoal?.kode_soal}
                  validateDebounce={1000}
                  hasFeedback
                  name="kode_soal"
                  label="Kode Soal"
                  validateFirst={true}
                  rules={[
                    { required: true, message: "Please fill this field !" },
                    {
                      async validator(rule, value, callback) {
                        let res;
                        try {
                          if (id_bank_soal) {
                            res = await checkKodeSoal(value, id_bank_soal);
                          } else {
                            res = await checkKodeSoal(value);
                          }
                        } catch (e) {
                          return Promise.reject(
                            "Terjadi kesalahan pada database"
                          );
                        }

                        if (res[0].exists == false) {
                          return Promise.resolve();
                        } else if (res[0].exists == true) {
                          return Promise.reject(
                            "This question code is already taken"
                          );
                        }
                      },
                    },
                    {
                      max: 30,
                      message:
                        "Too long! Please limit your input to 30 characters",
                    },
                  ]}
                >
                  <Input />
                </Item>
                <Item
                  initialValue={
                    infoSoal?.tahun != undefined
                      ? dayjs(new Date(infoSoal?.tahun, 1))
                      : undefined
                  }
                  name="tahun"
                  label="Tahun"
                  rules={[
                    { required: true, message: "Please fill this field !" },
                  ]}
                >
                  {/* <DatePicker picker="year" style={{ width: "100%" }} /> */}
                  <YearPicker />
                </Item>
                <Row gutter={10}>
                  <Col span={10}>
                    <Item
                      initialValue={infoSoal?.answer_type}
                      name="answer_type"
                      label="Answer Type"
                      rules={[
                        { required: true, message: "Please fill this field !" },
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
                  <Col span={14}>
                    <Item
                      label="Keep order of multiple-choice/-select"
                      name="keep_order"
                      valuePropName="checked"
                      initialValue={
                        infoSoal == undefined ? false : infoSoal.keep_order
                      }
                    >
                      <Checkbox></Checkbox>
                    </Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={12}>
                    <Item
                      initialValue={infoSoal?.rating_internasional}
                      name="rating_internasional"
                      label="Rating Internasional"
                      rules={[
                        { required: true, message: "Please fill this field !" },
                      ]}
                    >
                      <Rate count={6} allowClear={false} />
                    </Item>
                    <Item
                      name="best_task"
                      valuePropName="checked"
                      initialValue={
                        infoSoal == undefined ? false : infoSoal.best_task
                      }
                      // label="Is it best task ?"
                    >
                      <Checkbox>Best Task</Checkbox>
                    </Item>
                  </Col>
                  <Col span={12}>
                    <Item
                      initialValue={infoSoal?.rating_internasional}
                      name="rating_nasional"
                      label="Rating Nasional"
                    >
                      <Rate count={6} allowClear={false} />
                    </Item>

                    <Item
                      name="terpilih"
                      valuePropName="checked"
                      initialValue={
                        infoSoal == undefined ? false : infoSoal.terpilih
                      }
                      // label="Terpilih"
                    >
                      <Checkbox>Terpilih</Checkbox>
                    </Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}></Col>
                </Row>
              </Col>
              <Col span={12}>
                <Item
                  initialValue={infoSoal?.negara}
                  name="kode_negara"
                  label="Negara"
                  rules={[
                    { required: true, message: "Please fill this field !" },
                  ]}
                >
                  <Select
                    showSearch
                    optionFilterProp="nama"
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Please select"
                    options={negara}
                    fieldNames={{ label: "nama", value: "kode_negara" }}
                  />
                </Item>
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
                            console.log(dependencies);
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
            </Row>

            {/* ini buat indonesia */}

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
              Task Title
            </Divider>

            <Tabs
              activeKey={task_title}
              onChange={(activeKey: string) => set_task_title(activeKey)}
              id="task_title"
              centered
              items={[
                {
                  forceRender: true,
                  key: "ID",
                  label: "Indonesia",
                  children: (
                    <Item
                      initialValue={versi_indonesia?.task_title}
                      name="task_title_id"
                      rules={[
                        { required: true, message: "Please fill the field!" },
                      ]}
                    >
                      <Input />
                    </Item>
                  ),
                },
                {
                  forceRender: true,
                  key: "EN",
                  label: "Inggris",
                  children: (
                    <Item
                      initialValue={versi_inggris?.task_title}
                      name="task_title_en"
                      rules={[
                        { required: true, message: "Please fill this field!" },
                      ]}
                    >
                      <Input placeholder="Insert your task title in English" />
                    </Item>
                  ),
                },
              ]}
            />

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
            <Tabs
              id="body"
              activeKey={body}
              onChange={(activeKey: string) => setBody(activeKey)}
              centered
              items={[
                {
                  forceRender: true,
                  key: "ID",
                  label: "Indonesia",
                  children: (
                    <Item
                      id="body"
                      initialValue={versi_indonesia?.body}
                      name="body_id"
                      rules={[
                        { required: true, message: "Please fill the field!" },
                      ]}
                    >
                      <JoditEditor
                        value={form.getFieldValue("body_id")}
                        setField={setField}
                        nama="body_id"
                        addImage={addImage}
                      />
                    </Item>
                  ),
                },
                {
                  forceRender: true,
                  key: "EN",
                  label: "Inggris",
                  children: (
                    <Item
                      id="body_en"
                      initialValue={versi_inggris?.body}
                      name="body_en"
                      rules={[
                        { required: true, message: "Please fill this field!" },
                      ]}
                    >
                      <JoditEditor
                        value={form.getFieldValue("body_en")}
                        setField={setField}
                        nama="body_en"
                        addImage={addImage}
                      />
                    </Item>
                  ),
                },
              ]}
            />

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
            <Tabs
              activeKey={question}
              id="question"
              onChange={(activeKey: string) => setQuestion(activeKey)}
              centered
              items={[
                {
                  forceRender: true,
                  key: "ID",
                  label: "Indonesia",
                  children: (
                    <Item
                      initialValue={versi_indonesia?.question}
                      name="question_id"
                      rules={[
                        { required: true, message: "Please fill the field!" },
                      ]}
                    >
                      <JoditEditor
                        value={form.getFieldValue("question_id")}
                        setField={setField}
                        nama="question_id"
                        addImage={addImage}
                      />
                    </Item>
                  ),
                },
                {
                  forceRender: true,
                  key: "EN",
                  label: "Inggris",
                  children: (
                    <Item
                      initialValue={versi_inggris?.question}
                      name="question_en"
                      rules={[
                        { required: true, message: "Please fill this field!" },
                      ]}
                    >
                      <JoditEditor
                        value={form.getFieldValue("question_en")}
                        setField={setField}
                        nama="question_en"
                        addImage={addImage}
                      />
                    </Item>
                  ),
                },
              ]}
            />
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
              Answer Options / Interactivity Description
            </Divider>
            <Tabs
              id="answer_options"
              onChange={(activeKey: string) => setAnswerOptions(activeKey)}
              activeKey={answer_options}
              centered
              items={[
                {
                  forceRender: true,
                  key: "ID",
                  label: "Indonesia",
                  children: (
                    <Item
                      initialValue={versi_indonesia?.answer_options}
                      name="answer_options_id"
                      rules={[
                        { required: true, message: "Please fill the field!" },
                      ]}
                    >
                      <JoditEditor
                        value={form.getFieldValue("answer_options_id")}
                        setField={setField}
                        nama="answer_options_id"
                        addImage={addImage}
                      />
                    </Item>
                  ),
                },
                {
                  forceRender: true,
                  key: "EN",
                  label: "Inggris",
                  children: (
                    <Item
                      initialValue={versi_inggris?.answer_options}
                      name="answer_options_en"
                      rules={[
                        { required: true, message: "Please fill this field!" },
                      ]}
                    >
                      <JoditEditor
                        value={form.getFieldValue("answer_options_en")}
                        setField={setField}
                        nama="answer_options_en"
                        addImage={addImage}
                      />
                    </Item>
                  ),
                },
              ]}
            />

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
            <Tabs
              id="answer_explanation"
              activeKey={answer_explanation}
              onChange={(activeKey: string) => setAnswerExplanation(activeKey)}
              centered
              items={[
                {
                  forceRender: true,
                  key: "ID",
                  label: "Indonesia",
                  children: (
                    <Item
                      initialValue={versi_indonesia?.answer_explanation}
                      name="answer_explanation_id"
                      rules={[
                        { required: true, message: "Please fill the field!" },
                      ]}
                    >
                      <JoditEditor
                        value={form.getFieldValue("answer_explanation_id")}
                        setField={setField}
                        nama="answer_explanation_id"
                        addImage={addImage}
                      />
                    </Item>
                  ),
                },
                {
                  forceRender: true,
                  key: "EN",
                  label: "Inggris",
                  children: (
                    <Item
                      initialValue={versi_inggris?.answer_explanation}
                      name="answer_explanation_en"
                      rules={[
                        { required: true, message: "Please fill this field!" },
                      ]}
                    >
                      <JoditEditor
                        value={form.getFieldValue("answer_explanation_en")}
                        setField={setField}
                        nama="answer_explanation_en"
                        addImage={addImage}
                      />
                    </Item>
                  ),
                },
              ]}
            />

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
            <Tabs
              id="this_is_if"
              activeKey={this_is_if}
              onChange={(activeKey: string) => setthisIsIf(activeKey)}
              centered
              items={[
                {
                  forceRender: true,
                  key: "ID",
                  label: "Indonesia",
                  children: (
                    <Item
                      initialValue={versi_indonesia?.this_is_if}
                      name="this_is_if_id"
                      rules={[
                        { required: true, message: "Please fill the field!" },
                      ]}
                    >
                      <JoditEditor
                        value={form.getFieldValue("this_is_if_id")}
                        setField={setField}
                        nama="this_is_if_id"
                        addImage={addImage}
                      />
                    </Item>
                  ),
                },
                {
                  forceRender: true,
                  key: "EN",
                  label: "Inggris",
                  children: (
                    <Item
                      initialValue={versi_inggris?.this_is_if}
                      name="this_is_if_en"
                      rules={[
                        { required: true, message: "Please fill this field!" },
                      ]}
                    >
                      <JoditEditor
                        value={form.getFieldValue("this_is_if_en")}
                        setField={setField}
                        nama="this_is_if_en"
                        addImage={addImage}
                      />
                    </Item>
                  ),
                },
              ]}
            />

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
            <Tabs
              id="this_is_ct"
              activeKey={this_is_ct}
              onChange={(activeKey: string) => setthisIsCt(activeKey)}
              centered
              items={[
                {
                  forceRender: true,
                  key: "ID",
                  label: "Indonesia",
                  children: (
                    <Item
                      initialValue={versi_indonesia?.this_is_ct}
                      name="this_is_ct_id"
                      rules={[
                        { required: true, message: "Please fill the field!" },
                      ]}
                    >
                      <JoditEditor
                        value={form.getFieldValue("this_is_ct_id")}
                        setField={setField}
                        nama="this_is_ct_id"
                        addImage={addImage}
                      />
                    </Item>
                  ),
                },
                {
                  forceRender: true,
                  key: "EN",
                  label: "Inggris",
                  children: (
                    <Item
                      initialValue={versi_inggris?.this_is_ct}
                      name="this_is_ct_en"
                      rules={[
                        { required: true, message: "Please fill this field!" },
                      ]}
                    >
                      <JoditEditor
                        value={form.getFieldValue("this_is_ct_en")}
                        setField={setField}
                        nama="this_is_ct_en"
                        addImage={addImage}
                      />
                    </Item>
                  ),
                },
              ]}
            />

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
            <Tabs
              id="if_keywords"
              activeKey={if_keywords}
              onChange={(activeKey: string) => setIfKeywords(activeKey)}
              centered
              items={[
                {
                  forceRender: true,
                  key: "ID",
                  label: "Indonesia",
                  children: (
                    <Item
                      initialValue={versi_indonesia?.if_keywords}
                      name="if_keywords_id"
                      rules={[
                        { required: true, message: "Please fill the field!" },
                      ]}
                    >
                      <JoditEditor
                        value={form.getFieldValue("if_keywords_id")}
                        setField={setField}
                        nama="if_keywords_id"
                        addImage={addImage}
                        useImage={false}
                      />
                    </Item>
                  ),
                },
                {
                  forceRender: true,
                  key: "EN",
                  label: "Inggris",
                  children: (
                    <Item
                      initialValue={versi_inggris?.if_keywords}
                      name="if_keywords_en"
                      rules={[
                        { required: true, message: "Please fill this field!" },
                      ]}
                    >
                      <JoditEditor
                        value={form.getFieldValue("if_keywords_en")}
                        setField={setField}
                        nama="if_keywords_en"
                        addImage={addImage}
                        useImage={false}
                      />
                    </Item>
                  ),
                },
              ]}
            />

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
            <Tabs
              id="ct_keywords"
              activeKey={ct_keywords}
              onChange={(activeKey: string) => setCtKeywords(activeKey)}
              centered
              items={[
                {
                  forceRender: true,
                  key: "ID",
                  label: "Indonesia",
                  children: (
                    <Item
                      initialValue={versi_indonesia?.ct_keywords}
                      name="ct_keywords_id"
                      rules={[
                        { required: true, message: "Please fill the field!" },
                      ]}
                    >
                      <JoditEditor
                        value={form.getFieldValue("ct_keywords_id")}
                        setField={setField}
                        nama="ct_keywords_id"
                        addImage={addImage}
                        useImage={false}
                      />
                    </Item>
                  ),
                },
                {
                  forceRender: true,
                  key: "EN",
                  label: "Inggris",
                  children: (
                    <Item
                      initialValue={versi_inggris?.ct_keywords}
                      name="ct_keywords_en"
                      rules={[
                        { required: true, message: "Please fill this field!" },
                      ]}
                    >
                      <JoditEditor
                        value={form.getFieldValue("ct_keywords_en")}
                        setField={setField}
                        nama="ct_keywords_en"
                        addImage={addImage}
                        useImage={false}
                      />
                    </Item>
                  ),
                },
              ]}
            />

            <Divider style={{ borderColor: "#1677ff" }}>
              Wording and Phrases
            </Divider>
            <Tabs
              id="wording_phrases"
              activeKey={wording_phrases}
              onChange={(activeKey: string) => setWordingPhrases(activeKey)}
              centered
              items={[
                {
                  forceRender: true,
                  key: "ID",
                  label: "Indonesia",
                  children: (
                    <Item
                      initialValue={versi_indonesia?.wording_phrases}
                      name="wording_phrases_id"
                    >
                      <JoditEditor
                        value={form.getFieldValue("wording_phrases_id")}
                        setField={setField}
                        nama="wording_phrases_id"
                        useImage={false}
                      />
                    </Item>
                  ),
                },
                {
                  forceRender: true,
                  key: "EN",
                  label: "Inggris",
                  children: (
                    <Item
                      initialValue={versi_inggris?.wording_phrases}
                      name="wording_phrases_en"
                    >
                      <JoditEditor
                        value={form.getFieldValue("wording_phrases_en")}
                        setField={setField}
                        nama="wording_phrases_en"
                        useImage={false}
                      />
                    </Item>
                  ),
                },
              ]}
            />
            <Divider style={{ borderColor: "#1677ff" }}>Comments</Divider>
            <Item name="comments" initialValue={infoSoal?.comments}>
              <JoditEditor
                value={form.getFieldValue("comments")}
                setField={setField}
                nama="comments"
                useImage={false}
              />
            </Item>
            <Divider style={{ borderColor: "#1677ff" }}>Graphics</Divider>
            <Item name="graphics" initialValue={infoSoal?.graphics}>
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
            <Item
              initialValue={infoSoal?.authors}
              name="authors"
              rules={[{ required: true, message: "Please fill this field!" }]}
            >
              <JoditEditor
                useID={true}
                value={form.getFieldValue("authors")}
                setField={setField}
                nama="authors"
                useImage={false}
              />
            </Item>

            <FloatButton
              onClick={() => form.submit()}
              type="primary"
              icon={<SendOutlined />}
            />
          </Form>
          {/* <TinyMCE name="as" setField={setField} /> */}
        </>
      )}
    </>
  );
}
