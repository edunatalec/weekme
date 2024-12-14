import { menus } from "@/app/admin/_data/menus";
import { Button } from "@/components/ui/button";

const Page = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <h1 className="text-center text-3xl">
        Seja bem vindo ao painel
        <br />
        admin do WeekMe
      </h1>

      <div className="flex max-w-sm flex-wrap justify-center gap-2">
        {menus.map((menu, index) => {
          return (
            <Button variant={"outline"} key={index} asChild>
              <a href={menu.href}>{menu.text}</a>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
