import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import authService from "../services/authService";
import { deleteAuthCookies } from "@/helpers/cookiesHelper";

const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: () => authService.logoutUser(),

    onSuccess: async () => {
      queryClient.clear();

      await deleteAuthCookies();

      router.replace("/login");
    },
    onError: (error) => {
      console.error("Logout error:", error);
      deleteAuthCookies();
      queryClient.clear();
      router.replace("/login");
    },
  });

  return mutation;
};

export default useLogout;
