"use client";

import { PaginationData, PaginationType } from "@/hooks/usePagination";
import { cn } from "@/lib/utils";
import { Ellipsis } from "lucide-react";
import { ReactNode } from "react";

const pagination: { [Key in PaginationType]: ReactNode } = {
  previous: "Anterior",
  skip: <Ellipsis />,
  next: "Próximo",
  number: null,
};

interface PaginationProps {
  currentPage: number;
  items: PaginationData[];
  onPaginationClick: (page: PaginationData) => void;
  canEnablePaginationItem: (page: PaginationData) => boolean;
}

export const Pagination = ({
  canEnablePaginationItem,
  items,
  onPaginationClick,
  currentPage,
}: PaginationProps) => {
  return (
    <nav className="flex justify-center">
      <ul className="flex gap-1 overflow-x-auto">
        {items.map((item, key) => {
          const skip = item.type === "skip";
          const active = currentPage === item.value;
          const disable = !canEnablePaginationItem(item) && !active;
          const enable = !skip && !disable;

          return (
            <li
              key={key}
              className={cn(
                "rounded-sm border border-transparent px-4 py-2",
                active && "border border-foreground/20 dark:border-card",
                enable &&
                  "cursor-pointer hover:bg-foreground/10 dark:hover:bg-card",
                disable && "cursor-default text-muted-foreground",
                skip && "bg-transparent text-foreground",
              )}
              onClick={() => onPaginationClick(item)}
            >
              {pagination[item.type] || item.value}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
