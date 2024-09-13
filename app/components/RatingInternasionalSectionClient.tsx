"use client";

import { List, Rate, Space, Typography } from "antd";
const { Text } = Typography;
const { Item } = List;
export default function RatingInternasionalSectionClient({
  rating,
}: {
  rating: any[];
}) {
  return rating.length != 0 ? (
    <List
      header="Rating Internasional"
      pagination={{
        total: rating.length,
        pageSize: 1,
      }}
      bordered
      dataSource={rating}
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
