import { Meta } from "@repo/core";

interface Props {
  meta: Meta;
}

export const PaginationStatus = ({ meta }: Props) => {
  return (
    <span className="text-right text-xs">
      {"Exibindo "}
      <b>
        {meta.page}-{meta.totalPages}
      </b>
      {" de "}
      <b>{meta.count}</b>
    </span>
  );
};
