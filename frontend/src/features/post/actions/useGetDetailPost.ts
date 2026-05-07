import { useQuery } from "@tanstack/react-query";
import postService from "../services/postService";

const useGetDetailPost = (id: number) => {
  const query = useQuery({
    queryKey: ["detailPost", id],
    queryFn: () => postService.getDetailPost(id),
  });

  return query;
};

export default useGetDetailPost;
