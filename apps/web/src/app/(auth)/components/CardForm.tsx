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

interface FooterProps {
  text: string;
  link: string;
  linkUrl: string;
}

interface Props {
  hasLogo?: boolean;
  title: string;
  children: ReactNode;
  footer?: FooterProps;
}

export const CardForm = ({ title, hasLogo, children, footer }: Props) => {
  return (
    <Card className="border-non h-full w-full items-center justify-center rounded-none px-6 py-8 md:mx-auto md:my-8 md:h-auto md:max-w-xl md:rounded-lg md:px-16">
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
              className="text-success transition-colors hover:text-success/60"
            >
              {footer.link}
            </Link>
          </p>
        </CardFooter>
      )}
    </Card>
  );
};
