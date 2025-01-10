"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface Props {
  className?: string;
}

export const AnimeFormActions = ({ className }: Props) => {
  const router = useRouter();

  const onBackClick = () => {
    if (window.history.length > 1) {
      router.back();
    }
  };

  return (
    <div className={cn("flex gap-2 2xl:ml-auto 2xl:w-1/2", className)}>
      <Button
        onClick={onBackClick}
        variant="outline"
        className="hidden flex-1 md:block"
      >
        Voltar
      </Button>

      <Button className="flex-1" type="submit">
        Salvar
      </Button>
    </div>
  );
};
