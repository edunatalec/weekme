import { ReactNode } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type ButtonIconProps = {
  position: "left" | "right";
  children: ReactNode;
  onClick?: () => void;
};

export const ButtonIcon = ({
  position,
  children,
  onClick,
}: ButtonIconProps) => {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn(
        "absolute top-1/2 -translate-y-1/2",
        position === "left" && "left-4 cursor-default hover:bg-transparent",
        position === "right" && "right-4",
      )}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
