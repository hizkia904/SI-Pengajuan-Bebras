import { runQuery } from "../db";
import DownloadFloatButton from "./DownloadFloatButton";

export default async function Download({
  id_soal_usulan,
}: {
  id_soal_usulan: string;
}) {
  let title: string | null;
  try {
    const query =
      "select (soal).task_title from soal_usulan where id_soal_usulan=$1";
    const getTitle = await runQuery(query, [id_soal_usulan]);
    title = getTitle.rows[0].task_title;
  } catch (e) {
    title = null;
  }

  return typeof title == "string" ? (
    <DownloadFloatButton title={title} id_soal_usulan={id_soal_usulan} />
  ) : undefined;
}
