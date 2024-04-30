import React from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { CategoryApi } from "@/services/api/categories";
import { router } from "expo-router";
import { InnerHeader } from "@/components/common";
import { useCategoryContext } from "@/context/categoryContext";
import { ProductApi } from "@/services/api";
import { useTranslation } from "react-i18next";
import { SearchBar } from "@/components/common/searchBar";
import { ProductCard } from "@/components/product";

const { height } = Dimensions.get("window");

export default function HomeScreen() {
  const { t } = useTranslation();

  const { data: categories, isLoading: loadingCategories } =
    CategoryApi.useGetCategoriesQuery();
  const { setSelectedCategory } = useCategoryContext();

  const { data: products } = ProductApi.useGetAllProductsQuery();

  const handleCategoryPress = (categoryName: string) => {
    setSelectedCategory(categoryName);

    router.push("/(tabs)/home/categories");
  };

  const handleProductPress = (productId: number) => {
    router.push(`/home/detail/${productId}`);
  };

  return (
    <View style={styles.container}>
      <InnerHeader isBack={false} headerTitle={t("home")} />
      <View
        style={{
          paddingTop: height * 0.06,
          width: "100%",
        }}
      >
        <SearchBar
          onItemSelected={(item) => {
            router.push(`/home/detail/${item.id}`);
          }}
        />
      </View>

      {loadingCategories ? (
        <Text>{t("loading")}</Text>
      ) : (
        <>
          <Text style={[styles.contentTitle]}>{t("categories")}</Text>
          <FlatList
            key={categories?.length?.toString()}
            style={{ paddingBottom: 50 }}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(index) => index.toString()}
            horizontal
            data={categories}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item}
                style={styles.categoryItem}
                onPress={() => handleCategoryPress(item)}
              >
                <Text style={styles.categoryItemText}>{t(item)}</Text>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </>
      )}

      <Text style={[styles.title]}>{t("products")}</Text>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        numColumns={2}
        horizontal={false}
        data={products?.products}
        renderItem={({ item }) => (
          <ProductCard
            key={item.id.toString()}
            onPress={() => {
              handleProductPress(item.id);
            }}
            product={item}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: height * 0.06,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  categoryItem: {
    backgroundColor: "#999A9B",
    height: 40,
    marginHorizontal: 5,
    borderRadius: 30,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryItemText: {
    color: "#ffffff",
  },
  separator: {
    width: 5,
  },
});
