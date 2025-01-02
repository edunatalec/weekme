import { Pageable } from "@repo/core";

export interface FetchPageableItemsProps {
  page: number;
  size: number;
  search?: { [key: string]: any };
}

export type FetchPageableItems = <T>({
  page,
  size,
  search,
}: FetchPageableItemsProps) => Promise<Pageable<T>>;
