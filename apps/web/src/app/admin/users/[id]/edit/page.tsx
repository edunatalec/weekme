import { UserForm } from "@/app/admin/users/_components/UserForm";
import { getById } from "@/services/crud/service";
import { getPageTitle } from "@/utils/metadata";
import { ProtectedResource, UserEntity } from "@repo/core";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: getPageTitle("Editar usuário"),
};

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: Props) => {
  const { id } = await params;

  const user = await getById<UserEntity>({
    id,
    resource: ProtectedResource.USERS,
  });

  return <UserForm user={user} />;
};

export default Page;
