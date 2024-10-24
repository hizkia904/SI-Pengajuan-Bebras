"use server";

import { cookies } from "next/headers";
import { lucia, validateRequest } from "./auth";
// import { ActionResult } from "./signin/form";
import { redirect } from "next/navigation";
import { getClient, runQuery } from "./db";
import nodepandoc from "node-pandoc-promise";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import { convertToNull } from "@/utils";
import { RcFile } from "antd/es/upload";
import { sha256 } from "js-sha256";
import { ActionResult, ValuesFormAddTask } from "@/interface";
import { TransferKey } from "antd/lib/transfer/interface";

export async function logout(): Promise<ActionResult> {
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return { error: null };
}

export async function changeNationalStatus(value: any, id_soal_usulan: string) {
  let query = "";
  if (value == "ACCEPTED") {
    query = "UPDATE soal_usulan set status_nasional=$1 where id_soal_usulan=$2";
  } else if (value == "REJECTED") {
    query =
      "UPDATE soal_usulan set status_nasional=$1,gotointernational=false where id_soal_usulan=$2";
  }
  const res = await runQuery(query, [value, id_soal_usulan]);
  if (res.rowCount == 0) {
    throw new Error();
  }
}

export async function changeInternationalStatus(
  value: any,
  id_soal_usulan: string
) {
  const query =
    "UPDATE soal_usulan set status_internasional=$1 where id_soal_usulan=$2";
  const res = await runQuery(query, [value, id_soal_usulan]);
  if (res.rowCount == 0) {
    throw new Error();
  }
}

export async function changeGoToInternational(
  value: any,
  id_soal_usulan: string
) {
  const query =
    "UPDATE soal_usulan set gotointernational=$1 where id_soal_usulan=$2";
  const res = await runQuery(query, [value, id_soal_usulan]);
  if (res.rowCount == 0) {
    throw new Error();
  }
}

export async function downloadUsingPandoc(
  id_soal_usulan: string
): Promise<ArrayBuffer> {
  const query =
    "SELECT " +
    "replace((soal).answer_type,' ','_') as answer_type," +
    "(soal).task_title," +
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
    "(soal).graphics " +
    "from soal_usulan where id_soal_usulan=$1";

  const arr = [id_soal_usulan];

  const getKonten = await runQuery(query, arr);

  const konten = getKonten.rows[0];

  const queryUsia =
    "select 'usia_'||from_age||'_'||to_age||'_'||difficulty as usia " +
    "from usia_soal_usulan inner join usia on usia_soal_usulan.id_usia=usia.id_usia " +
    "where id_soal_usulan=$1";

  const getUsia = await runQuery(queryUsia, arr);
  const usia = getUsia.rows;

  const queryKategori =
    "select REPLACE(REPLACE(nama, ' ', '_'), ',', '_') as nama from categories inner join categories_soal_usulan " +
    "on categories.id_categories=categories_soal_usulan.id_categories " +
    "where id_soal_usulan=$1";

  const getKategori = await runQuery(queryKategori, arr);

  const kategori = getKategori.rows;

  const queryPembuat =
    "select nama||', ' ||peran||', '||email||', '||'Indonesia' as pembuat from user_bebras u inner join pembuat_soal_usulan p " +
    "on u.id=p.id_user where id_soal_usulan=$1";

  const getPembuat = await runQuery(queryPembuat, arr);

  const pembuat = getPembuat.rows;

  const template_komen =
    "<p>EDIT ABOVE (keep this template and add above this line): author, " +
    "e-mail, date (YYYY-MM-DD): <em>Comment, including documentation of and " +
    "reasons for changes, and precautions to take when further developing " +
    "this task. Especially mention if this task is based upon or directly " +
    "connected to another task (even from the past).</em></p>";
  const placeholder_wording_phrases =
    "<p>EDIT HERE (delete this): list of words and phrases used to name " +
    "important things mentioned in the task body (actors, " +
    "activities/processes, concepts, definitions, objects, names, etc.) This " +
    "is to ensure the consequent use of terminology in the task body and to " +
    "facilitate translation.</p>";

  let body = `<h2>Body</h2>${konten.body}<h2>Question / Challenge</h2>${
    konten.question
  }<h2>Answer Options /
Interactivity Description</h2>${
    konten.answer_options
  }<h2>Answer Explanation</h2>${
    konten.answer_explanation
  }<h2>This is Informatics</h2>${konten.this_is_if}<h2>This is Computational
Thinking</h2>${konten.this_is_ct}<h2>Informatics Keywords and
Websites</h2>${konten.if_keywords}<h2>Computational
Thinking Keywords and Websites</h2>${
    konten.ct_keywords
  }<h2>Wording and Phrases</h2>${
    konten.wording_phrases == null
      ? placeholder_wording_phrases
      : konten.wording_phrases
  }<h2>Comments</h2>
${
  konten.comments == null ? "" : konten.comments
}${template_komen}<h2>Graphics and Other Files</h2>`;
  if (konten.graphics != null) {
    body += `${konten.graphics}`;
  }

  // body = body.replaceAll(`src="/images`, `src="./images`);

  body = body.replaceAll("&nbsp;", " ");

  const random_string = uuidv4();

  const args = [
    "-f",
    "html",
    "-t",
    "odt",
    "--template",
    "./template/final_template.opendocument",
    "-o",
    `./temp_odt/${random_string}.odt`,
    "-V",
    `task_title=${konten.task_title}`,
    "-V",
    `${konten.answer_type}`,
    "--resource-path",
    "./public",
    "-L",
    "./template/filter3.lua",
    "-L",
    "./template/replace.lua",
  ];

  if (konten.keep_order == "true") {
    args.push("-V");
    args.push("keep_order");
  }

  for (let i = 0; i < usia.length; i++) {
    args.push("-V");
    args.push(usia[i].usia);
  }
  for (let i = 0; i < kategori.length; i++) {
    args.push("-V");
    args.push(kategori[i].nama);
  }
  for (let i = 0; i < pembuat.length; i++) {
    args.push("-V");
    args.push(`authors=${pembuat[i].pembuat}`);
  }

  try {
    const res = await nodepandoc(body, args);
  } catch (err) {
    console.log(err);
  }

  const buffer = await fs.readFile(`./temp_odt/${random_string}.odt`);
  await fs.unlink(`./temp_odt/${random_string}.odt`);
  return buffer;
}

