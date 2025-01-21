import { SeasonSearchModule } from "@/app/admin/seasons/_components/SeasonSearchModule";
import { getPageTitle } from "@/utils/metadata";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: getPageTitle("Temporadas"),
};

const Page = () => <SeasonSearchModule />;

export default Page;
