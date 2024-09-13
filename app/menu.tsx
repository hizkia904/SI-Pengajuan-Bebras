import { UserOutlined } from "@ant-design/icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuildingColumns,
  faGlobe,
  faList,
  faScroll,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export const routes_biro = [
  {
    path: "/biro/bebras_task",
    name: "Bebras Task",
    icon: <FontAwesomeIcon icon={faScroll} />,
    component: "bebras_task",
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
    path: "/tim_nasional/bebras_task",
    name: "Bebras Task",
    icon: <FontAwesomeIcon icon={faScroll} />,
    component: "bebras_task",
  },
  {
    path: "/tim_nasional/bank_soal",
    name: "Bank Soal",
    icon: <FontAwesomeIcon icon={faBuildingColumns} />,
    component: "bank_soal",
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
    path: "/admin/negara",
    name: "Negara",
    icon: <FontAwesomeIcon icon={faGlobe} />,
    component: "bebras_task",
  },
  {
    path: "/admin/usia",
    name: "Usia",
    icon: <FontAwesomeIcon icon={faScroll} />,
    component: "bebras_task",
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
