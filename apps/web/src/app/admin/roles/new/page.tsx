import { RoleForm } from "@/app/admin/roles/_components/RoleForm";
import { getPageTitle } from "@/utils/metadata";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: getPageTitle("Cadastrar cargo"),
};

const Page = () => <RoleForm />;

export default Page;
