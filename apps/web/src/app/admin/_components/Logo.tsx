import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {
  className?: string;
}

const Logo = ({ className }: Props) => {
  return (
    <Link
      href={"/admin"}
      className={cn(
        "text-3xl font-bold focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1",
        className,
      )}
    >
      WeekMe
    </Link>
  );
};

export default Logo;