export async function getImage(id_soal_usulan: string) {
  const query =
    "select path,file_name from gambar_soal_usulan where id_soal_usulan=$1";
  const gambar = await runQuery(query, [id_soal_usulan]);
  const res = gambar.rows;
  for (let i = 0; i < res.length; i++) {
    const buffer = await fs.readFile(`./public${res[i].path}`);
    const base64 = buffer.toString("base64");
    res[i].path = base64;
  }
  return res;
}

export async function addReview(
  values: any,
  isItUpdate: boolean,
  id_user: number | undefined,
  id_soal_usulan: string
): Promise<void> {
  try {
    const {
      title,
      age,
      answer_type,
      keep_order,
      categories,
      body,
      question,
      answer_options,
      answer_explanation,
      this_is_if,
      this_is_ct,
      if_keywords,
      ct_keywords,
      wording_phrases,
      comments,
      graphics,
      authors,
    } = values;
    let query: string;
    if (isItUpdate == true) {
      query =
        "update review_nasional " +
        "set review=row($3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19) " +
        "where id_user=$1 and id_soal_usulan=$2";
    } else {
      query =
        "insert into review_nasional(id_user,id_soal_usulan,review) " +
        "values ($1,$2,row($3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19))";
    }

    const arr = convertToNull([
      id_user,
      id_soal_usulan,
      title,
      age,
      answer_type,
      keep_order,
      categories,
      body,
      question,
      answer_options,
      answer_explanation,
      this_is_if,
      this_is_ct,
      if_keywords,
      ct_keywords,
      wording_phrases,
      comments,
      graphics,
      authors,
    ]);

    const res = await runQuery(query, arr);

    if (res.rowCount == 0) {
      throw new Error();
    }
  } catch (e) {
    throw e;
  }
}

export async function addRating(
  values: any,
  nasional: boolean,
  id_rating?: number,
  id_user?: number | undefined,
  id_soal_usulan?: string
): Promise<void> {
  try {
    let query: string;
    let arr: any[];
    if (nasional == true) {
      if (id_rating) {
        const { rating_as_for_now, rating_potential } = values;
        query =
          "update rating_nasional set as_for_now=$1,potential=$2 where id_rating=$3";
        arr = [rating_as_for_now, rating_potential, id_rating];
      } else {
        const { rating_as_for_now, rating_potential } = values;

        query =
          "insert into rating_nasional(id_user,id_soal_usulan,as_for_now,potential,time_stamp) " +
          "values ($1,$2,$3,$4,now())";

        arr = [id_user, id_soal_usulan, rating_as_for_now, rating_potential];
      }
    } else {
      if (id_rating) {
        const { rating_as_for_now, rating_potential, nama } = values;

        query =
          "update rating_internasional_soal_usulan " +
          "set name=$1,as_for_now=$2,potential=$3 where id_rating_internasional=$4";

        arr = [nama, rating_as_for_now, rating_potential, id_rating];
      } else {
        const { rating_as_for_now, rating_potential, nama } = values;
        query =
          "insert into rating_internasional_soal_usulan(id_soal_usulan,name,as_for_now,potential) " +
          "values ($1,$2,$3,$4)";

        arr = [id_soal_usulan, nama, rating_as_for_now, rating_potential];
      }
    }

    const res = await runQuery(query, arr);
    if (res.rowCount == 0) {
      throw new Error();
    }
  } catch (e) {
    throw e;
  }
}

export async function addReviewInternational(
  file: string,
  id_soal_usulan: string
) {
  const hasilParse = JSON.parse(file);
  const buffer_file: Buffer = Buffer.from(hasilParse);

  const query =
    "update soal_usulan set review_internasional=$1 " +
    "where id_soal_usulan=$2";

  const arr = [buffer_file, id_soal_usulan];

  const res = await runQuery(query, arr);
  if (res.rowCount == 0) {
    throw new Error();
  }
}

