import { AnimeSearchModule } from "@/app/admin/animes/_components/AnimeSearchModule";
import { getPageTitle } from "@/utils/metadata";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: getPageTitle("Animes"),
};

const Page = () => <AnimeSearchModule />;

export default Page;
