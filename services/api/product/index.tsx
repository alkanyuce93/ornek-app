import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { api } from "@/services/api/instance";
import { ProductListResponse } from "@/interfaces";

const apiUrl = process.env.EXPO_PUBLIC_API;

export const ProductApi = {
  useGetProductDetailQuery: (id: number) => {
    return useQuery({
      queryKey: ["product", id],
      queryFn: async () => {
        try {
          const response = await api.get(`${apiUrl}/products/${id}`);
          return response.data;
        } catch (error) {
          throw error;
        }
      },
    });
  },
  useGetAllProductsQuery: (): UseQueryResult<ProductListResponse, Error> => {
    return useQuery({
      queryKey: ["products"],
      queryFn: async () => {
        try {
          const response = await api.get<ProductListResponse>(
            `${apiUrl}/products?limit=100`
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
