import { ReactNode } from "react";
import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { CardFooterForm } from "./card-footer-form";

import logo from "@/assets/logo.svg";

interface CardFormProps {
  hasLogo?: boolean;
  title: string;
  children: ReactNode;
  footerText?: string;
  linkLabel?: string;
  linkURL?: string;
}

export const CardForm = ({
  title,
  hasLogo,
  children,
  footerText,
  linkLabel,
  linkURL,
}: CardFormProps) => {
  return (
    <Card
      className={`flex h-screen w-full flex-col items-center justify-center rounded-none border-none bg-zinc-800 px-6 py-8 md:m-auto md:my-8 md:h-auto md:max-w-2xl md:rounded-lg md:px-20`}
    >
      <CardHeader
        className={`flex w-full items-center justify-center p-0 ${hasLogo ? "mb-5" : "mb-0"}`}
      >
        {hasLogo && <Image src={logo} alt="Logo" />}
        <CardTitle className="text-lg font-bold leading-[35%] text-neutral-100 md:text-2xl">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="mb-8 w-full p-0">{children}</CardContent>
      {footerText && linkLabel && linkURL && (
        <CardFooterForm
          text={footerText}
          linkLabel={linkLabel}
          linkURL={linkURL}
        />
      )}
    </Card>
  );
};
