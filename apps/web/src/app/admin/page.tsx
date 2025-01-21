import { HomeMenus } from "@/app/admin/_components/HomeMenus";
import { getPageTitle } from "@/utils/metadata";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: getPageTitle("Admin"),
};

const Page = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <h1 className="text-center text-3xl">
        Seja bem vindo ao painel
        <br />
        admin do WeekMe
      </h1>

      <HomeMenus />
    </div>
  );
};

export default Page;
