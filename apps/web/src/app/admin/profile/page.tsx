import { ProfileForm } from "@/app/admin/profile/_components/ProfileForm";
import { getPageTitle } from "@/utils/metadata";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: getPageTitle("Perfil"),
};

const Page = () => {
  return (
    <div className="flex h-full flex-col gap-4 p-4 pt-[4.5rem] md:pt-4">
      <h1 className="text-3xl">Seu perfil</h1>

      <ProfileForm />
    </div>
  );
};

export default Page;
