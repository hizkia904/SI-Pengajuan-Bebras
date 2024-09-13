"use client";

import { Button } from "antd";
import { ReactNode, useState } from "react";

export default function ButtonWithLoading({
  icon,
  type,
  onClick,
}: {
  icon?: ReactNode;
  type?: "link" | "text" | "default" | "primary" | "dashed" | undefined;
  onClick: () => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      loading={loading}
      icon={icon}
      type={type}
      onClick={async () => {
        setLoading(true);
        await onClick();
        setLoading(false);
      }}
    />
  );
}