export async function addSchedule(values: any) {
  const {
    deadline_tahap1,
    deadline_tahap2,
    deadline_tahap3,
    deadline_tahap4,
    deadline_tahap5,
    deadline_tahap6,
    deadline_tahap7,
  } = values;

  const client = await getClient();

  try {
    await client.query("BEGIN");
    const query =
      "update info_bebras " +
      "set deadline_tahap1=$1," +
      "deadline_tahap2=$2," +
      "deadline_tahap3=$3," +
      "deadline_tahap4=$4," +
      "deadline_tahap5=$5," +
      "deadline_tahap6=$6," +
      "deadline_tahap7=$7," +
      "tahap_sekarang=1";

    const res = await client.query(query, [
      deadline_tahap1,
      deadline_tahap2,
      deadline_tahap3,
      deadline_tahap4,
      deadline_tahap5,
      deadline_tahap6,
      deadline_tahap7,
    ]);

    if (res.rowCount == 0) {
      throw new Error();
    }

    const oneMinute = 60 * 1000;
    const startDeadlineTahap1 = new Date(deadline_tahap1.getTime() - oneMinute);
    const endDeadlineTahap1 = new Date(deadline_tahap1.getTime() + oneMinute);

    const startDeadlineTahap2 = new Date(deadline_tahap2.getTime() - oneMinute);
    const endDeadlineTahap2 = new Date(deadline_tahap2.getTime() + oneMinute);

    const startDeadlineTahap3 = new Date(deadline_tahap3.getTime() - oneMinute);
    const endDeadlineTahap3 = new Date(deadline_tahap3.getTime() + oneMinute);

    const startDeadlineTahap4 = new Date(deadline_tahap4.getTime() - oneMinute);
    const endDeadlineTahap4 = new Date(deadline_tahap4.getTime() + oneMinute);

    const startDeadlineTahap5 = new Date(deadline_tahap5.getTime() - oneMinute);
    const endDeadlineTahap5 = new Date(deadline_tahap5.getTime() + oneMinute);

    const startDeadlineTahap6 = new Date(deadline_tahap6.getTime() - oneMinute);
    const endDeadlineTahap6 = new Date(deadline_tahap6.getTime() + oneMinute);

    const startDeadlineTahap7 = new Date(deadline_tahap7.getTime() - oneMinute);
    const endDeadlineTahap7 = new Date(deadline_tahap7.getTime() + oneMinute);

    //deadline tahap1
    await client.query(
      "update pgagent.pga_schedule set jscstart=$1,jscend=$2 where jscname='SCHEDULE_PHASE2'",
      [startDeadlineTahap1, endDeadlineTahap1]
    );

    //deadline tahap2
    await client.query(
      "update pgagent.pga_schedule set jscstart=$1,jscend=$2 where jscname='SCHEDULE_PHASE3'",
      [startDeadlineTahap2, endDeadlineTahap2]
    );

    //deadline tahap3
    await client.query(
      "update pgagent.pga_schedule set jscstart=$1,jscend=$2 where jscname='SCHEDULE_PHASE4'",
      [startDeadlineTahap3, endDeadlineTahap3]
    );

    //deadline tahap4
    await client.query(
      "update pgagent.pga_schedule set jscstart=$1,jscend=$2 where jscname='SCHEDULE_PHASE5'",
      [startDeadlineTahap4, endDeadlineTahap4]
    );

    //deadline tahap5
    await client.query(
      "update pgagent.pga_schedule set jscstart=$1,jscend=$2 where jscname='SCHEDULE_PHASE6'",
      [startDeadlineTahap5, endDeadlineTahap5]
    );

    //deadline tahap6
    await client.query(
      "update pgagent.pga_schedule set jscstart=$1,jscend=$2 where jscname='SCHEDULE_PHASE7'",
      [startDeadlineTahap6, endDeadlineTahap6]
    );

    //deadline tahap7
    await client.query(
      "update pgagent.pga_schedule set jscstart=$1,jscend=$2 where jscname='SCHEDULE_PHASE0'",
      [startDeadlineTahap7, endDeadlineTahap7]
    );

    //pastiin waktu run deadline tahap1
    await client.query(
      "update pgagent.pga_job set jobnextrun=$1 where jobid=1",
      [deadline_tahap1]
    );
    //pastiin waktu run deadline tahap2
    await client.query(
      "update pgagent.pga_job set jobnextrun=$1 where jobid=2",
      [deadline_tahap2]
    );
    //pastiin waktu run deadline tahap3
    await client.query(
      "update pgagent.pga_job set jobnextrun=$1 where jobid=3",
      [deadline_tahap3]
    );
    //pastiin waktu run deadline tahap4
    await client.query(
      "update pgagent.pga_job set jobnextrun=$1 where jobid=4",
      [deadline_tahap4]
    );
    //pastiin waktu run deadline tahap5
    await client.query(
      "update pgagent.pga_job set jobnextrun=$1 where jobid=5",
      [deadline_tahap5]
    );
    //pastiin waktu run deadline tahap6
    await client.query(
      "update pgagent.pga_job set jobnextrun=$1 where jobid=6",
      [deadline_tahap6]
    );
    //pastiin waktu run deadline tahap7
    await client.query(
      "update pgagent.pga_job set jobnextrun=$1 where jobid=7",
      [deadline_tahap7]
    );

    await client.query("COMMIT");
    client.release();
  } catch (e) {
    await client.query("ROLLBACK");
    client.release();
    throw e;
  }
}

