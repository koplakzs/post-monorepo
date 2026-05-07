import axiosInstance from "@/libs/axios";
import {
  ApiResponseAuth,
  ILoginBody,
  IRegisterBody,
} from "../models/authModel";

const authService = {
  registerUser: ({ body }: IRegisterBody) =>
    axiosInstance
      .post<ApiResponseAuth>(`/register`, body)
      .then((res) => res.data.data),
  loginUser: ({ body }: ILoginBody) =>
    axiosInstance
      .post<ApiResponseAuth>(`/login`, body)
      .then((res) => res.data.data),
  logoutUser: () => axiosInstance.post(`/logout`).then((res) => res.data),
};

export default authService;
