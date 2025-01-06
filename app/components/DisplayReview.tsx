"use client";
import { Alert, Divider, Space, Typography } from "antd";

const { Paragraph, Text } = Typography;

export default function DisplayReview({ review }: { review: any[] }) {
  return (
    <>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Alert
          message="Warning"
          description="You can't no longer add or edit review"
          type="warning"
          showIcon
        />
        {review.length == 0 ? (
          <Text italic type="secondary">
            No Reviews found
          </Text>
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
          </>
        )}
      </Space>
    </>
  );
}
