import { PermissionForm } from "@/app/admin/permissions/_components/PermissionForm";
import { getById } from "@/services/crud/service";
import { getPageTitle } from "@/utils/metadata";
import { PermissionEntity, ProtectedResource } from "@repo/core";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: getPageTitle("Editar permissão"),
};

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: Props) => {
  const { id } = await params;

  const permission = await getById<PermissionEntity>({
    id,
    resource: ProtectedResource.PERMISSIONS,
  });

  return <PermissionForm permission={permission} />;
};

export default Page;
