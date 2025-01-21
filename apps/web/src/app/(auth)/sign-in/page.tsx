import { getPageTitle } from "@/utils/metadata";
import { Metadata } from "next";
import { SignInForm } from "./_components/SignInForm";

export const metadata: Metadata = {
  title: getPageTitle("Entrar"),
};

const Page = () => <SignInForm />;

export default Page;
