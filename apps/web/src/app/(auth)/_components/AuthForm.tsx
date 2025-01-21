"use client";

import Image from "next/image";

import darkLogo from "@/assets/dark-logo.png";
import lightLogo from "@/assets/light-logo.png";
import { Center } from "@/components/Center";
import { useTheme } from "@/contexts/ThemeProvider";

interface Props {
  hasLogo?: boolean;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode[];
}

export const AuthForm = ({
  title,
  hasLogo,
  children,
  footer,
  subtitle,
}: Props) => {
  const { theme, toggle } = useTheme();

  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-4 bg-white p-8 dark:bg-black md:p-16">
      <div className="flex w-full flex-col gap-2">
        {hasLogo && (
          <Center>
            <Image
              src={theme === "dark" ? darkLogo : lightLogo}
              alt="Logo"
              width={300}
              className="mb-12 md:m-0 md:hidden"
              onClick={toggle}
            />
          </Center>
        )}

        <h1 className="text-3xl">{title}</h1>

        {subtitle && <h1 className="text-foreground/80">{subtitle}</h1>}
      </div>

      <div className="w-full">{children}</div>

      {footer && (
        <div>
          <p className="text-center text-foreground/80">{footer}</p>
        </div>
      )}
    </div>
  );
};
