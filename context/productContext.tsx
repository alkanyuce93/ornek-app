import React, { createContext, useContext, useState } from "react";
import { Product, ProductListResponse } from "@/interfaces";

interface ProductContextType {
  selectedProducts: ProductListResponse;
  setSelectedProducts: React.Dispatch<
    React.SetStateAction<ProductListResponse>
  >;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedProducts, setSelectedProducts] = useState<ProductListResponse>(
    {
      limit: 0,
      products: [],
      skip: 0,
      total: 0,
      categoriesName: "",
    }
  );

  return (
    <ProductContext.Provider value={{ selectedProducts, setSelectedProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }

  return context;
};
