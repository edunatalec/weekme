import { cn } from "@/lib/utils";
import { Meta } from "@repo/core";

interface Props {
  meta: Meta;
  className?: string;
}

export const PaginationStatus = ({ meta, className }: Props) => {
  return (
    <span className={cn("block text-right text-xs", className)}>
      {"Exibindo "}
      <b>
        {meta.page}-{meta.totalPages}
      </b>
      {" de "}
      <b>{meta.count}</b>
    </span>
  );
};
