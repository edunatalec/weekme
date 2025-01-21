import { AuthForm } from "@/app/(auth)/_components/AuthForm";
import { AuthLink } from "@/app/(auth)/_components/AuthLink";
import { ForgotPasswordForm } from "@/app/(auth)/forgot-password/_components/ForgotPasswordForm";
import { getPageTitle } from "@/utils/metadata";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: getPageTitle("Esqueci minha senha"),
};

const Page = () => {
  return (
    <AuthForm
      title="Recupere sua senha"
      subtitle="Esqueceu sua senha? Não se preocupe, nós ajudamos você a redefini-la para voltar ao universo dos animes!"
      footer={[
        "Lembrou sua senha? ",
        <AuthLink key="/sign-in" href="/sign-in" text="Faça login" />,
        " e continue explorando o calendário definitivo de animes!",
      ]}
    >
      <ForgotPasswordForm />
    </AuthForm>
  );
};

export default Page;
