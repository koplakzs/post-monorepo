import axiosInstance from "@/libs/axios";
import {
  ApiResponsePost,
  ApiResponsePostPagination,
  IPost,
} from "../models/postModel";
import { GlobalQueryPaginationParams } from "@/models/pagination";

const postService = {
  getPosts: ({ page, limit }: GlobalQueryPaginationParams) =>
    axiosInstance
      .get<ApiResponsePostPagination>(`/posts`, {
        params: {
          page: page,
          row_per_page: limit,
        },
      })
      .then((res) => res.data),
  getDetailPost: (id: number) =>
    axiosInstance
      .get<ApiResponsePost>(`/posts/${id}`)
      .then((res) => res.data.data),
  post: ({ title, post }: IPost) =>
    axiosInstance
      .post<ApiResponsePost>(`/posts`, { title, post })
      .then((res) => res.data.data),
  update: ({ title, post, id }: IPost) =>
    axiosInstance
      .put<ApiResponsePost>(`/posts/${id}`, { title, post })
      .then((res) => res.data.data),
  delete: (id: number) =>
    axiosInstance
      .delete<ApiResponsePost>(`/posts/${id}`)
      .then((res) => res.data.data),
};

export default postService;
