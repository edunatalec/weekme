import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";

export const Logout = () => {
  return (
    <Button
      variant="ghost"
      className="mx-4 justify-start p-2"
      size="lg"
      asChild
    >
      <Link href="/sign-in?logout">
        <LogOut />
        <span>Sair</span>
      </Link>
    </Button>
  );
};
