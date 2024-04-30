import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api/instance";
import { ProductListResponse } from "@/interfaces";

const apiUrl = process.env.EXPO_PUBLIC_API;

export const CategoryApi = {
  useGetCategoriesQuery: () => {
    return useQuery({
      queryKey: ["categories"],
      queryFn: async () => {
        try {
          const response = await api.get(`${apiUrl}/products/categories`);
          return response.data;
        } catch (error) {
          throw error;
        }
      },
    });
  },
  useGetCategoryProductsQuery: (category: string) => {
    return useQuery<ProductListResponse>({
      queryKey: ["category", category],
      queryFn: async () => {
        try {
          const response = await api.get(
            `${apiUrl}/products/category/${category}`
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
