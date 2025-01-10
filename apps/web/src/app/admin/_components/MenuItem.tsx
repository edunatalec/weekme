import { Menu } from "@/app/admin/_interfaces/menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {
  item: Menu;
  onSelectedClick?: () => void;
  currentPathname: string;
}

const MenuItem = ({ item, onSelectedClick, currentPathname }: Props) => {
  const isSelected = currentPathname.includes(item.href);
  const isBaseRoute = currentPathname === item.href;

  return (
    <li>
      <Button
        variant="menu"
        size="menu"
        asChild
        className={cn(
          "w-full",
          isSelected && "bg-accent text-accent-foreground",
        )}
        onClick={(e) => {
          if (isBaseRoute) {
            e.preventDefault();
          }

          onSelectedClick?.();
        }}
      >
        <Link href={item.href}>
          {item.icon}
          <span className="flex-1 overflow-hidden overflow-ellipsis">
            {item.text}
          </span>
        </Link>
      </Button>
    </li>
  );
};

export default MenuItem;
