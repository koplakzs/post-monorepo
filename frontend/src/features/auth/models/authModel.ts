import { ApiResponse } from "@/models/response";

export interface IUser {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
}
export interface ILoginBody {
  body: IUser;
}
export interface IRegisterBody {
  body: IUser;
}

export interface IResAuth {
  token: string;
  user: IUser;
}

export type ApiResponseAuth = ApiResponse<IResAuth>;
