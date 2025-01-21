import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "@/styles/globals.css";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { SessionProvider } from "@/contexts/SessionProvider";
import { getPageTitle } from "@/utils/metadata";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: getPageTitle("O maior calendário de animes"),
  description: "Bem-vindo ao WeekMe, o calendário definitivo de animes!",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning data-theme-loading>
      <body className={roboto.variable}>
        <SessionProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
