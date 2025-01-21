import { cn } from "@/lib/utils";
import React from "react";

type AlertType = "error" | "success";

const ALERT_TYPE_MAP: {
  [A in AlertType]: {
    class: string;
    title: string;
  };
} = {
  error: {
    class: "border-destructive text-destructive",
    title: "Erro",
  },
  success: {
    class: "border-success text-success",
    title: "Sucesso",
  },
};

interface Props {
  type: AlertType;
  message: string;
}

export const Alert = ({ type, message }: Props) => {
  return (
    <div
      className={cn(
        "flex flex-col rounded-md border p-2",
        ALERT_TYPE_MAP[type].class,
      )}
    >
      <span className="font-bold">{ALERT_TYPE_MAP[type].title}</span>
      <span className="text-sm">{message}</span>
    </div>
  );
};
