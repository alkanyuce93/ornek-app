import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface FavContextType {
  favProducts: number[];
  addToFav: (productId: number) => void;
  removeFromFav: (productId: number) => void;
  isFav: (productId: number) => boolean;
}

const FavContext = createContext<FavContextType | undefined>(undefined);

export const useFav = () => {
  const context = useContext(FavContext);
  if (!context) {
    throw new Error("useFav must be used within a FavProvider");
  }
  return context;
};

export const FavProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favProducts, setFavProducts] = useState<number[]>([]);

  const loadFavProducts = async () => {
    try {
      const storedFavProducts = await AsyncStorage.getItem("favProducts");
      if (storedFavProducts) {
        setFavProducts(JSON.parse(storedFavProducts));
      }
    } catch (error) {
      console.error("Error loading fav products from AsyncStorage", error);
    }
  };

  useEffect(() => {
    loadFavProducts();
  }, []);

  const saveFavProducts = async (products: number[]) => {
    try {
      const jsonProducts = JSON.stringify(products);
      await AsyncStorage.setItem("favProducts", jsonProducts);
    } catch (error) {
      console.error("Error saving fav products to AsyncStorage", error);
    }
  };

  const addToFav = (productId: number) => {
    setFavProducts((prevFav) => {
      const newFav = [...prevFav, productId];
      saveFavProducts(newFav);
      return newFav;
    });
  };

  const removeFromFav = (productId: number) => {
    setFavProducts((prevFav) => {
      const newFav = prevFav.filter((id) => id !== productId);
      saveFavProducts(newFav);
      return newFav;
    });
  };

  const isFav = (productId: number) => favProducts.includes(productId);

  const contextValue: FavContextType = {
    favProducts,
    addToFav,
    removeFromFav,
    isFav,
  };

  return (
    <FavContext.Provider value={contextValue}>{children}</FavContext.Provider>
  );
};
