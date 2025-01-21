import { ForgotPasswordForm } from "@/app/(auth)/forgot-password/_components/ForgotPasswordForm";
import { getPageTitle } from "@/utils/metadata";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: getPageTitle("Esqueci minha senha"),
};

const Page = () => <ForgotPasswordForm />;

export default Page;
