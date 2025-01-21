import { Badge } from "@/components/Badge";
import React from "react";

interface Props {
  items: string[];
}

export const Badges = ({ items }: Props) => {
  return (
    <div className="flex flex-wrap gap-1 py-2">
      {items.map((item, i) => (
        <Badge key={i} item={item} />
      ))}
    </div>
  );
};
