import { SeasonsForm } from "@/app/admin/seasons/_components/SeasonsForm";
import { getPageTitle } from "@/utils/metadata";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: getPageTitle("Cadastrar temporada"),
};

const Page = () => <SeasonsForm />;

export default Page;
