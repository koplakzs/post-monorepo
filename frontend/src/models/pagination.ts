export interface GlobalQueryPaginationParams {
  page: number;
  limit: number;
}
export interface GlobalPagination {
  meta: {
    currentPage: number;
    from: number | null;
    lastPage: number;
    path: string;
    perPage: number;
    to: number | null;
    total: number;
  };
}
