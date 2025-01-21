import { AuthForm } from "@/app/(auth)/_components/AuthForm";
import { ResetPasswordForm } from "@/app/(auth)/forgot-password/[code]/reset/_components/ResetPasswordForm";

const Page = () => {
  return (
    <AuthForm
      title="Crie sua nova senha"
      subtitle="Digite sua nova senha para concluir a recuperação. Certifique-se de escolher uma senha segura que só você conheça."
      footer={[
        "Lembre-se: use uma combinação de letras, números e caracteres especiais para aumentar a segurança da sua senha.",
      ]}
    >
      <ResetPasswordForm />
    </AuthForm>
  );
};

export default Page;
