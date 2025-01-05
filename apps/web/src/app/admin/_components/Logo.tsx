import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {
  className?: string;
}

const Logo = ({ className }: Props) => {
  return (
    <Link href={"/admin"} className={cn("text-3xl font-bold", className)}>
      WeekMe
    </Link>
  );
};

export default Logo;
