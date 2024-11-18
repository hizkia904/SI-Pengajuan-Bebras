import { validateRequest } from "@/app/auth";
import ErrorResult from "@/app/components/ErrorResult";
import TableNegara from "@/app/components/TableNegara";
import TableUser from "@/app/components/TableUser";
import { runQuery } from "@/app/db";

export default async function Page() {
  let user: any[] | null;
  let biro: any[] | null;

  const { user: userSession } = await validateRequest();
  if (userSession == null) {
    return <p>Belum Login</p>;
  }
  const id_user = userSession.id;

  try {
    const queryUser =
      "select id,username,ketua,role,id_biro from user_bebras where id!=$1 order by id";
    const getUser = await runQuery(queryUser, [id_user]);
    user = getUser.rows;

    const queryBiro =
      "select id_biro as value,nama as label from biro order by id_biro";
    const getBiro = await runQuery(queryBiro, []);
    biro = getBiro.rows;
  } catch (e) {
    user = null;
    biro = null;
  }
  return user != null && biro != null ? (
    <TableUser dataSource={user} biro={biro} />
  ) : (
    <ErrorResult subtitle="Unabled to display user" />
  );
}
