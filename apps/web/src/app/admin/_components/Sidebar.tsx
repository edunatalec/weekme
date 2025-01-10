import Logo from "@/app/admin/_components/Logo";
import { Logout } from "@/app/admin/_components/Logout";
import MenuItems from "@/app/admin/_components/MenuItems";
import ToggleTheme from "@/app/admin/_components/ToggleTheme";

const Sidebar = () => {
  return (
    <aside className="dark hidden min-w-72 max-w-72 flex-col gap-4 py-4 text-white md:flex">
      <div className="flex items-center gap-2 px-4">
        <Logo className="flex-1" />
        <ToggleTheme />
      </div>

      <MenuItems />
      <Logout />
    </aside>
  );
};

export default Sidebar;
