import { validateRequest } from "../auth";
import { runQuery } from "../db";
import ErrorResult from "./ErrorResult";
import ProfileClient from "./ProfileClient";

export default async function ProfileServer() {
  const { user } = await validateRequest();
  if (user == null) {
    return <p>...</p>;
  }
  const id_user = user.id;
  let userData: any | null;
  try {
    const queryUserData =
      "select username,ketua,user_bebras.nama,email,biro.nama as nama_biro,role,user_bebras.id_biro from user_bebras inner join " +
      "biro on biro.id_biro = user_bebras.id_biro where id=$1";
    let getUserData;
    if (id_user) {
      getUserData = await runQuery(queryUserData, [id_user]);
    }
    userData = getUserData?.rows[0];
  } catch (e) {
    userData = null;
  }
  return userData != null ? (
    <ProfileClient userData={userData} id_user={id_user} />
  ) : (
    <ErrorResult subtitle="Unabled to display user data" />
  );
}
