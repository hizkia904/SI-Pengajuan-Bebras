import { validateRequest } from "../auth";
import ProLayoutComp from "../components/ProLayoutComp";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();

  return (
    <ProLayoutComp
      content={children}
      username={user?.username}
      role={user?.role}
    />
  );
}
