import { useMutation, useQueryClient } from "@tanstack/react-query";
import postService from "../services/postService";
import { IPost } from "../models/postModel";

const usePost = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["post"],
    mutationFn: ({ post, title }: IPost) => postService.post({ post, title }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return mutation;
};

export default usePost;
