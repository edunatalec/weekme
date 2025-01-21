import { AuthLink } from "@/app/(auth)/_components/AuthLink";
import { Center } from "@/components/Center";

const NotFound = () => {
  return (
    <Center className="h-full flex-col gap-2">
      <span className="text-2xl">O link está invalido ou expirado</span>
      <span>
        Volte para a tela <AuthLink href="/sign-in" text="inicial" />
      </span>
    </Center>
  );
};

export default NotFound;
