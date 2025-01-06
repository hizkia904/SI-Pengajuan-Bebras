"use client";

import transformTimestamp from "@/dateTransform";
import { Alert, Collapse, List, Rate, Space, Typography } from "antd";
const { Text } = Typography;
const { Item } = List;
export default function DisplayRating({
  rating,
  rata_rating,
}: {
  rating: any[];
  rata_rating: any;
}) {
  return (
    <>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Alert
          message="Warning"
          description="You can't no longer add or edit rating"
          type="warning"
          showIcon
        />
        <Text>Average Rating of this task : {rata_rating}</Text>
        {rating.length != 0 ? (
          <List
            header="Rating"
            pagination={{
              total: rating.length,
              pageSize: 1,
            }}
            bordered
            dataSource={rating}
            renderItem={(item: any, index: number) => (
              <Item>
                <Space direction="vertical">
                  <Text italic>{transformTimestamp(item.time_stamp)}</Text>
                  <Text>As for now</Text>
                  <Rate count={6} value={item.as_for_now} disabled />
                  <Text>Potential</Text>
                  <Rate count={6} value={item.potential} disabled />
                </Space>
              </Item>
            )}
          />
        ) : (
          <Text italic type="secondary">
            No Ratings found
          </Text>
        )}
      </Space>
    </>
  );
}