export async function login(values: any) {
  const { username, password } = values;
  if (
    typeof username !== "string" ||
    username.length < 5 ||
    username.length > 20
  ) {
    return {
      error: "Invalid username",
    };
  }
  // const password = formData.get("password");
  if (
    typeof password !== "string" ||
    password.length < 5 ||
    password.length > 10
  ) {
    return {
      error: "Invalid password",
    };
  }
  const query =
    "select id,hashedpassword,salt from user_bebras where username=$1";
  const existingUser = await runQuery(query, [username]);
  if (existingUser.rowCount == 0) {
    return {
      error: "Incorrect username or password",
    };
  }

  const validPassword =
    sha256(existingUser.rows[0].salt + password) ==
    existingUser.rows[0].hashedpassword;
  if (!validPassword) {
    return {
      error: "Incorrect username or password",
    };
  }

  const session = await lucia.createSession(existingUser.rows[0].id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return { error: null };
}

export async function signup(values: any): Promise<ActionResult> {
  const { username, password, retype_password, nama, email, biro, role } =
    values;
  // const username = formData.get("username");
  // username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
  // keep in mind some database (e.g. mysql) are case insensitive
  if (
    typeof username !== "string" ||
    username.length < 5 ||
    username.length > 20
  ) {
    return {
      error: "Invalid username",
    };
  }

  const queryExistUsername =
    "SELECT EXISTS(SELECT 1 FROM user_bebras WHERE username = $1)";
  const getExistUsername = await runQuery(queryExistUsername, [username]);
  const existUsername = getExistUsername.rows[0].exists;
  if (existUsername == true) {
    return {
      error: "This username is already taken. Please choose another one",
    };
  }
  // const password = formData.get("password");
  if (
    typeof password !== "string" ||
    password.length < 5 ||
    password.length > 10
  ) {
    return {
      error: "Invalid password",
    };
  }

  if (retype_password != password) {
    return {
      error: "Passwords do not match. Please try again!",
    };
  }

  if (typeof nama !== "string" || nama.length < 1 || nama.length > 50) {
    return {
      error: "Name is invalid",
    };
  }
  // const email = formData.get("email");

  if (
    typeof email !== "string" ||
    !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)
  ) {
    return {
      error: "Email is invalid",
    };
  }
  const salt = uuidv4();
  const passwordHash = sha256(salt + password);

  //   const userId = generateIdFromEntropySize(10); // 16 characters long

  // TODO: check if username is already used
  const query =
    "INSERT INTO user_bebras (username,salt,nama,role,email,hashedpassword,id_biro)";
  const query2 = " VALUES ($1,$2,$3,$4,$5,$6,$7) returning id";
  const res = await runQuery(query + query2, [
    username,
    salt,
    nama,
    role,
    email,
    passwordHash,
    biro,
  ]);
  const userId = res.rows[0].id;

  const session = await lucia.createSession(userId, {});

  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return {
    error: null,
  };
}

export async function checkUsername(username: string) {
  const query = "SELECT EXISTS(SELECT 1 FROM user_bebras WHERE username = $1)";
  const res = await runQuery(query, [username]);
  const rows = res.rows;
  return rows;
}

export async function changeFieldTerpilih(value: boolean, kode_soal: string) {
  const query = "update bank_soal set terpilih=$1 where kode_soal=$2 ";
  const res = await runQuery(query, [value, kode_soal]);
  if (res.rowCount == 0) {
    throw new Error();
  }
}

export async function changeFieldBestTask(value: boolean, kode_soal: string) {
  const query = "update bank_soal set best_task=$1 where kode_soal=$2 ";
  const res = await runQuery(query, [value, kode_soal]);
  if (res.rowCount == 0) {
    throw new Error();
  }
}

export async function changeRatingNasional(newRate: number, kode_soal: string) {
  const query = "update bank_soal set rating_nasional=$1 where kode_soal=$2";
  const res = await runQuery(query, [newRate, kode_soal]);
  if (res.rowCount == 0) {
    throw new Error();
  }
}

export async function addTask(
  values: ValuesFormAddTask,
  id_user: number | undefined
): Promise<void> {
  const client = await getClient();
  try {
    const title = values.title;
    const keep_order = `${values.keep_order}`;

    const imagePaths = values.imagePaths;
    const body = values.body;
    const question = values.question;
    const answer_options = values.answer_options;
    const answer_explanation = values.answer_explanation;
    const this_is_if = values.this_is_if;
    const this_is_ct = values.this_is_ct;
    const if_keywords = values.if_keywords;
    const ct_keywords = values.ct_keywords;
    const wording_phrases =
      values.wording_phrases == "" ? null : values.wording_phrases;
    const comments = values.comments == "" ? null : values.comments;
    const graphics = values.graphics == "" ? null : values.graphics;

    const tahun = new Date().getFullYear();
    const answer_type = values.answer_type;

    const categories = values.categories;
    const authors = values.authors_peran;
    const age = values.age_diff;

    await client.query("BEGIN");

    //cari biro dari main author
    let idUserForMainAuthor = null;
    for (let i = 0; i < authors.length; i++) {
      if (authors[i].main == true) {
        idUserForMainAuthor = authors[i].authors;
      }
    }
    const queryBiroMainAuthor = "select id_biro from user_bebras where id=$1";
    const getBiroMainAuthor = await client.query(queryBiroMainAuthor, [
      idUserForMainAuthor,
    ]);
    const idBiroMainAuthor = getBiroMainAuthor.rows[0].id_biro;

    // tambah add task
    const queryAddTask =
      "insert into soal_usulan(uploader,who_last_updated,soal,last_updated,tahun,status_nasional,biro) " +
      "VALUES ($16,$17,ROW($1,null,$2,$3,null,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,null),now(),$15,'SUBMITTED',$18) returning id_soal_usulan;";

    const hasilAddTask = await client.query(queryAddTask, [
      title,
      answer_type,
      keep_order,
      body,
      question,
      answer_options,
      answer_explanation,
      this_is_if,
      this_is_ct,
      if_keywords,
      ct_keywords,
      wording_phrases,
      comments,
      graphics,
      tahun,
      id_user,
      id_user,
      idBiroMainAuthor,
    ]);

    // tambah kategori
    const id_soal_usulan = hasilAddTask.rows[0].id_soal_usulan;
    let queryKategori =
      "insert into categories_soal_usulan(id_soal_usulan,id_categories) VALUES";

    let angka = 1;
    const arrKategori = [];
    for (let i = 0; i < categories.length; i++) {
      if (i != categories.length - 1) {
        queryKategori += `($${angka},$${angka + 1}),`;
      } else {
        queryKategori += `($${angka},$${angka + 1});`;
      }
      angka += 2;
      arrKategori.push(id_soal_usulan, categories[i]);
    }

    await client.query(queryKategori, arrKategori);

    // tambah pembuat soal

    let queryPembuatSoal =
      "insert into pembuat_soal_usulan(id_user,id_soal_usulan,peran,main) VALUES";
    const arrPembuatSoal = [];
    angka = 1;
    for (let i = 0; i < authors.length; i++) {
      if (i != authors.length - 1) {
        queryPembuatSoal += `($${angka},$${angka + 1},$${angka + 2},$${
          angka + 3
        }),`;
      } else {
        queryPembuatSoal += `($${angka},$${angka + 1},$${angka + 2},$${
          angka + 3
        });`;
      }
      angka += 4;
      arrPembuatSoal.push(
        authors[i].authors,
        id_soal_usulan,
        authors[i].peran,
        authors[i].main
      );
    }
    console.log(arrPembuatSoal);
    await client.query(queryPembuatSoal, arrPembuatSoal);
    // tambah usia dari target soal

    let queryAge =
      "insert into usia_soal_usulan(id_soal_usulan,id_usia,difficulty) VALUES";
    const arrAge = [];
    angka = 1;
    for (let i = 0; i < age.length; i++) {
      if (i != age.length - 1) {
        queryAge += `($${angka},$${angka + 1},$${angka + 2}),`;
      } else {
        queryAge += `($${angka},$${angka + 1},$${angka + 2});`;
      }
      angka += 3;
      arrAge.push(id_soal_usulan, age[i].age, age[i].diff);
    }

    await client.query(queryAge, arrAge);

    angka = 1;
    let queryGambarUsulan =
      "insert into gambar_soal_usulan(id_soal_usulan,path,file_name) VALUES";
    const arrGambarUsulan = [];
    for (let i = 0; i < imagePaths.length; i++) {
      if (i != imagePaths.length - 1) {
        queryGambarUsulan += `($${angka},$${angka + 1},$${angka + 2}),`;
      } else {
        queryGambarUsulan += `($${angka},$${angka + 1},$${angka + 2})`;
      }
      angka += 3;
      arrGambarUsulan.push(
        id_soal_usulan,
        imagePaths[i].path,
        imagePaths[i].fileName
      );
    }
    if (imagePaths.length != 0) {
      await client.query(queryGambarUsulan, arrGambarUsulan);
    }
    await client.query("COMMIT");
    client.release();
  } catch (e) {
    await client.query("ROLLBACK");
    client.release();

    throw e;
  }
}

