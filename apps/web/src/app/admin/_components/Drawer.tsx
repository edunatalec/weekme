import Logo from "@/app/admin/_components/Logo";
import { Logout } from "@/app/admin/_components/Logout";
import MenuItems from "@/app/admin/_components/MenuItems";
import { cn } from "@/lib/utils";

interface Props {
  open: boolean;
  toggleMenu: () => void;
}

const Drawer = ({ open, toggleMenu }: Props) => {
  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-20 flex w-3/4 -translate-x-full flex-col gap-4 overflow-hidden border-r bg-background py-4 transition-transform duration-200 ease-linear",
          open && "translate-x-0",
        )}
      >
        <Logo className="mx-4" />
        <MenuItems onSelectedClick={toggleMenu} />
        <Logout />
      </div>

      <div
        className={cn(
          "fixed inset-0 z-10 bg-black/60 opacity-0 backdrop-blur-sm transition-opacity duration-200 ease-linear",
          open && "opacity-100",
          !open && "pointer-events-none",
        )}
        onClick={toggleMenu}
      />
    </>
  );
};

export default Drawer;
