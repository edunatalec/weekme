import { RoleSearchModule } from "@/app/admin/roles/_components/RoleSearchModule";
import { getPageTitle } from "@/utils/metadata";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: getPageTitle("Cargos"),
};

const Page = () => <RoleSearchModule />;

export default Page;
