import { AuthLink } from "@/app/(auth)/_components/AuthLink";
import { AuthForm } from "../_components/AuthForm";
import { SignUpForm } from "./_components/SignUpForm";
import { Metadata } from "next";
import { getPageTitle } from "@/utils/metadata";

export const metadata: Metadata = {
  title: getPageTitle("Cadastrar"),
};

const Page = () => {
  return (
    <AuthForm
      hasLogo
      title="Junte-se ao WeekMe!"
      subtitle="Crie sua conta e seja parte da comunidade otaku que vive e respira animes. Descubra, organize e contribua com o calendário definitivo de animes!"
      footer={[
        "Já tem uma conta? ",
        <AuthLink key="/sign-in" href="/sign-in" text="Faça o login" />,

        " agora e continue sua jornada no universo dos animes!",
      ]}
    >
      <SignUpForm />
    </AuthForm>
  );
};

export default Page;
