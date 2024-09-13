"use client";

import transformTimestamp from "@/dateTransform";
import { Collapse, List, Rate, Space, Typography } from "antd";
const { Text } = Typography;
const { Item } = List;
export default function RatingNasionalSectionClient({
  rating,
  rata_rating,
}: {
  rating: any[];
  rata_rating: any;
}) {
  const mapResult = rating.map((value: any, index: number) => {
    const children = (
      <List
        header="Rating"
        pagination={{
          total: rating.length,
          pageSize: 1,
        }}
        bordered
        dataSource={value.records}
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
    );
    return { key: value.id, label: value.nama, children };
  });
  return (
    <>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Text>Average Rating : {rata_rating}</Text>
        {rating.length != 0 ? (
          <Collapse items={mapResult} size="small" />
        ) : (
          <Text italic type="secondary">
            No Ratings found
          </Text>
        )}
      </Space>
    </>
  );
}
