import Link from "next/link";
import React from "react";

interface Props {
  href: string;
  text: string;
}

export const AuthLink = ({ href, text }: Props) => {
  return (
    <Link
      href={href}
      className="text-success transition-colors hover:text-success/60"
    >
      {text}
    </Link>
  );
};