export async function updateTask(
  values: ValuesFormAddTask,
  id_user: number | undefined,
  id_soal_usulan: string | undefined
): Promise<void> {
  const client = await getClient();
  try {
    const title = values.title;
    const keep_order = `${values.keep_order}`;

    const imagePaths = values.imagePaths;
    const body = values.body;
    const question = values.question;
    const answer_options = values.answer_options;
    const answer_explanation = values.answer_explanation;
    const this_is_if = values.this_is_if;
    const this_is_ct = values.this_is_ct;
    const if_keywords = values.if_keywords;
    const ct_keywords = values.ct_keywords;
    const wording_phrases =
      values.wording_phrases == "" ? null : values.wording_phrases;
    const comments = values.comments == "" ? null : values.comments;
    const graphics = values.graphics == "" ? null : values.graphics;

    const answer_type = values.answer_type;

    const categories = values.categories;
    const authors = values.authors_peran;
    const age = values.age_diff;

    await client.query("BEGIN");

    //cari biro dari main author
    let idUserForMainAuthor = null;
    for (let i = 0; i < authors.length; i++) {
      if (authors[i].main == true) {
        idUserForMainAuthor = authors[i].authors;
      }
    }
    const queryBiroMainAuthor = "select id_biro from user_bebras where id=$1";
    const getBiroMainAuthor = await client.query(queryBiroMainAuthor, [
      idUserForMainAuthor,
    ]);
    const idBiroMainAuthor = getBiroMainAuthor.rows[0].id_biro;

    // tambah add task
    const queryUpdateTask =
      "update soal_usulan " +
      "set who_last_updated=$15,soal=ROW($1,null,$2,$3,null,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,null),last_updated=now(),biro=$17 " +
      "where id_soal_usulan=$16";

    await client.query(queryUpdateTask, [
      title,
      answer_type,
      keep_order,
      body,
      question,
      answer_options,
      answer_explanation,
      this_is_if,
      this_is_ct,
      if_keywords,
      ct_keywords,
      wording_phrases,
      comments,
      graphics,
      id_user,
      id_soal_usulan,
      idBiroMainAuthor,
    ]);

    // tambah kategori
    if (id_soal_usulan) {
      await client.query(
        "delete from categories_soal_usulan where id_soal_usulan=$1",
        [id_soal_usulan]
      );
    }
    let queryKategori =
      "insert into categories_soal_usulan(id_soal_usulan,id_categories) VALUES";

    let angka = 1;
    const arrKategori = [];
    for (let i = 0; i < categories.length; i++) {
      if (i != categories.length - 1) {
        queryKategori += `($${angka},$${angka + 1}),`;
      } else {
        queryKategori += `($${angka},$${angka + 1});`;
      }
      angka += 2;
      arrKategori.push(id_soal_usulan, categories[i]);
    }

    await client.query(queryKategori, arrKategori);

    // tambah pembuat soal
    if (id_soal_usulan) {
      await client.query(
        "delete from pembuat_soal_usulan where id_soal_usulan=$1",
        [id_soal_usulan]
      );
    }
    let queryPembuatSoal =
      "insert into pembuat_soal_usulan(id_user,id_soal_usulan,peran,main) VALUES";
    const arrPembuatSoal = [];
    angka = 1;
    for (let i = 0; i < authors.length; i++) {
      if (i != authors.length - 1) {
        queryPembuatSoal += `($${angka},$${angka + 1},$${angka + 2},$${
          angka + 3
        }),`;
      } else {
        queryPembuatSoal += `($${angka},$${angka + 1},$${angka + 2},$${
          angka + 3
        });`;
      }
      angka += 4;
      arrPembuatSoal.push(
        authors[i].authors,
        id_soal_usulan,
        authors[i].peran,
        authors[i].main
      );
    }

    await client.query(queryPembuatSoal, arrPembuatSoal);
    // tambah usia dari target soal
    if (id_soal_usulan) {
      await client.query(
        "delete from usia_soal_usulan where id_soal_usulan=$1",
        [id_soal_usulan]
      );
    }
    let queryAge =
      "insert into usia_soal_usulan(id_soal_usulan,id_usia,difficulty) VALUES";
    const arrAge = [];
    angka = 1;
    for (let i = 0; i < age.length; i++) {
      if (i != age.length - 1) {
        queryAge += `($${angka},$${angka + 1},$${angka + 2}),`;
      } else {
        queryAge += `($${angka},$${angka + 1},$${angka + 2});`;
      }
      angka += 3;
      arrAge.push(id_soal_usulan, age[i].age, age[i].diff);
    }

    await client.query(queryAge, arrAge);

    if (id_soal_usulan) {
      await client.query(
        "delete from gambar_soal_usulan where id_soal_usulan=$1",
        [id_soal_usulan]
      );
    }

    angka = 1;
    let queryGambarUsulan =
      "insert into gambar_soal_usulan(id_soal_usulan,path,file_name) VALUES";
    const arrGambarUsulan = [];
    for (let i = 0; i < imagePaths.length; i++) {
      if (i != imagePaths.length - 1) {
        queryGambarUsulan += `($${angka},$${angka + 1},$${angka + 2}),`;
      } else {
        queryGambarUsulan += `($${angka},$${angka + 1},$${angka + 2})`;
      }
      angka += 3;
      arrGambarUsulan.push(
        id_soal_usulan,
        imagePaths[i].path,
        imagePaths[i].fileName
      );
    }
    if (imagePaths.length != 0) {
      await client.query(queryGambarUsulan, arrGambarUsulan);
    }
    await client.query("COMMIT");
    client.release();
  } catch (e) {
    await client.query("ROLLBACK");
    client.release();

    throw e;
  }
}

