import Link from "next/link";

interface Props {
  href: string;
  text: string;
}

export const TableLink = ({ href, text }: Props) => {
  return (
    <Link
      href={href}
      className="text-primary underline-offset-4 hover:underline"
    >
      {text}
    </Link>
  );
};
