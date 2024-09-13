"use client";

import { Collapse, CollapseProps, Divider, Typography } from "antd";
const { Text, Paragraph } = Typography;
export default function ReviewNasionalSectionClient({
  review,
}: {
  review: any[];
}) {
  const mapResult = review.map((value: any, index: number) => {
    const children = (
      <>
        <Divider>Task Title</Divider>
        <Paragraph style={{ textAlign: "center" }}>
          {value.task_title == null ? (
            <Text italic type="secondary">
              No Comments on this part
            </Text>
          ) : (
            value.task_title
          )}
        </Paragraph>
        <Divider>Age</Divider>
        <Paragraph style={{ textAlign: "center" }}>
          {value.age == null ? (
            <Text italic type="secondary">
              No comments on this part
            </Text>
          ) : (
            value.age
          )}
        </Paragraph>
        <Divider>Answer Type</Divider>
        <Paragraph style={{ textAlign: "center" }}>
          {value.answer_type == null ? (
            <Text italic type="secondary">
              No comments on this part
            </Text>
          ) : (
            value.answer_type
          )}
        </Paragraph>
        <Divider>Keep order of multiple-choice/-select</Divider>
        <Paragraph style={{ textAlign: "center" }}>
          {value.keep_order == null ? (
            <Text italic type="secondary">
              No comments on this part
            </Text>
          ) : (
            value.keep_order
          )}
        </Paragraph>
        <Divider>Categories</Divider>
        <Paragraph style={{ textAlign: "center" }}>
          {value.categories == null ? (
            <Text italic type="secondary">
              No comments on this part
            </Text>
          ) : (
            value.categories
          )}
        </Paragraph>
        <Divider>Body</Divider>
        <Paragraph style={{ textAlign: "center" }}>
          {value.body == null ? (
            <Text italic type="secondary">
              No comments on this part
            </Text>
          ) : (
            value.body
          )}
        </Paragraph>
        <Divider>Question</Divider>
        <Paragraph style={{ textAlign: "center" }}>
          {value.question == null ? (
            <Text italic type="secondary">
              No comments on this part
            </Text>
          ) : (
            value.question
          )}
        </Paragraph>
        <Divider>Answer Options</Divider>
        <Paragraph style={{ textAlign: "center" }}>
          {value.answer_options == null ? (
            <Text italic type="secondary">
              No comments on this part
            </Text>
          ) : (
            value.answer_options
          )}
        </Paragraph>
        <Divider>Answer Explanation</Divider>
        <Paragraph style={{ textAlign: "center" }}>
          {value.answer_explanation == null ? (
            <Text italic type="secondary">
              No comments on this part
            </Text>
          ) : (
            value.answer_explanation
          )}
        </Paragraph>
        <Divider>This is Informatics</Divider>
        <Paragraph style={{ textAlign: "center" }}>
          {value.this_is_if == null ? (
            <Text italic type="secondary">
              No comments on this part
            </Text>
          ) : (
            value.this_is_if
          )}
        </Paragraph>
        <Divider>This is Computational Thinking</Divider>
        <Paragraph style={{ textAlign: "center" }}>
          {value.this_is_ct == null ? (
            <Text italic type="secondary">
              No comments on this part
            </Text>
          ) : (
            value.this_is_ct
          )}
        </Paragraph>
        <Divider>Informatics Keywords and Websites</Divider>
        <Paragraph style={{ textAlign: "center" }}>
          {value.if_keywords == null ? (
            <Text italic type="secondary">
              No comments on this part
            </Text>
          ) : (
            value.if_keywords
          )}
        </Paragraph>
        <Divider>Computational Thinking Keywords and Websites</Divider>
        <Paragraph style={{ textAlign: "center" }}>
          {value.ct_keywords == null ? (
            <Text italic type="secondary">
              No comments on this part
            </Text>
          ) : (
            value.ct_keywords
          )}
        </Paragraph>
        <Divider>Wording and Phrases</Divider>
        <Paragraph style={{ textAlign: "center" }}>
          {value.wording_phrases == null ? (
            <Text italic type="secondary">
              No comments on this part
            </Text>
          ) : (
            value.wording_phrases
          )}
        </Paragraph>
        <Divider>Comments</Divider>
        <Paragraph style={{ textAlign: "center" }}>
          {value.comments == null ? (
            <Text italic type="secondary">
              No comments on this part
            </Text>
          ) : (
            value.comments
          )}
        </Paragraph>
        <Divider>Graphics</Divider>
        <Paragraph style={{ textAlign: "center" }}>
          {value.graphics == null ? (
            <Text italic type="secondary">
              No comments on this part
            </Text>
          ) : (
            value.graphics
          )}
        </Paragraph>
        <Divider>Authors</Divider>
        <Paragraph style={{ textAlign: "center" }}>
          {value.authors == null ? (
            <Text italic type="secondary">
              No comments on this part
            </Text>
          ) : (
            value.authors
          )}
        </Paragraph>
      </>
    );
    return { key: index, label: value.nama, children };
  });

  return mapResult.length != 0 ? (
    <Collapse size="small" items={mapResult} />
  ) : (
    <Text italic type="secondary">
      No Reviews found
    </Text>
  );
}
