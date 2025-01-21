import { AuthForm } from "@/app/(auth)/_components/AuthForm";
import { AuthLink } from "@/app/(auth)/_components/AuthLink";
import { SignInForm } from "./_components/SignInForm";
import { Metadata } from "next";
import { getPageTitle } from "@/utils/metadata";

export const metadata: Metadata = {
  title: getPageTitle("Entrar"),
};

const Page = () => {
  return (
    <AuthForm
      hasLogo
      title="Seja bem-vindo ao WeekMe!"
      subtitle="Faça login e compartilhe suas paixões com a comunidade otaku. Juntos, construímos o calendário definitivo de animes."
      footer={[
        "Ainda não tem uma conta? ",
        <AuthLink key="/sign-up" href="/sign-up" text="Cadastre-se" />,
        " agora e comece a explorar, organizar e compartilhar seus animes favoritos com a comunidade!",
      ]}
    >
      <SignInForm />
    </AuthForm>
  );
};

export default Page;
