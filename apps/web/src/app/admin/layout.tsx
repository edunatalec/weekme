"use client";

import Header from "@/app/admin/_components/Header";
import Sidebar from "@/app/admin/_components/Sidebar";
import { useSession } from "@/contexts/SessionProvider";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const { loading } = useSession();

  if (loading) return <div>loading...</div>;

  return (
    <div className="flex h-full flex-col">
      <Header />
      <div className="flex flex-1 md:max-h-dvh md:bg-[#111111]">
        <Sidebar />

        <main className="mt-14 flex-1 overflow-hidden bg-background p-4 md:m-4 md:max-h-[100dhv-1rem] md:overflow-auto md:rounded-lg md:p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