export async function addBankSoal(values: any) {
  const {
    kode_soal,
    tahun,
    answer_type,
    rating_nasional,
    rating_internasional,
    best_task,
    kode_negara,
    terpilih,
    authors,
    keep_order,
    comments,
    graphics,
    age_diff,
    categories,
    imagePaths,
  } = values;
  const {
    task_title_id,
    task_title_en,
    body_id,
    body_en,
    question_id,
    question_en,
    answer_options_id,
    answer_options_en,
    answer_explanation_id,
    answer_explanation_en,
    this_is_if_id,
    this_is_if_en,
    this_is_ct_id,
    this_is_ct_en,
    if_keywords_id,
    if_keywords_en,
    ct_keywords_id,
    ct_keywords_en,
    wording_phrases_id,
    wording_phrases_en,
  } = values;

  const client = await getClient();
  try {
    await client.query("BEGIN");
    const query =
      "insert into bank_soal" +
      "(kode_soal,tahun,answer_type,rating_nasional,rating_internasional,best_task,kode_negara,terpilih,authors,keep_order,comments,graphics,versi_indonesia,versi_inggris)" +
      " VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,row($13,null,null,null,null,$14,$15,$16,$17,$18,$19,$20,$21,$22,null,null,null),row($23,null,null,null,null,$24,$25,$26,$27,$28,$29,$30,$31,$32,null,null,null)) returning id_bank_soal";
    //task title,body,question,answer_options,answer_explanation,this_is_if,this_is_ct,if_keywords,ct_keywords,wording_phrases
    const arr = convertToNull([
      kode_soal,
      tahun,
      answer_type,
      rating_nasional,
      rating_internasional,
      best_task,
      kode_negara,
      terpilih,
      authors,
      keep_order,
      comments,
      graphics,
      task_title_id,
      body_id,
      question_id,
      answer_options_id,
      answer_explanation_id,
      this_is_if_id,
      this_is_ct_id,
      if_keywords_id,
      ct_keywords_id,
      wording_phrases_id,
      task_title_en,
      body_en,
      question_en,
      answer_options_en,
      answer_explanation_en,
      this_is_if_en,
      this_is_ct_en,
      if_keywords_en,
      ct_keywords_en,
      wording_phrases_en,
    ]);

    const res = await client.query(query, arr);
    const return_id_bank_soal = res.rows[0].id_bank_soal;

    let queryKategori =
      "insert into categories_bank_soal(id_bank_soal,id_categories) VALUES ";
    const arrKategori = [];
    let counter = 1;
    for (let i = 0; i < categories.length; i++) {
      if (i != categories.length - 1) {
        queryKategori += `($${counter},$${counter + 1}),`;
      } else {
        queryKategori += `($${counter},$${counter + 1})`;
      }

      arrKategori.push(return_id_bank_soal, categories[i]);
      counter += 2;
    }

    await client.query(queryKategori, arrKategori);

    counter = 1;
    let queryUsia =
      "insert into usia_bank_soal(id_bank_soal,id_usia,difficulty) values ";
    const arrUsia = [];
    for (let i = 0; i < age_diff.length; i++) {
      if (i != age_diff.length - 1) {
        queryUsia += `($${counter},$${counter + 1},$${counter + 2}),`;
      } else {
        queryUsia += `($${counter},$${counter + 1},$${counter + 2})`;
      }
      arrUsia.push(return_id_bank_soal, age_diff[i].age, age_diff[i].diff);
      counter += 3;
    }
    await client.query(queryUsia, arrUsia);

    counter = 1;
    let queryGambarBankSoal =
      "insert into gambar_bank_soal(id_bank_soal,path,file_name) VALUES";
    const arrGambarBankSoal = [];
    for (let i = 0; i < imagePaths.length; i++) {
      if (i != imagePaths.length - 1) {
        queryGambarBankSoal += `($${counter},$${counter + 1},$${counter + 2}),`;
      } else {
        queryGambarBankSoal += `($${counter},$${counter + 1},$${counter + 2})`;
      }
      counter += 3;
      arrGambarBankSoal.push(
        return_id_bank_soal,
        imagePaths[i].path,
        imagePaths[i].fileName
      );
    }
    if (imagePaths.length != 0) {
      await client.query(queryGambarBankSoal, arrGambarBankSoal);
    }

    await client.query("COMMIT");
    client.release();
  } catch (e) {
    await client.query("ROLLBACK");
    client.release();
    throw e;
  }
}

