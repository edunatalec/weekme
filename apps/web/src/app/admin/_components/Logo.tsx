import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

const Logo = ({ className }: Props) => {
  return <h1 className={cn("text-3xl font-bold", className)}>WeekMe</h1>;
};

export default Logo;
