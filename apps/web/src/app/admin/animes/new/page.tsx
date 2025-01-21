import { AnimeForm } from "@/app/admin/animes/_components/AnimeForm";
import { getPageTitle } from "@/utils/metadata";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: getPageTitle("Cadastrar anime"),
};

const Page = () => <AnimeForm />;

export default Page;
