import { RoleForm } from "@/app/admin/roles/_components/RoleForm";
import { getById } from "@/services/crud/service";
import { getPageTitle } from "@/utils/metadata";
import { ProtectedResource, RoleEntity } from "@repo/core";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: getPageTitle("Editar cargo"),
};

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: Props) => {
  const { id } = await params;

  const role = await getById<RoleEntity>({
    id,
    resource: ProtectedResource.ROLES,
  });

  return <RoleForm role={role} />;
};

export default Page;
