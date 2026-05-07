import { useMutation, useQueryClient } from "@tanstack/react-query";
import postService from "../services/postService";

const useDeletePost = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["delete-post"],
    mutationFn: (id: number) => postService.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return mutation;
};

export default useDeletePost;
