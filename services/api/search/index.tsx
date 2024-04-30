import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api/instance";

const apiUrl = process.env.EXPO_PUBLIC_API;

export const SearchApi = {
  useSearch: (searchQuery: string) => {
    return useQuery({
      queryKey: ["search", searchQuery],

      queryFn: async () => {
        try {
          const response = await api.get(
            `${apiUrl}/products/search?q=${searchQuery}`
          );

          return response.data;
        } catch (error) {
          throw error;
        }
      },
    });
  },
};

export { api };
