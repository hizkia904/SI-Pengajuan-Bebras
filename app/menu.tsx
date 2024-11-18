import { UserOutlined } from "@ant-design/icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuildingColumns,
  faGlobe,
  faList,
  faScroll,
  faUser,
  faUsersRectangle,
} from "@fortawesome/free-solid-svg-icons";

export const routes_biro = [
  {
    // path: "/biro/bebras_task",
    name: "Bebras Task",
    icon: <FontAwesomeIcon icon={faScroll} />,
    component: "bebras_task",
    children: [
      { path: "/biro/bebras_task/pengajuan?p=1", name: "Pengajuan" },
      { path: "/biro/bebras_task/archive?p=1", name: "Archive" },
      { path: "/biro/bebras_task/dashboard", name: "Dashboard" },
      { path: "/biro/bebras_task/info", name: "Info" },
    ],
  },
  {
    path: "/biro/profile",
    name: "Profile",
    icon: <FontAwesomeIcon icon={faUser} />,
    component: "profile",
  },
];

export const routes_tim_nasional = [
  {
    // path: "/tim_nasional/bebras_task",
    name: "Bebras Task",
    icon: <FontAwesomeIcon icon={faScroll} />,
    component: "bebras_task",
    children: [
      { path: "/tim_nasional/bebras_task/pengajuan?p=1", name: "Pengajuan" },
      { path: "/tim_nasional/bebras_task/archive?p=1", name: "Archive" },
      { path: "/tim_nasional/bebras_task/dashboard", name: "Dashboard" },
      { path: "/tim_nasional/bebras_task/info", name: "Info" },
    ],
  },

  {
    path: "/tim_nasional/profile",
    name: "Profile",
    icon: <FontAwesomeIcon icon={faUser} />,
    component: "profile",
  },
];

export const routes_admin = [
  {
    path: "/admin/categories",
    name: "Categories",
    icon: <FontAwesomeIcon icon={faList} />,
    component: "bebras_task",
  },

  {
    path: "/admin/usia",
    name: "Usia",
    icon: <FontAwesomeIcon icon={faScroll} />,
    component: "bebras_task",
  },
  {
    path: "/admin/biro",
    name: "Biro",
    icon: <FontAwesomeIcon icon={faBuildingColumns} />,
    component: "profile",
  },
  {
    path: "/admin/user_settings",
    name: "User Settings",
    icon: <FontAwesomeIcon icon={faUsersRectangle} />,
    component: "profile",
  },
  {
    path: "/admin/profile",
    name: "Profile",
    icon: <FontAwesomeIcon icon={faUser} />,
    component: "profile",
  },
];

export const ColorList = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae"];

export function getRandomColor(): string {
  const min = 0;
  const max = 3;
  return ColorList[Math.floor(Math.random() * (max - min + 1)) + min];
}
