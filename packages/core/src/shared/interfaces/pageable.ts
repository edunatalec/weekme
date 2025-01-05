export interface Pageable<T> {
  data: T[];
  meta: Meta;
}

export interface Meta {
  count: number;
  page: number;
  totalPages: number;
}
