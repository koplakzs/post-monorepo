import { environmentManager, QueryClient } from "@tanstack/react-query";

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 3,
        staleTime: 1000 * 60 * 2,
        gcTime: 1000 * 60 * 60,
      },
    },
  });
};

let browserQueryClient: QueryClient | null = null;

export const getQueryClient = () => {
  if (environmentManager.isServer()) {
    return makeQueryClient();
  }

  browserQueryClient ??= makeQueryClient();

  return browserQueryClient;
};
