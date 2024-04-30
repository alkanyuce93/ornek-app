import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { ProductCard } from "@/components/product";
import { FlatList } from "react-native-gesture-handler";
import { useFav } from "@/context/favContext";
import { Product } from "@/interfaces";
import { ProductApi } from "@/services/api";
import { InnerHeader } from "@/components/common";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";

const { height } = Dimensions.get("window");

const FavoritesScreen: React.FC = () => {
  const { t } = useTranslation();
  const { favProducts } = useFav();
  const { data: products } = ProductApi.useGetAllProductsQuery();

  const favoriteProducts = {
    products: products?.products.filter((product: Product) =>
      favProducts.includes(product.id)
    ),
  };

  const handleProductPress = (productId: number) => {
    router.push(`/favorites/detail/${productId}`);
  };

  const renderProductCard = ({ item }: { item: Product }) => (
    <ProductCard onPress={() => handleProductPress(item?.id)} product={item} />
  );

  return (
    <View style={styles.container}>
      <InnerHeader isBack={false} headerTitle={t("favorites")} />
      <View style={styles.content}>
        {favoriteProducts?.products?.length ? (
          <FlatList
            key={favoriteProducts?.products?.length?.toString()}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            horizontal={false}
            data={favoriteProducts?.products}
            renderItem={renderProductCard}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        ) : (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={{ textAlign: "center" }}>{t("noFavProducts")}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: height * 0.06,
  },
  content: {
    flex: 1,
    alignItems: "center",
  },
  separator: {
    height: 16,
  },
});

export default FavoritesScreen;
