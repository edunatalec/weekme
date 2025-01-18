import { CardForm } from "@/app/(auth)/components/CardForm";
import { SignInForm } from "./components/SignInForm";

const Page = () => {
  return (
    <CardForm
      hasLogo
      title="Entre com sua conta"
      footer={{
        text: "Ainda não possui conta?",
        link: "Cadastre-se aqui",
        linkUrl: "/sign-up",
      }}
    >
      <SignInForm />
    </CardForm>
  );
};

export default Page;
