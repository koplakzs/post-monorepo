import { GlobalPagination } from "./pagination";

export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiResponsePagination<T = unknown> extends GlobalPagination {
  data: T;
  message: string;
  success: boolean;
}
