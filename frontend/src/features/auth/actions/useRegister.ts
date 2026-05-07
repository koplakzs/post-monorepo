import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { IRegisterBody } from "../models/authModel";
import authService from "../services/authService";
import { setAuthCookies } from "@/helpers/cookiesHelper";

const useRegister = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: ({ body }: IRegisterBody) => authService.registerUser({ body }),

    onSuccess: async ({ token, user }) => {
      await setAuthCookies(token, user);
      router.push("/");
    },
  });

  return mutation;
};

export default useRegister;
