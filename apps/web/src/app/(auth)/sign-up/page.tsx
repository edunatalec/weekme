import { CardForm } from "../components/CardForm";
import { SignUpForm } from "./components/SignUpForm";

const SignUpPage = () => {
  return (
    <CardForm
      title="Cadastre-se"
      footer={{
        text: "Já possui conta?",
        link: "Faça o login",
        linkUrl: "/sign-in",
      }}
    >
      <SignUpForm />
    </CardForm>
  );
};

export default SignUpPage;
