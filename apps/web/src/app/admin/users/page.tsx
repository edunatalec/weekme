import { UserSearchModule } from "@/app/admin/users/_components/UserSearchModule";
import { getPageTitle } from "@/utils/metadata";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: getPageTitle("Usuários"),
};

const Page = () => <UserSearchModule />;

export default Page;
