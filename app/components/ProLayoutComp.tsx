"use client";

import { routes_admin, routes_biro, routes_tim_nasional } from "../menu";

import { notification, Skeleton, Spin } from "antd";
import dynamic from "next/dynamic";
const ProLayout = dynamic(
  () => import("@ant-design/pro-components").then((com) => com.ProLayout),
  {
    ssr: false,
  }
);
const PageContainer = dynamic(
  () => import("@ant-design/pro-components").then((com) => com.PageContainer),
  {
    ssr: false,
  }
);
import React, { createContext, Suspense, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, Button } from "antd";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../actions";
import { NotificationType } from "@/allType";
import { SearchOutlined } from "@ant-design/icons";

const { Avatar: SkelAvatar } = Skeleton;

export const MyContext = createContext<
  null | ((type: NotificationType, message: string) => void)
>(null);
export default function ProLayoutComp({
  content,
  username,
  role,
}: {
  content: React.ReactNode;
  username: string | undefined;
  role: string | undefined;
}) {
  const path_now = usePathname();
  const initial_state = path_now.startsWith(
    "/tim_nasional/bebras_task/pengajuan"
  )
    ? "/tim_nasional/bebras_task/pengajuan"
    : path_now.startsWith("/tim_nasional/bebras_task/archive")
    ? "/tim_nasional/bebras_task/archive"
    : path_now.startsWith("/tim_nasional/bebras_task/info")
    ? "/tim_nasional/bebras_task/info"
    : path_now.startsWith("/tim_nasional/bebras_task/dashboard")
    ? "/tim_nasional/bebras_task/dashboard"
    : path_now.startsWith("/tim_nasional/profile")
    ? "/tim_nasional/profile"
    : path_now.startsWith("/biro/bebras_task/pengajuan")
    ? "/biro/bebras_task/pengajuan"
    : path_now.startsWith("/biro/bebras_task/archive")
    ? "/biro/bebras_task/archive"
    : path_now.startsWith("/biro/bebras_task/info")
    ? "/biro/bebras_task/info"
    : path_now.startsWith("/biro/bebras_task/dashboard")
    ? "/biro/bebras_task/dashboard"
    : path_now.startsWith("/biro/profile")
    ? "/biro/profile"
    : path_now.startsWith("/admin/categories")
    ? "/admin/categories"
    : path_now.startsWith("/admin/usia")
    ? "/admin/usia"
    : path_now.startsWith("/admin/user_settings")
    ? "/admin/user_settings"
    : path_now.startsWith("/admin/biro")
    ? "/admin/biro"
    : "/admin/profile";
  const [pathname, setPathname] = useState(initial_state);

  const router = useRouter();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type: NotificationType, message: string) => {
    api[type]({
      message,
      showProgress: true,
      placement: "top",
    });
  };

  return (
    <ProLayout
      fixSiderbar={true}
      title="SI Pengajuan Bebras Task"
      logo="https://bebras.or.id/v3/wp-content/uploads/2017/07/logo-bebrasid-2.jpg"
      route={{
        // path: "/",
        routes:
          role == "BIRO"
            ? routes_biro
            : role == "TIM NASIONAL"
            ? routes_tim_nasional
            : role == "ADMIN"
            ? routes_admin
            : [],
      }}
      location={{
        pathname,
      }}
      menuItemRender={(item, dom) => (
        <a
          onClick={() => {
            if (item.path) {
              router.push(item.path);
              setPathname(item.path.split("?")[0]);
            }

            // setPathname(item.path || "/welcome");
          }}
        >
          {dom}
        </a>
      )}
      avatarProps={{
        title: username,
        icon: (
          <Suspense fallback={<SkelAvatar />}>
            <Avatar style={{ backgroundColor: "#f56a00" }}>{username}</Avatar>
          </Suspense>
        ),
        render(avatarProps, defaultDom, props) {
          return (
            <>
              {defaultDom}
              <Button
                type="text"
                icon={<FontAwesomeIcon icon={faRightFromBracket} />}
                onClick={async () => {
                  try {
                    const res = await logout();
                    if (!res.error) {
                      window.location.reload();
                    }
                  } catch (e) {}
                }}
              />
            </>
          );
        },
      }}
    >
      <PageContainer
        title={false}
        content={
          <>
            <MyContext.Provider value={openNotification}>
              {contextHolder}
              {content}
            </MyContext.Provider>
          </>
        }
      />
    </ProLayout>
  );
}
