import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ILoginBody } from "../models/authModel";
import authService from "../services/authService";
import { setAuthCookies } from "@/helpers/cookiesHelper";

const useLogin = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: ({ body }: ILoginBody) => authService.loginUser({ body }),

    onSuccess: async ({ token, user }) => {
      await setAuthCookies(token, user);
      router.push("/");
    },
  });

  return mutation;
};

export default useLogin;
