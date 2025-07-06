export class PaginationResponse<T> {
  items: T[];
  total: number;
  pageNumber: number;
  pageSize: number;
}