export async function checkKodeSoal(kode_soal: string, id_bank_soal?: string) {
  let query: string;
  let arr: any[];
  if (id_bank_soal) {
    query =
      "SELECT EXISTS(SELECT 1 FROM bank_soal WHERE id_bank_soal!=$1 and kode_soal ILIKE $2)";
    arr = [id_bank_soal, kode_soal];
  } else {
    query = "SELECT EXISTS(SELECT 1 FROM bank_soal WHERE kode_soal ILIKE $1)";
    arr = [kode_soal];
  }
  const res = await runQuery(query, arr);
  const rows = res.rows;

  return rows;
}

export async function updateBankSoal(
  values: any,
  id_bank_soal: string | undefined
) {
  const {
    kode_soal,
    tahun,
    answer_type,
    rating_nasional,
    rating_internasional,
    best_task,
    kode_negara,
    terpilih,
    authors,
    keep_order,
    comments,
    graphics,
    age_diff,
    categories,
  } = values;
  const {
    task_title_id,
    task_title_en,
    body_id,
    body_en,
    question_id,
    question_en,
    answer_options_id,
    answer_options_en,
    answer_explanation_id,
    answer_explanation_en,
    this_is_if_id,
    this_is_if_en,
    this_is_ct_id,
    this_is_ct_en,
    if_keywords_id,
    if_keywords_en,
    ct_keywords_id,
    ct_keywords_en,
    wording_phrases_id,
    wording_phrases_en,
    imagePaths,
  } = values;

  const client = await getClient();
  try {
    await client.query("BEGIN");
    const query =
      "update bank_soal " +
      "set tahun=$1," +
      "answer_type=$2," +
      "rating_nasional=$3," +
      "rating_internasional=$4," +
      "best_task=$5," +
      "kode_negara=$6," +
      "terpilih=$7," +
      "authors=$8," +
      "keep_order=$9," +
      "comments=$10," +
      "graphics=$11," +
      "versi_indonesia=row($12,null,null,null,null,$13,$14,$15,$16,$17,$18,$19,$20,$21,null,null,null)," +
      "versi_inggris=row($22,null,null,null,null,$23,$24,$25,$26,$27,$28,$29,$30,$31,null,null,null)," +
      "kode_soal=$32 " +
      "where id_bank_soal=$33";
    //task title,body,question,answer_options,answer_explanation,this_is_if,this_is_ct,if_keywords,ct_keywords,wording_phrases
    const arr = convertToNull([
      tahun,
      answer_type,
      rating_nasional,
      rating_internasional,
      best_task,
      kode_negara,
      terpilih,
      authors,
      keep_order,
      comments,
      graphics,
      task_title_id,
      body_id,
      question_id,
      answer_options_id,
      answer_explanation_id,
      this_is_if_id,
      this_is_ct_id,
      if_keywords_id,
      ct_keywords_id,
      wording_phrases_id,
      task_title_en,
      body_en,
      question_en,
      answer_options_en,
      answer_explanation_en,
      this_is_if_en,
      this_is_ct_en,
      if_keywords_en,
      ct_keywords_en,
      wording_phrases_en,
      kode_soal,
      id_bank_soal,
    ]);

    await client.query(query, arr);

    if (id_bank_soal) {
      await client.query(
        "delete from categories_bank_soal where id_bank_soal=$1",
        [id_bank_soal]
      );
    }

    let queryKategori =
      "insert into categories_bank_soal(id_bank_soal,id_categories) VALUES ";
    const arrKategori = [];
    let counter = 1;
    for (let i = 0; i < categories.length; i++) {
      if (i != categories.length - 1) {
        queryKategori += `($${counter},$${counter + 1}),`;
      } else {
        queryKategori += `($${counter},$${counter + 1})`;
      }

      arrKategori.push(id_bank_soal, categories[i]);
      counter += 2;
    }

    await client.query(queryKategori, arrKategori);

    if (id_bank_soal) {
      await client.query("delete from usia_bank_soal where id_bank_soal=$1", [
        id_bank_soal,
      ]);
    }

    counter = 1;
    let queryUsia =
      "insert into usia_bank_soal(id_bank_soal,id_usia,difficulty) values ";
    const arrUsia = [];
    for (let i = 0; i < age_diff.length; i++) {
      if (i != age_diff.length - 1) {
        queryUsia += `($${counter},$${counter + 1},$${counter + 2}),`;
      } else {
        queryUsia += `($${counter},$${counter + 1},$${counter + 2})`;
      }
      arrUsia.push(id_bank_soal, age_diff[i].age, age_diff[i].diff);
      counter += 3;
    }
    await client.query(queryUsia, arrUsia);

    if (id_bank_soal) {
      await client.query("delete from gambar_bank_soal where id_bank_soal=$1", [
        id_bank_soal,
      ]);
    }
    counter = 1;
    let queryGambarBankSoal =
      "insert into gambar_bank_soal(id_bank_soal,path,file_name) VALUES";
    const arrGambarBankSoal = [];
    for (let i = 0; i < imagePaths.length; i++) {
      if (i != imagePaths.length - 1) {
        queryGambarBankSoal += `($${counter},$${counter + 1},$${counter + 2}),`;
      } else {
        queryGambarBankSoal += `($${counter},$${counter + 1},$${counter + 2})`;
      }
      counter += 3;
      arrGambarBankSoal.push(
        id_bank_soal,
        imagePaths[i].path,
        imagePaths[i].fileName
      );
    }
    if (imagePaths.length != 0) {
      await client.query(queryGambarBankSoal, arrGambarBankSoal);
    }

    await client.query("COMMIT");
    client.release();
  } catch (e) {
    await client.query("ROLLBACK");
    client.release();
    throw e;
  }
}

