"use client";

import Header from "@/app/admin/_components/Header";
import Sidebar from "@/app/admin/_components/Sidebar";
import { useMenus } from "@/app/admin/_hooks/useMenus";
import { useSession } from "@/contexts/SessionProvider";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const { loading } = useSession();
  const { currentMenu, filteredMenus } = useMenus();

  if (loading) return <div>loading...</div>;

  if (currentMenu && !filteredMenus.includes(currentMenu)) {
    redirect("/admin");
  }

  return (
    <div className="flex h-full flex-col">
      <Header />

      <div className="flex h-full flex-1 md:bg-[#111111]">
        <Sidebar />

        <main
          className={cn(
            "flex flex-1 flex-col overflow-x-auto bg-background md:my-4 md:mr-4 md:max-h-[calc(100dvh-1rem)] md:rounded-lg md:p-0",
            currentMenu && "pt-14",
          )}
        >
          {currentMenu && (
            <h1 className="mx-4 mt-4 text-3xl">{currentMenu?.text}</h1>
          )}

          <div className="flex-1 overflow-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
