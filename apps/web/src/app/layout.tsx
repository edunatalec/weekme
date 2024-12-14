import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "@/styles/globals.css";
import { ThemeProvider } from "@/contexts/ThemeProvider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "WeekMe",
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
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
