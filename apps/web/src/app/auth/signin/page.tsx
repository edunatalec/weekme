import { CardForm } from "@/components/shared/form/card-form";
import { SignInForm } from "./_components/form/signin-form";

const SignInPage = () => {
  return (
    <main>
      <CardForm
        title="Entre com sua conta"
        hasLogo
        footerText="Ainda não possui conta?"
        linkURL="/auth/signup"
        linkLabel="Cadastre-se"
      >
        <SignInForm />
      </CardForm>
    </main>
  );
};

export default SignInPage;
