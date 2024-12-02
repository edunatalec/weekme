import Link from "next/link";
import { CardFooter } from "../../ui/card";

interface CardFooterProps {
  text?: string;
  linkLabel?: string;
  linkURL?: string;
}

export const CardFooterForm = ({
  text,
  linkLabel,
  linkURL,
}: CardFooterProps) => {
  return (
    <CardFooter className="p-0">
      <p className="w-full max-w-[388px] text-center text-lg leading-6 text-neutral-100">
        {text}{" "}
        <Link
          href={linkURL as string}
          className="inline-block text-green-500 hover:text-green-400"
        >
          {linkLabel}
        </Link>
      </p>
    </CardFooter>
  );
};
