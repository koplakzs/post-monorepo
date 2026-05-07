import { ApiResponse, ApiResponsePagination } from "@/models/response";

export interface IPost {
  id?: number;
  title?: string;
  post?: string;
}

export type ApiResponsePost = ApiResponse<IPost>;

export type ApiResponsePostPagination = ApiResponsePagination<IPost[]>;
