import { SignUpForm } from "./form";
import { runQuery } from "../db";
import { Button, Col, FloatButton, Row } from "antd/lib";
import { CustomerServiceOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";

export default async function Page() {
  const query = "select id_biro,nama from biro";
  const getBiro = await runQuery(query, []);
  const biro = getBiro.rows;
  return (
    <>
      <SignUpForm biro={biro} />
    </>
  );
}
