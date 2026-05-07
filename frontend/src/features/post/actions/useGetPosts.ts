import { useQuery } from "@tanstack/react-query";
import postService from "../services/postService";
import { GlobalQueryPaginationParams } from "@/models/pagination";

const useGetPosts = ({ limit, page }: GlobalQueryPaginationParams) => {
  const query = useQuery({
    queryKey: ["posts", { limit, page }],
    queryFn: () => postService.getPosts({ page, limit }),
  });

  return query;
};

export default useGetPosts;
