import Logo from "@/app/admin/_components/Logo";
import MenuItems from "@/app/admin/_components/MenuItems";
import ToggleTheme from "@/app/admin/_components/ToggleTheme";

const Sidebar = () => {
  return (
    <aside className="dark hidden min-w-72 max-w-72 flex-col overflow-y-auto py-4 pl-4 text-white md:flex">
      <div className="mb-4 flex items-center">
        <Logo className="flex-1" />
        <ToggleTheme />
      </div>

      <MenuItems />
    </aside>
  );
};

export default Sidebar;
