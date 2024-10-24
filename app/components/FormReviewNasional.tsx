"use client";
import { Divider, FloatButton, Form, Input, Spin, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addReview } from "../actions";
import {
  CloseOutlined,
  EditOutlined,
  LoadingOutlined,
  SendOutlined,
} from "@ant-design/icons";

import { useForm } from "antd/lib/form/Form";
import { MyContext } from "./ProLayoutComp";

const { Item } = Form;
const { TextArea } = Input;
const { Paragraph, Text } = Typography;
const { Group } = FloatButton;
export default function FormReviewNasional({
  id_user,
  id_soal_usulan,
  review,
}: {
  id_user: number | undefined;
  id_soal_usulan: string;
  review: any[];
}) {
  const openNotification = useContext(MyContext);
  const router = useRouter();
  const onFinishReview = async (values: any) => {
    try {
      setLoading(true);
      await addReview(values, false, id_user, id_soal_usulan);
      router.refresh();
      if (openNotification) {
        openNotification("success", "Successfully add review");
      }
    } catch (err) {
      router.refresh();

      if (openNotification) {
        openNotification("error", "Failed to add review");
      }
    }
  };

  const onFinishUpdateReview = async (values: any) => {
    try {
      setLoadingUpdate(true);
      await addReview(values, true, id_user, id_soal_usulan);
      setIsUpdateSuccess(true);
      router.refresh();
      if (openNotification) {
        openNotification("success", "Successfully update review");
      }
    } catch (err) {
      setIsUpdateSuccess(false);
      router.refresh();
      if (openNotification) {
        openNotification("error", "Failed to update review");
      }
    }
  };

  const [openUpdateForm, setOpenForm] = useState(false);

  const [loading, setLoading] = useState(false);

  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

  useEffect(() => {
    if (isUpdateSuccess) {
      setOpenForm(false);
    }
    setLoadingUpdate(false);
    setLoading(false);
  }, [review]);

  const [formUpdate] = useForm();

  const [formAdd] = useForm();

  const resetFormUpdate = () => {
    formUpdate.resetFields();
  };

  return (
    <>
      {review.length == 0 ? (
        loading == false ? (
          <>
            <Form layout="vertical" onFinish={onFinishReview} form={formAdd}>
              <Item name="title" label="Title">
                <TextArea style={{ textAlign: "center" }} />
              </Item>
              <Item name="age" label="Age">
                <TextArea style={{ textAlign: "center" }} />
              </Item>
              <Item name="answer_type" label="Answer Type">
                <TextArea style={{ textAlign: "center" }} />
              </Item>
              <Item
                name="keep_order"
                label="Keep Order of multiple-choice/-select"
              >
                <TextArea style={{ textAlign: "center" }} />
              </Item>
              <Item name="categories" label="Categories">
                <TextArea style={{ textAlign: "center" }} />
              </Item>
              <Item name="body" label="Body">
                <TextArea style={{ textAlign: "center" }} />
              </Item>
              <Item name="question" label="question">
                <TextArea style={{ textAlign: "center" }} />
              </Item>
              <Item name="answer_options" label="Answer Options">
                <TextArea style={{ textAlign: "center" }} />
              </Item>
              <Item name="answer_explanation" label="Answer Explanation">
                <TextArea style={{ textAlign: "center" }} />
              </Item>
              <Item name="this_is_if" label="This is Informatics">
                <TextArea style={{ textAlign: "center" }} />
              </Item>
              <Item name="this_is_ct" label="This is Computational Thinking">
                <TextArea style={{ textAlign: "center" }} />
              </Item>
              <Item
                name="if_keywords"
                label="Informatics Keywords and Websites"
              >
                <TextArea style={{ textAlign: "center" }} />
              </Item>
              <Item
                name="ct_keywords"
                label="Computational Thinking Keywords and Websites"
              >
                <TextArea style={{ textAlign: "center" }} />
              </Item>

              <Item name="wording_phrases" label="Wording and Phrases">
                <TextArea style={{ textAlign: "center" }} />
              </Item>
              <Item name="comments" label="Comments">
                <TextArea style={{ textAlign: "center" }} />
              </Item>
              <Item name="graphics" label="Graphics and Other Files">
                <TextArea style={{ textAlign: "center" }} />
              </Item>
              <Item
                name="authors"
                label="Authors, Contributors, and Editors (incl. Graphics)"
              >
                <TextArea style={{ textAlign: "center" }} />
              </Item>
            </Form>
            <FloatButton
              onClick={() => formAdd.submit()}
              type="primary"
              icon={<SendOutlined />}
            />
          </>
        ) : (
          <Spin indicator={<LoadingOutlined spin />} />
        )
      ) : openUpdateForm == true ? (
        loadingUpdate == false ? (
          <>
            <Form
              layout="vertical"
              onFinish={async (values: any) => {
                await onFinishUpdateReview(values);
              }}
              form={formUpdate}
            >
              <Item
                name="title"
                label="Title"
                initialValue={review[0].task_title}
              >
                <TextArea style={{ textAlign: "center" }} />
              </Item>
              <Item name="age" label="Age" initialValue={review[0].age}>
                <TextArea style={{ textAlign: "center" }} />
              </Item>
              <Item
                name="answer_type"
                label="Answer Type"
                initialValue={review[0].answer_type}
              >
                <TextArea style={{ textAlign: "center" }} />
              </Item>
              <Item
                name="keep_order"
                label="Keep Order of multiple-choice/-select"
                initialValue={review[0].keep_order}
              >
                <TextArea style={{ textAlign: "center" }} />
              </Item>
              <Item
                name="categories"
                label="Categories"
                initialValue={review[0].categories}
              >
                <TextArea style={{ textAlign: "center" }} />
              </Item>
              <Item name="body" label="Body" initialValue={review[0].body}>
                <TextArea style={{ textAlign: "center" }} />
              </Item>
              <Item
                name="question"
                label="question"
                initialValue={review[0].question}
              >
                <TextArea style={{ textAlign: "center" }} />
              </Item>
              <Item
                name="answer_options"
                label="Answer Options"
                initialValue={review[0].answer_options}
              >
                <TextArea style={{ textAlign: "center" }} />
              </Item>
              <Item
                name="answer_explanation"
                label="Answer Explanation"
                initialValue={review[0].answer_explanation}
              >
                <TextArea style={{ textAlign: "center" }} />
              </Item>
              <Item
                name="this_is_if"
                label="This is Informatics"
                initialValue={review[0].this_is_if}
              >
                <TextArea style={{ textAlign: "center" }} />
              </Item>
              <Item
                name="this_is_ct"
                label="This is Computational Thinking"
                initialValue={review[0].this_is_ct}
              >
                <TextArea style={{ textAlign: "center" }} />
              </Item>
              <Item
                name="if_keywords"
                label="Informatics Keywords and Websites"
                initialValue={review[0].if_keywords}
              >
                <TextArea style={{ textAlign: "center" }} />
              </Item>
              <Item
                name="ct_keywords"
                label="Computational Thinking Keywords and Websites"
                initialValue={review[0].ct_keywords}
              >
                <TextArea style={{ textAlign: "center" }} />
              </Item>

              <Item
                name="wording_phrases"
                label="Wording and Phrases"
                initialValue={review[0].wording_phrases}
              >
                <TextArea style={{ textAlign: "center" }} />
              </Item>
              <Item
                name="comments"
                label="Comments"
                initialValue={review[0].comments}
              >
                <TextArea style={{ textAlign: "center" }} />
              </Item>
              <Item
                name="graphics"
                label="Graphics and Other Files"
                initialValue={review[0].graphics}
              >
                <TextArea style={{ textAlign: "center" }} />
              </Item>
              <Item
                name="authors"
                label="Authors, Contributors, and Editors (incl. Graphics)"
                initialValue={review[0].authors}
              >
                <TextArea style={{ textAlign: "center" }} />
              </Item>
            </Form>

            <Group>
              <FloatButton
                onClick={() => formUpdate.submit()}
                type="primary"
                icon={<SendOutlined />}
              />
              <FloatButton
                onClick={() => {
                  setOpenForm(false);
                  resetFormUpdate();
                }}
                type="default"
                icon={<CloseOutlined style={{ color: "#eb4034" }} />}
              />
            </Group>
          </>
        ) : (
          <Spin indicator={<LoadingOutlined spin />} />
        )
      ) : (
        <>
          <Divider>Task Title</Divider>
          <Paragraph style={{ textAlign: "center" }}>
            {review[0].task_title == null ? (
              <Text italic type="secondary">
                No Comments on this part
              </Text>
            ) : (
              review[0].task_title
            )}
          </Paragraph>
          <Divider>Age</Divider>
          <Paragraph style={{ textAlign: "center" }}>
            {review[0].age == null ? (
              <Text italic type="secondary">
                No comments on this part
              </Text>
            ) : (
              review[0].age
            )}
          </Paragraph>
          <Divider>Answer Type</Divider>
          <Paragraph style={{ textAlign: "center" }}>
            {review[0].answer_type == null ? (
              <Text italic type="secondary">
                No comments on this part
              </Text>
            ) : (
              review[0].answer_type
            )}
          </Paragraph>
          <Divider>Keep order of multiple-choice/-select</Divider>
          <Paragraph style={{ textAlign: "center" }}>
            {review[0].keep_order == null ? (
              <Text italic type="secondary">
                No comments on this part
              </Text>
            ) : (
              review[0].keep_order
            )}
          </Paragraph>
          <Divider>Categories</Divider>
          <Paragraph style={{ textAlign: "center" }}>
            {review[0].categories == null ? (
              <Text italic type="secondary">
                No comments on this part
              </Text>
            ) : (
              review[0].categories
            )}
          </Paragraph>
          <Divider>Body</Divider>
          <Paragraph style={{ textAlign: "center" }}>
            {review[0].body == null ? (
              <Text italic type="secondary">
                No comments on this part
              </Text>
            ) : (
              review[0].body
            )}
          </Paragraph>
          <Divider>Question</Divider>
          <Paragraph style={{ textAlign: "center" }}>
            {review[0].question == null ? (
              <Text italic type="secondary">
                No comments on this part
              </Text>
            ) : (
              review[0].question
            )}
          </Paragraph>
          <Divider>Answer Options</Divider>
          <Paragraph style={{ textAlign: "center" }}>
            {review[0].answer_options == null ? (
              <Text italic type="secondary">
                No comments on this part
              </Text>
            ) : (
              review[0].answer_options
            )}
          </Paragraph>
          <Divider>Answer Explanation</Divider>
          <Paragraph style={{ textAlign: "center" }}>
            {review[0].answer_explanation == null ? (
              <Text italic type="secondary">
                No comments on this part
              </Text>
            ) : (
              review[0].answer_explanation
            )}
          </Paragraph>
          <Divider>This is Informatics</Divider>
          <Paragraph style={{ textAlign: "center" }}>
            {review[0].this_is_if == null ? (
              <Text italic type="secondary">
                No comments on this part
              </Text>
            ) : (
              review[0].this_is_if
            )}
          </Paragraph>
          <Divider>This is Computational Thinking</Divider>
          <Paragraph style={{ textAlign: "center" }}>
            {review[0].this_is_ct == null ? (
              <Text italic type="secondary">
                No comments on this part
              </Text>
            ) : (
              review[0].this_is_ct
            )}
          </Paragraph>
          <Divider>Informatics Keywords and Websites</Divider>
          <Paragraph style={{ textAlign: "center" }}>
            {review[0].if_keywords == null ? (
              <Text italic type="secondary">
                No comments on this part
              </Text>
            ) : (
              review[0].if_keywords
            )}
          </Paragraph>
          <Divider>Computational Thinking Keywords and Websites</Divider>
          <Paragraph style={{ textAlign: "center" }}>
            {review[0].ct_keywords == null ? (
              <Text italic type="secondary">
                No comments on this part
              </Text>
            ) : (
              review[0].ct_keywords
            )}
          </Paragraph>
          <Divider>Wording and Phrases</Divider>
          <Paragraph style={{ textAlign: "center" }}>
            {review[0].wording_phrases == null ? (
              <Text italic type="secondary">
                No comments on this part
              </Text>
            ) : (
              review[0].wording_phrases
            )}
          </Paragraph>
          <Divider>Comments</Divider>
          <Paragraph style={{ textAlign: "center" }}>
            {review[0].comments == null ? (
              <Text italic type="secondary">
                No comments on this part
              </Text>
            ) : (
              review[0].comments
            )}
          </Paragraph>
          <Divider>Graphics</Divider>
          <Paragraph style={{ textAlign: "center" }}>
            {review[0].graphics == null ? (
              <Text italic type="secondary">
                No comments on this part
              </Text>
            ) : (
              review[0].graphics
            )}
          </Paragraph>
          <Divider>Authors</Divider>
          <Paragraph style={{ textAlign: "center" }}>
            {review[0].authors == null ? (
              <Text italic type="secondary">
                No comments on this part
              </Text>
            ) : (
              review[0].authors
            )}
          </Paragraph>
          {/* <Button onClick={() => setOpenForm(true)}>Update</Button> */}
          <FloatButton
            onClick={() => setOpenForm(true)}
            type="primary"
            icon={<EditOutlined />}
          />
        </>
      )}
    </>
  );
}
