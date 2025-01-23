import { ProfilePage } from "@/app/admin/profile/_components/ProfilePage";
import { getPageTitle } from "@/utils/metadata";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: getPageTitle("Perfil"),
};

const Page = () => <ProfilePage />;

export default Page;
