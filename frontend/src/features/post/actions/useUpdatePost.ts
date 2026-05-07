import { useMutation, useQueryClient } from "@tanstack/react-query";
import postService from "../services/postService";
import { IPost } from "../models/postModel";

const useUpdatePost = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["update-post"],
    mutationFn: ({ post, title, id }: IPost) =>
      postService.update({ post, title, id }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return mutation;
};

export default useUpdatePost;
