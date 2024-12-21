import Paragraph from "antd/lib/typography/Paragraph";
import { runQuery } from "../db";

import Text from "antd/es/typography/Text";
import { Anchor, Col, Row } from "antd/lib";
import parse from "html-react-parser";
import transformTimestamp from "@/dateTransform";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Descriptions, Divider, Tag } from "antd";

export default async function Task({ task_id }: { task_id: string }) {
  //soal
  let dataKontenSoal;
  let uploaderAndWhoLastUpdated;
  let dataAge;
  let dataKategori;
  let dataPembuatSoal;
  let non_registerd_authors;
  try {
    const query =
      "select " +
      "(soal).task_title," +
      "tahun," +
      "(soal).keep_order," +
      "(soal).body," +
      "(soal).question," +
      "(soal).answer_options," +
      "(soal).answer_explanation," +
      "(soal).this_is_if," +
      "(soal).this_is_ct," +
      "(soal).if_keywords," +
      "(soal).ct_keywords," +
      "(soal).wording_phrases," +
      "(soal).comments," +
      "(soal).graphics,(soal).answer_type, last_updated " +
      "from soal_usulan " +
      "where id_soal_usulan=$1;";
    const getKontenSoal = await runQuery(query, [task_id]);
    dataKontenSoal = getKontenSoal.rows[0];
  } catch (e) {
    dataKontenSoal = {
      tahun: (
        <Text type="danger" italic>
          Failed to get field of year
        </Text>
      ),
      task_title: (
        <Text type="danger" italic>
          Failed to get field of task title
        </Text>
      ),
      keep_order: (
        <Text type="danger" italic>
          Failed to get field of keep order
        </Text>
      ),
      body: (
        <Text type="danger" italic>
          Failed to get field of body
        </Text>
      ),
      question: (
        <Text type="danger" italic>
          Failed to get field of Question
        </Text>
      ),
      answer_options: (
        <Text type="danger" italic>
          Failed to get field of Answer Options
        </Text>
      ),
      answer_explanation: (
        <Text type="danger" italic>
          Failed to get field of Answer Explanation
        </Text>
      ),
      this_is_if: (
        <Text type="danger" italic>
          Failed to get field of This is Informatics
        </Text>
      ),
      this_is_ct: (
        <Text type="danger" italic>
          Failed to get field of This is Computational Thinking
        </Text>
      ),
      if_keywords: (
        <Text type="danger" italic>
          Failed to get field of Informatics Keywords and Websites
        </Text>
      ),
      ct_keywords: (
        <Text type="danger" italic>
          Failed to get field of Computational Thinking Keywords and Websites
        </Text>
      ),
      wording_phrases: (
        <Text type="danger" italic>
          Failed to get field of Wording and Phrases
        </Text>
      ),
      comments: (
        <Text type="danger" italic>
          Failed to get field of Comments
        </Text>
      ),
      graphics: (
        <Text type="danger" italic>
          Failed to get field of Graphics
        </Text>
      ),
      answer_type: (
        <Text type="danger" italic>
          Failed to get field of Answer Type
        </Text>
      ),
      last_updated: (
        <Text type="danger" italic>
          Failed to get the last time task was updated
        </Text>
      ),
    };
  }

  // uploader dan yang terakhir kali mengupdate soal
  try {
    const queryUploaderAndWhoLastUpdated =
      "select bu.nama as biro_uploader, bw.nama as biro_last_updated, u.nama as uploader,w.nama as who_last_updated from soal_usulan s inner join user_bebras u " +
      "on s.uploader = u.id inner join user_bebras w on s.who_last_updated=w.id " +
      "inner join biro bu on bu.id_biro = u.id_biro " +
      "inner join biro bw on bw.id_biro = w.id_biro " +
      " where id_soal_usulan=$1 ";
    const getUploaderAndWhoLastUpdated = await runQuery(
      queryUploaderAndWhoLastUpdated,
      [task_id]
    );
    uploaderAndWhoLastUpdated = getUploaderAndWhoLastUpdated.rows[0];
  } catch (e) {
    uploaderAndWhoLastUpdated = {
      uploader: (
        <Text italic type="danger">
          Failed to get the uploader of this task
        </Text>
      ),
      who_last_updated: (
        <Text italic type="danger">
          Failed to get who last updated this task
        </Text>
      ),
    };
  }

  //usia dari soal
  try {
    const queryAge =
      "select id_usia_soal_usulan,from_age||'-'||to_age as usia,difficulty from usia_soal_usulan inner join usia on " +
      "usia.id_usia = usia_soal_usulan.id_usia where id_soal_usulan=$1";
    const getDataAge = await runQuery(queryAge, [task_id]);
    dataAge = getDataAge.rows;
  } catch (e) {
    dataAge = (
      <Text type="danger" italic>
        Failed to get age of the task
      </Text>
    );
  }

  //kategori soal
  try {
    const queryKategori =
      "select id_categories_soal_usulan,nama from categories_soal_usulan inner join " +
      "categories on categories.id_categories=categories_soal_usulan.id_categories where id_soal_usulan=$1";
    const getDataKategori = await runQuery(queryKategori, [task_id]);
    dataKategori = getDataKategori.rows;
  } catch (e) {
    dataKategori = (
      <Text type="danger" italic>
        Failed to get categories of the task
      </Text>
    );
  }
  //pembuat soal
  try {
    const queryPembuatSoal =
      "select id_pembuat_soal,user_bebras.nama,user_bebras.email,peran from pembuat_soal_usulan inner join user_bebras" +
      " on user_bebras.id = pembuat_soal_usulan.id_user where id_soal_usulan=$1";
    const getDataPembuatSoal = await runQuery(queryPembuatSoal, [task_id]);
    dataPembuatSoal = getDataPembuatSoal.rows;
  } catch (e) {
    dataPembuatSoal = (
      <Text type="danger" italic>
        Failed to get authors of the task
      </Text>
    );
  }

  //pembuat soal yang tidak terdaftar
  try {
    const query_non_registered_author =
      "select id_pembuat_soal,nama,peran,email from non_registered_author where id_soal_usulan=$1";
    const get_non_registered_author = await runQuery(
      query_non_registered_author,
      [task_id]
    );
    non_registerd_authors = get_non_registered_author.rows;
  } catch (e) {
    non_registerd_authors = (
      <Text type="danger" italic>
        Failed to get authors of the task
      </Text>
    );
  }
  return (
    <>
      <Row gutter={20}>
        <Col span={19}>
          <Descriptions
            id="general"
            bordered={true}
            style={{ textAlign: "center" }}
            layout="vertical"
            // title={dataKontenSoal.task_title}
            items={[
              {
                key: "task_title",
                label: "Task Title",
                children: dataKontenSoal.task_title,
              },
              {
                key: "tahun",
                label: "Tahun",
                children: dataKontenSoal.tahun,
              },
              {
                key: "answer_type",
                label: "Answer Type",
                children: dataKontenSoal.answer_type,
              },
              {
                key: "keep_order",
                label: "Keep Order",
                children:
                  dataKontenSoal.keep_order == true ? (
                    <CheckCircleOutlined
                      style={{ fontSize: "1em", color: "green" }}
                    />
                  ) : dataKontenSoal.keep_order == "false" ? (
                    <CloseCircleOutlined
                      style={{ fontSize: "1em", color: "red" }}
                    />
                  ) : (
                    dataKontenSoal.keep_order
                  ),
                span: 1,
              },
              {
                key: "last_updated",
                label: "Last Updated at",
                span: 1,
                children: (
                  <>
                    <Text italic>
                      {dataKontenSoal.last_updated instanceof Date
                        ? transformTimestamp(dataKontenSoal.last_updated)
                        : dataKontenSoal.last_updated}
                    </Text>{" "}
                    by{" "}
                    {typeof uploaderAndWhoLastUpdated.who_last_updated ==
                    "string" ? (
                      <>
                        <Text strong>
                          {uploaderAndWhoLastUpdated.who_last_updated}
                        </Text>
                        <br />
                        <Text>
                          &nbsp;({uploaderAndWhoLastUpdated.biro_last_updated})
                        </Text>
                      </>
                    ) : (
                      uploaderAndWhoLastUpdated.who_last_updated
                    )}
                  </>
                ),
              },
              {
                span: 1,
                key: "uploaded_by",
                label: "Uploaded by",
                children:
                  typeof uploaderAndWhoLastUpdated.uploader == "string" ? (
                    <>
                      <Text strong>{uploaderAndWhoLastUpdated.uploader}</Text>
                      <br />
                      <Text>({uploaderAndWhoLastUpdated.biro_uploader})</Text>
                    </>
                  ) : (
                    uploaderAndWhoLastUpdated.uploader
                  ),
              },
              {
                key: "categories",
                label: "Categories",
                span: 3,
                children:
                  dataKategori instanceof Array
                    ? dataKategori.map((value: any, index: number) => {
                        return (
                          <Tag color="gold" bordered={false}>
                            {value.nama}
                          </Tag>
                        );
                      })
                    : dataKategori,
              },
              {
                key: "age",
                label: "Age",
                span: 3,
                children:
                  dataAge instanceof Array
                    ? dataAge.map((value: any, index: number) => {
                        return (
                          <Tag color="gold">
                            {value.usia} : {value.difficulty}
                          </Tag>
                        );
                      })
                    : dataAge,
              },
            ]}
          />

          <Divider style={{ borderColor: "#1677ff" }}>Body</Divider>
          <Paragraph id="body">
            {typeof dataKontenSoal.body == "string"
              ? parse(dataKontenSoal.body)
              : dataKontenSoal.body}
          </Paragraph>

          <Divider style={{ borderColor: "#1677ff" }}>
            Question / Challenge
          </Divider>
          <Paragraph id="question">
            {typeof dataKontenSoal.question == "string"
              ? parse(dataKontenSoal.question)
              : dataKontenSoal.question}
          </Paragraph>

          <Divider style={{ borderColor: "#1677ff" }}>
            Answer Options / Interactivity Description
          </Divider>
          <Paragraph id="answer_options">
            {typeof dataKontenSoal.answer_options == "string"
              ? parse(dataKontenSoal.answer_options)
              : dataKontenSoal.answer_options}
          </Paragraph>

          <Divider style={{ borderColor: "#1677ff" }}>
            Answer Explanation
          </Divider>
          <Paragraph id="answer_explanation">
            {typeof dataKontenSoal.answer_explanation == "string"
              ? parse(dataKontenSoal.answer_explanation)
              : dataKontenSoal.answer_explanation}
          </Paragraph>

          <Divider style={{ borderColor: "#1677ff" }}>
            This is Informatics
          </Divider>
          <Paragraph id="this_is_if">
            {typeof dataKontenSoal.this_is_if == "string"
              ? parse(dataKontenSoal.this_is_if)
              : dataKontenSoal.this_is_if}
          </Paragraph>
          <Divider style={{ borderColor: "#1677ff" }}>
            This is Computational Thinking
          </Divider>
          <Paragraph id="this_is_ct">
            {typeof dataKontenSoal.this_is_ct == "string"
              ? parse(dataKontenSoal.this_is_ct)
              : dataKontenSoal.this_is_ct}
          </Paragraph>

          <Divider style={{ borderColor: "#1677ff" }}>
            Informatics Keywords and Websites
          </Divider>
          <Paragraph id="if_keywords">
            {typeof dataKontenSoal.if_keywords == "string"
              ? parse(dataKontenSoal.if_keywords)
              : dataKontenSoal.if_keywords}
          </Paragraph>
          <Divider style={{ borderColor: "#1677ff" }}>
            Computational Thinking Keywords and Websites
          </Divider>
          <Paragraph id="ct_keywords">
            {typeof dataKontenSoal.ct_keywords == "string"
              ? parse(dataKontenSoal.ct_keywords)
              : dataKontenSoal.ct_keywords}
          </Paragraph>

          <Divider style={{ borderColor: "#1677ff" }}>
            Wording and Phrases
          </Divider>
          <Paragraph id="wording_phrases">
            {typeof dataKontenSoal.wording_phrases == "object" ? (
              dataKontenSoal.wording_phrases == null ? (
                <Paragraph
                  type="secondary"
                  italic
                  style={{ textAlign: "center" }}
                >
                  No Value
                </Paragraph>
              ) : (
                dataKontenSoal.wording_phrases
              )
            ) : (
              parse(dataKontenSoal.wording_phrases)
            )}
          </Paragraph>
          <Divider style={{ borderColor: "#1677ff" }}>Comments</Divider>

          <Paragraph id="comments">
            {typeof dataKontenSoal.comments == "object" ? (
              dataKontenSoal.comments == null ? (
                <Paragraph
                  type="secondary"
                  italic
                  style={{ textAlign: "center" }}
                >
                  No Value
                </Paragraph>
              ) : (
                dataKontenSoal.comments
              )
            ) : (
              parse(dataKontenSoal.comments)
            )}
          </Paragraph>

          <Divider style={{ borderColor: "#1677ff" }}>
            Graphics and Other Files
          </Divider>
          <Paragraph id="graphics">
            {typeof dataKontenSoal.graphics == "object" ? (
              dataKontenSoal.graphics == null ? (
                <Paragraph
                  type="secondary"
                  italic
                  style={{ textAlign: "center" }}
                >
                  No Value
                </Paragraph>
              ) : (
                dataKontenSoal.graphics
              )
            ) : (
              parse(dataKontenSoal.graphics)
            )}
          </Paragraph>

          <Divider style={{ borderColor: "#1677ff" }}>
            Authors, Contributors, and Editors (incl. Graphics)
          </Divider>

          <Paragraph id="authors">
            {dataPembuatSoal instanceof Array
              ? dataPembuatSoal.map((value: any, index: number) => {
                  return (
                    <Paragraph
                      key={value.id_pembuat_soal}
                    >{`${value.nama}, ${value.peran}, ${value.email}`}</Paragraph>
                  );
                })
              : dataPembuatSoal}

            {non_registerd_authors instanceof Array
              ? non_registerd_authors.map((value: any, index: number) => {
                  return (
                    <Paragraph
                      key={value.id_pembuat_soal}
                    >{`${value.nama}, ${value.peran}, ${value.email}`}</Paragraph>
                  );
                })
              : non_registerd_authors}
          </Paragraph>
        </Col>
        <Col span={5}>
          <Anchor
            items={[
              {
                key: "general",
                href: "#general",
                title:
                  "Task Title, Tahun, Answer Type, Keep Order, Categories, Age",
              },
              {
                key: "body",
                href: "#body",
                title: "Body",
              },
              {
                key: "question",
                href: "#question",
                title: "Question / Challenge",
              },
              {
                key: "answer_options",
                href: "#answer_options",
                title: "Answer Options / Interactivity Description",
              },
              {
                key: "answer_explanation",
                href: "#answer_explanation",
                title: "Answer Explanation",
              },
              {
                key: "this_is_if",
                href: "#this_is_if",
                title: "This is Informatics",
              },
              {
                key: "this_is_ct",
                href: "#this_is_ct",
                title: "This is Computational Thinking",
              },
              {
                key: "if_keywords",
                href: "#if_keywords",
                title: "Informatics Keywords and Websites",
              },
              {
                key: "ct_keywords",
                href: "#ct_keywords",
                title: "Computational Thinking Keywords and Websites",
              },
              {
                key: "wording_phrases",
                href: "#wording_phrases",
                title: "Wording and Phrases",
              },
              {
                key: "comments",
                href: "#comments",
                title: "Comments",
              },
              {
                key: "graphics",
                href: "#graphics",
                title: "Graphics and Other Files",
              },
              {
                key: "authors",
                href: "#authors",
                title: "Authors, Contributors, and Editors (.incl Graphics)",
              },
            ]}
          />
        </Col>
      </Row>
    </>
  );
}