export async function addCategories(categoriesName: string) {
  const query = "insert into categories(nama) VALUES ($1)";
  await runQuery(query, [categoriesName]);
}

export async function updateCategories(id_categories: number, newName: string) {
  const query = "update categories set nama=$1 where id_categories=$2";
  await runQuery(query, [newName, id_categories]);
}

export async function addUsia(from_age: number, to_age: number) {
  const query = "insert into usia(from_age,to_age) VALUES ($1,$2)";
  await runQuery(query, [from_age, to_age]);
}

export async function updateUsia(
  id_usia: number,
  from_age: number,
  to_age: number
) {
  const query = "update usia set from_age=$1,to_age=$2 where id_usia=$3";
  await runQuery(query, [from_age, to_age, id_usia]);
}

export async function addNegara(newCode: string, newCountries: string) {
  const query = "insert into negara(kode_negara,nama) VALUES ($1,$2)";
  await runQuery(query, [newCode, newCountries]);
}

export async function updateNegara(kode_negara: string, newName: string) {
  const query = "update negara set nama=$1 where kode_negara=$2";
  await runQuery(query, [newName, kode_negara]);
}

export async function checkKodeNegara(kode_negara: string) {
  const query = "SELECT EXISTS(SELECT 1 FROM negara WHERE kode_negara = $1)";
  const res = await runQuery(query, [kode_negara]);
  const rows = res.rows;
  return rows;
}

export async function changeUsername(newUsername: string, id_user: number) {
  const query = "update user_bebras set username=$1 where id=$2";

  const res = await runQuery(query, [newUsername, id_user]);
  if (res.rowCount == 0) {
    throw new Error();
  }
}

export async function changeName(newName: string, id_user: number) {
  const query = "update user_bebras set nama=$1 where id=$2";

  const res = await runQuery(query, [newName, id_user]);
  if (res.rowCount == 0) {
    throw new Error();
  }
}

export async function changeEmail(newEmail: string, id_user: number) {
  const query = "update user_bebras set email=$1 where id=$2";

  const res = await runQuery(query, [newEmail, id_user]);
  if (res.rowCount == 0) {
    throw new Error();
  }
}

export async function changeBiro(id_biro: number, id_user: number) {
  const query = "update user_bebras set id_biro=$1 where id=$2";

  const res = await runQuery(query, [id_biro, id_user]);
  if (res.rowCount == 0) {
    throw new Error();
  }
}

export async function checkPassword(pass: string, id_user: number) {
  if (pass.length < 5 || pass.length > 10) {
    return false;
  }
  const query = "select salt,hashedpassword from user_bebras where id=$1";
  const res = await runQuery(query, [id_user]);
  const data = res.rows[0];
  const salt = data.salt;
  const hashedpassword = data.hashedpassword;
  const hashedInputPass = sha256(salt + pass);
  if (hashedInputPass == hashedpassword) {
    return true;
  } else {
    return false;
  }
}

export async function updatePassword(newPass: string, id_user: number) {
  const salt = uuidv4();
  const hashedpassword = sha256(salt + newPass);

  const query = "update user_bebras set salt=$1,hashedpassword=$2 where id=$3";
  await runQuery(query, [salt, hashedpassword, id_user]);
}

export async function AddArchiveToPengajuan(
  arr_id: React.Key[],
  toArchive: boolean
) {
  for (let i = 0; i < arr_id.length; i++) {
    let query;
    if (toArchive == false) {
      query =
        "update soal_usulan set status_nasional='ADDED FROM ARCHIVE',archived=false,gotointernational=true where id_soal_usulan=$1";
    } else {
      query =
        "update soal_usulan set status_nasional='ACCEPTED',archived=true,gotointernational=false where id_soal_usulan=$1";
    }
    const id_soal_usulan = arr_id[i];
    if (typeof id_soal_usulan != "bigint") {
      const res = await runQuery(query, [id_soal_usulan]);
      if (res.rowCount == 0) {
        throw new Error();
      }
    }
  }
}
