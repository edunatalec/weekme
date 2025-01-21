import { getPageTitle } from "@/utils/metadata";
import { Metadata } from "next";
import { SignUpForm } from "./_components/SignUpForm";

export const metadata: Metadata = {
  title: getPageTitle("Cadastrar"),
};

const Page = () => <SignUpForm />;

export default Page;
