"use client";
import {
  Avatar,
  Descriptions,
  Divider,
  List,
  Rate,
  Space,
  Tabs,
  TabsProps,
  Tag,
  Typography,
} from "antd";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { MyContext } from "./ProLayoutComp";
import {
  Age,
  BankSoalGeneralInfo,
  BankSoalTableRows,
  Categories,
  KontenSoal,
} from "@/interface";
import CustomizeRate from "./CustomizeRate";
import { changeRatingNasional } from "../actions";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditFilled,
  EditOutlined,
} from "@ant-design/icons";
import parse from "html-react-parser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDot } from "@fortawesome/free-regular-svg-icons";
import { faCircle, faCircleNotch } from "@fortawesome/free-solid-svg-icons";
const { Text, Paragraph, Title } = Typography;
const { Item } = List;
const { Meta } = Item;
export default function BankSoalClient({
  infoSoal,
  age,
  categories,
  versi_indonesia,
  versi_inggris,
}: {
  infoSoal: BankSoalGeneralInfo | string;
  age: Age[] | string;
  categories: Categories[] | string;
  versi_indonesia: KontenSoal | string;
  versi_inggris: KontenSoal | string;
}) {
  return (
    <>
      <Descriptions
        layout="vertical"
        items={[
          {
            key: "kode_soal",
            label: "Kode Soal",
            children:
              typeof infoSoal != "string" ? (
                infoSoal.kode_soal
              ) : (
                <Text type="danger" italic>
                  {infoSoal}
                </Text>
              ),
          },
          {
            key: "tahun",
            label: "Tahun",
            children:
              typeof infoSoal != "string" ? (
                infoSoal.tahun
              ) : (
                <Text type="danger" italic>
                  {infoSoal}
                </Text>
              ),
          },
          {
            key: "answer_type",
            label: "Answer Type",
            children:
              typeof infoSoal != "string" ? (
                infoSoal.tahun
              ) : (
                <Text type="danger" italic>
                  {infoSoal}
                </Text>
              ),
          },
          {
            key: "rating_nasional",
            label: "Rating Nasional",
            children:
              typeof infoSoal != "string" ? (
                <Rate
                  count={6}
                  value={
                    infoSoal.rating_nasional == null
                      ? undefined
                      : infoSoal.rating_nasional
                  }
                  disabled
                  style={{ fontSize: "1em" }}
                />
              ) : (
                <Text type="danger" italic>
                  {infoSoal}
                </Text>
              ),
          },
          {
            key: "rating_internasional",
            label: "Rating Internasional",

            children:
              typeof infoSoal != "string" ? (
                <Rate
                  count={6}
                  value={infoSoal.rating_internasional}
                  disabled
                  style={{ fontSize: "1em" }}
                />
              ) : (
                <Text type="danger" italic>
                  {infoSoal}
                </Text>
              ),
          },
          {
            key: "negara",
            label: "Negara",
            children:
              typeof infoSoal != "string" ? (
                infoSoal.negara
              ) : (
                <Text type="danger" italic>
                  {infoSoal}
                </Text>
              ),
            span: 2,
          },
          {
            key: "best_task",
            label: "Best Task",
            children:
              typeof infoSoal != "string" ? (
                infoSoal.best_task == true ? (
                  <CheckCircleOutlined
                    style={{ fontSize: "1em", color: "green" }}
                  />
                ) : (
                  <CloseCircleOutlined
                    style={{ fontSize: "1em", color: "red" }}
                  />
                )
              ) : (
                <Text type="danger" italic>
                  {infoSoal}
                </Text>
              ),
          },
          {
            key: "terpilih",
            label: "Terpilih",
            children:
              typeof infoSoal != "string" ? (
                infoSoal.terpilih == true ? (
                  <CheckCircleOutlined
                    style={{ fontSize: "1em", color: "green" }}
                  />
                ) : (
                  <CloseCircleOutlined
                    style={{ fontSize: "1em", color: "red" }}
                  />
                )
              ) : (
                <Text type="danger" italic>
                  {infoSoal}
                </Text>
              ),
          },
          {
            key: "keep_order",
            label: "Keep Order",
            children:
              typeof infoSoal != "string" ? (
                infoSoal.keep_order == true ? (
                  <CheckCircleOutlined
                    style={{ fontSize: "1em", color: "green" }}
                  />
                ) : (
                  <CloseCircleOutlined
                    style={{ fontSize: "1em", color: "red" }}
                  />
                )
              ) : (
                <Text type="danger" italic>
                  {infoSoal}
                </Text>
              ),
            span: 2,
          },

          {
            span: 3,
            key: "categories",
            label: "Categories",
            children:
              typeof categories != "string" ? (
                categories.map((value: Categories, index: number) => (
                  <Tag color="gold" bordered={false}>
                    {value.nama}
                  </Tag>
                ))
              ) : (
                <Text type="danger" italic>
                  {categories}
                </Text>
              ),
          },
          {
            span: 3,
            key: "age",
            label: "Age",
            children:
              typeof age != "string" ? (
                age.map((value: Age, index: number) => (
                  <Tag color="gold" bordered={false}>
                    {value.range_age} : {value.difficulty}
                  </Tag>
                ))
              ) : (
                <Text type="danger" italic>
                  {age}
                </Text>
              ),
          },
        ]}
        bordered={true}
        style={{ textAlign: "center" }}
      />

      {/* </Space> */}
      {/* <Tabs items={itemsTabs} centered /> */}
      <Divider style={{ borderColor: "#1677ff" }}>Body</Divider>
      <Tabs
        centered
        items={[
          {
            key: "ID",
            label: "Indonesia",
            children:
              typeof versi_indonesia != "string" ? (
                parse(versi_indonesia.body)
              ) : (
                <Text type="danger" italic>
                  {versi_indonesia}
                </Text>
              ),
          },
          {
            key: "EN",
            label: "Inggris",
            children:
              typeof versi_inggris != "string" ? (
                parse(versi_inggris.body)
              ) : (
                <Text type="danger" italic>
                  {versi_inggris}
                </Text>
              ),
          },
        ]}
      />
      <Divider style={{ borderColor: "#1677ff" }}>Question</Divider>
      <Tabs
        centered
        items={[
          {
            key: "ID",
            label: "Indonesia",
            children:
              typeof versi_indonesia != "string" ? (
                parse(versi_indonesia.question)
              ) : (
                <Text type="danger" italic>
                  {versi_indonesia}
                </Text>
              ),
          },
          {
            key: "EN",
            label: "Inggris",
            children:
              typeof versi_inggris != "string" ? (
                parse(versi_inggris.question)
              ) : (
                <Text type="danger" italic>
                  {versi_inggris}
                </Text>
              ),
          },
        ]}
      />
      <Divider style={{ borderColor: "#1677ff" }}>
        Answer Options / Interactivity Description
      </Divider>
      <Tabs
        centered
        items={[
          {
            key: "ID",
            label: "Indonesia",
            children:
              typeof versi_indonesia != "string" ? (
                parse(versi_indonesia.answer_options)
              ) : (
                <Text type="danger" italic>
                  {versi_indonesia}
                </Text>
              ),
          },
          {
            key: "EN",
            label: "Inggris",
            children:
              typeof versi_inggris != "string" ? (
                parse(versi_inggris.answer_options)
              ) : (
                <Text type="danger" italic>
                  {versi_inggris}
                </Text>
              ),
          },
        ]}
      />
      <Divider style={{ borderColor: "#1677ff" }}>Answer Explanation</Divider>
      <Tabs
        centered
        items={[
          {
            key: "ID",
            label: "Indonesia",
            children:
              typeof versi_indonesia != "string" ? (
                parse(versi_indonesia.answer_explanation)
              ) : (
                <Text type="danger" italic>
                  {versi_indonesia}
                </Text>
              ),
          },
          {
            key: "EN",
            label: "Inggris",
            children:
              typeof versi_inggris != "string" ? (
                parse(versi_inggris.answer_explanation)
              ) : (
                <Text type="danger" italic>
                  {versi_inggris}
                </Text>
              ),
          },
        ]}
      />
      <Divider style={{ borderColor: "#1677ff" }}>This is Informatics</Divider>
      <Tabs
        centered
        items={[
          {
            key: "ID",
            label: "Indonesia",
            children:
              typeof versi_indonesia != "string" ? (
                parse(versi_indonesia.this_is_if)
              ) : (
                <Text type="danger" italic>
                  {versi_indonesia}
                </Text>
              ),
          },
          {
            key: "EN",
            label: "Inggris",
            children:
              typeof versi_inggris != "string" ? (
                parse(versi_inggris.this_is_if)
              ) : (
                <Text type="danger" italic>
                  {versi_inggris}
                </Text>
              ),
          },
        ]}
      />
      <Divider style={{ borderColor: "#1677ff" }}>
        This is Computational Thinking
      </Divider>
      <Tabs
        centered
        items={[
          {
            key: "ID",
            label: "Indonesia",
            children:
              typeof versi_indonesia != "string" ? (
                parse(versi_indonesia.this_is_ct)
              ) : (
                <Text type="danger" italic>
                  {versi_indonesia}
                </Text>
              ),
          },
          {
            key: "EN",
            label: "Inggris",
            children:
              typeof versi_inggris != "string" ? (
                parse(versi_inggris.this_is_ct)
              ) : (
                <Text type="danger" italic>
                  {versi_inggris}
                </Text>
              ),
          },
        ]}
      />
      <Divider style={{ borderColor: "#1677ff" }}>
        Informatics Keywords and Websites
      </Divider>
      <Tabs
        centered
        items={[
          {
            key: "ID",
            label: "Indonesia",
            children:
              typeof versi_indonesia != "string" ? (
                parse(versi_indonesia.if_keywords)
              ) : (
                <Text type="danger" italic>
                  {versi_indonesia}
                </Text>
              ),
          },
          {
            key: "EN",
            label: "Inggris",
            children:
              typeof versi_inggris != "string" ? (
                parse(versi_inggris.if_keywords)
              ) : (
                <Text type="danger" italic>
                  {versi_inggris}
                </Text>
              ),
          },
        ]}
      />
      <Divider style={{ borderColor: "#1677ff" }}>
        Computational Thinking Keywords and Websites
      </Divider>
      <Tabs
        centered
        items={[
          {
            key: "ID",
            label: "Indonesia",
            children:
              typeof versi_indonesia != "string" ? (
                parse(versi_indonesia.ct_keywords)
              ) : (
                <Text type="danger" italic>
                  {versi_indonesia}
                </Text>
              ),
          },
          {
            key: "EN",
            label: "Inggris",
            children:
              typeof versi_inggris != "string" ? (
                parse(versi_inggris.ct_keywords)
              ) : (
                <Text type="danger" italic>
                  {versi_inggris}
                </Text>
              ),
          },
        ]}
      />
      <Divider style={{ borderColor: "#1677ff" }}>Wording and Phrases</Divider>
      <Tabs
        centered
        items={[
          {
            key: "ID",
            label: "Indonesia",
            children:
              typeof versi_indonesia != "string" ? (
                versi_indonesia.wording_phrases != null ? (
                  parse(versi_indonesia.wording_phrases)
                ) : (
                  <Paragraph
                    type="secondary"
                    italic
                    style={{ textAlign: "center" }}
                  >
                    No Value
                  </Paragraph>
                )
              ) : (
                <Text type="danger" italic>
                  {versi_indonesia}
                </Text>
              ),
          },
          {
            key: "EN",
            label: "Inggris",
            children:
              typeof versi_inggris != "string" ? (
                versi_inggris.wording_phrases != null ? (
                  parse(versi_inggris.wording_phrases)
                ) : (
                  <Paragraph
                    type="secondary"
                    italic
                    style={{ textAlign: "center" }}
                  >
                    No Value
                  </Paragraph>
                )
              ) : (
                <Text type="danger" italic>
                  {versi_inggris}
                </Text>
              ),
          },
        ]}
      />
      <Divider style={{ borderColor: "#1677ff" }}>Comments</Divider>
      {typeof infoSoal != "string" ? (
        infoSoal.comments != null ? (
          parse(infoSoal.comments)
        ) : (
          <Paragraph type="secondary" italic style={{ textAlign: "center" }}>
            No Value
          </Paragraph>
        )
      ) : (
        <Text type="danger" italic>
          {infoSoal}
        </Text>
      )}
      <Divider style={{ borderColor: "#1677ff" }}>Graphics</Divider>
      {typeof infoSoal != "string" ? (
        infoSoal.graphics != null ? (
          parse(infoSoal.graphics)
        ) : (
          <Paragraph type="secondary" italic style={{ textAlign: "center" }}>
            No Value
          </Paragraph>
        )
      ) : (
        <Text type="danger" italic>
          {infoSoal}
        </Text>
      )}
      <Divider style={{ borderColor: "#1677ff" }}>Authors</Divider>
      {typeof infoSoal != "string" ? (
        parse(infoSoal.authors)
      ) : (
        <Text type="danger" italic>
          {infoSoal}
        </Text>
      )}
    </>
  );
}
