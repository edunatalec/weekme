import { PermissionSeachModule } from "@/app/admin/permissions/_components/PermissionSeachModule";
import { getPageTitle } from "@/utils/metadata";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: getPageTitle("Permissões"),
};

const Page = () => <PermissionSeachModule />;

export default Page;
