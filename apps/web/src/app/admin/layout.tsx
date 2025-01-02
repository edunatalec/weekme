"use client";

import Header from "@/app/admin/_components/Header";
import Sidebar from "@/app/admin/_components/Sidebar";
import { useMenus } from "@/app/admin/_hooks/useMenus";
import { useSession } from "@/contexts/SessionProvider";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const { loading } = useSession();
  const { currentMenu } = useMenus();

  if (loading) return <div>loading...</div>;

  return (
    <div className="flex h-full flex-col">
      <Header />
      <div className="flex flex-1 md:max-h-dvh md:bg-[#111111]">
        <Sidebar />

        <main className="mt-14 flex flex-1 flex-col bg-background p-4 pb-0 md:m-4 md:max-h-[100dhv-1rem] md:rounded-lg md:p-4 md:pb-0">
          <h1 className="mb-4 text-3xl">{currentMenu?.text}</h1>

          <div className="flex-1 overflow-hidden">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
