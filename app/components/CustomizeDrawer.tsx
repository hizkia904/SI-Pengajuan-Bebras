"use client";

import { CommentOutlined, StarOutlined } from "@ant-design/icons";
import { Drawer, FloatButton, Tabs, TabsProps, Tooltip } from "antd";
import React, { Suspense, useState } from "react";
import ReviewNasionalSection from "./ReviewNasionalSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePollHorizontal } from "@fortawesome/free-solid-svg-icons";

export default function CustomizeDrawer({
  children,
}: {
  children: React.ReactNode;
}) {
  const arr = React.Children.toArray(children);

  const review_nasional = arr.find(
    (child) => (child as React.ReactElement).key == ".$review_nasional"
  );
  const rating_nasional = arr.find(
    (child) => (child as React.ReactElement).key == ".$rating_nasional"
  );
  const rating_internasional = arr.find(
    (child) => (child as React.ReactElement).key == ".$rating_internasional"
  );
  const review_internasional = arr.find(
    (child) => (child as React.ReactElement).key == ".$review_internasional"
  );

  const status = arr.find(
    (child) => (child as React.ReactElement).key == ".$status"
  );
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Review Nasional",
      icon: <CommentOutlined />,
      children: review_nasional,
    },
    {
      key: "2",
      label: "Rating Nasional",
      icon: <StarOutlined />,
      children: rating_nasional,
    },
    {
      key: "3",
      label: "Rating Internasional sebelum Workshop",
      icon: <StarOutlined />,
      children: rating_internasional,
    },
    {
      key: "4",
      label: "Review Internasional",
      icon: <CommentOutlined />,
      children: review_internasional,
    },
    {
      key: "5",
      label: "Status Soal",
      icon: <FontAwesomeIcon icon={faSquarePollHorizontal} />,
      children: status,
    },
  ];
  return (
    <>
      <Tooltip title="Review and Rating">
        <FloatButton
          onClick={showDrawer}
          type="primary"
          icon={<CommentOutlined />}
        />
      </Tooltip>
      <Drawer
        title="Review dan Rating"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <Tabs defaultActiveKey="1" items={items} />
      </Drawer>
    </>
  );
}
