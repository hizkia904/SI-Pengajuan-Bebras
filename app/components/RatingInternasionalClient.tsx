"use client";

import { List, Rate, Space, Typography } from "antd";
const { Text } = Typography;
const { Item } = List;
export default function RatingInternasionalClient({
  ratingInternasional,
}: {
  ratingInternasional: any[];
}) {
  return ratingInternasional.length != 0 ? (
    <List
      header="Rating Internasional"
      pagination={{
        total: ratingInternasional.length,
        pageSize: 1,
      }}
      bordered
      dataSource={ratingInternasional}
      renderItem={(item: any, index: number) => (
        <Item>
          <Space direction="vertical">
            <Text strong>{item.name}</Text>
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
  );
}
