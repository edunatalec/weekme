"use client";

import Drawer from "@/app/admin/_components/Drawer";
import ToggleTheme from "@/app/admin/_components/ToggleTheme";
import IconButton from "@/components/IconButton";
import { ArrowLeft, Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useReducer } from "react";

const Header = () => {
  const [openMenu, toggleMenu] = useReducer((menu: boolean) => !menu, false);
  const pathname = usePathname();
  const router = useRouter();

  const showBackButton = pathname.match(/\/(new|edit)$/);

  const handleButtonClick = () => {
    if (showBackButton) {
      if (window.history.length > 1) {
        router.back();
      }
    } else {
      toggleMenu();
    }
  };

  return (
    <>
      <header className="fixed z-10 h-14 w-full border-b bg-background/60 backdrop-blur-sm md:hidden">
        <nav className="flex h-full items-center gap-2 px-2">
          <IconButton onClick={handleButtonClick}>
            {showBackButton ? <ArrowLeft /> : <Menu />}
          </IconButton>

          <span className="flex-1">WeekMe</span>

          <ToggleTheme />
        </nav>
      </header>

      <Drawer open={openMenu} toggleMenu={toggleMenu} />
    </>
  );
};

export default Header;
