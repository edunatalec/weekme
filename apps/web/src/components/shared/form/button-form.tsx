import { Button } from "@/components/ui/button";

interface ButtonFormProps {
  text: string;
}

export const ButtonForm = ({ text }: ButtonFormProps) => {
  return (
    <Button
      className="w-full rounded-[0.625rem] bg-green-500 text-xl font-bold leading-9 text-neutral-100 hover:bg-green-400"
      type="submit"
    >
      {text}
    </Button>
  );
};
