import { ResetPasswordForm } from "@/app/(auth)/forgot-password/[hash]/reset/_components/ResetPasswordForm";
import { getPageTitle } from "@/utils/metadata";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: getPageTitle("Resetar a senha"),
};

const Page = () => <ResetPasswordForm />;

export default Page;
