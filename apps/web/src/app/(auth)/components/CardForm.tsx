import Image from "next/image";
import { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";

import logo from "@/assets/logo.svg";

interface Props {
  hasLogo?: boolean;
  title: string;
  children: ReactNode;
  footer?: FooterProps;
}

interface FooterProps {
  text: string;
  link: string;
  linkUrl: string;
}

export const CardForm = ({ title, hasLogo, children, footer }: Props) => {
  return (
    <Card className="h-full w-full items-center justify-center rounded-none border-none px-6 py-8 md:mx-auto md:my-8 md:h-auto md:max-w-xl md:rounded-lg md:px-16">
      <CardHeader className="mb-6 items-center">
        {hasLogo && <Image src={logo} alt="Logo" priority />}
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>

      <CardContent className="mb-8 w-full p-0">{children}</CardContent>

      {footer && (
        <CardFooter>
          <p className="text-center text-lg font-light">
            {footer.text}{" "}
            <Link
              href={footer.linkUrl}
              className="text-success hover:text-success/60 transition-colors"
            >
              {footer.link}
            </Link>
          </p>
        </CardFooter>
      )}
    </Card>
  );
};
