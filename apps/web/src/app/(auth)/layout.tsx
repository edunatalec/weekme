"use client";

import darkLogo from "@/assets/dark-logo.png";
import lightLogo from "@/assets/light-logo.png";
import { useTheme } from "@/contexts/ThemeProvider";
import Image from "next/image";

interface Props {
  readonly children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  const { theme, toggle } = useTheme();

  return (
    <div className="flex h-full w-full bg-background">
      <div className="hidden flex-1 items-center justify-center bg-black dark:bg-white md:flex">
        <Image
          src={theme === "dark" ? lightLogo : darkLogo}
          width={300}
          height={500}
          alt="Logo"
          onClick={toggle}
        />
      </div>

      <main className="flex-1">{children}</main>
    </div>
  );
};

export default AuthLayout;
