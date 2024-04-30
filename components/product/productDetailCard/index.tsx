import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import { InnerHeader } from "@/components/common";
import { Product } from "@/interfaces";
import { useFav } from "@/context/favContext";
import { useTranslation } from "react-i18next";

const { height, width } = Dimensions.get("window");

interface ProductDetailCardProps {
  product: Product;
}

export const ProductDetailCard: React.FC<ProductDetailCardProps> = ({
  product,
}) => {
  const { t } = useTranslation();

  const { addToFav, removeFromFav, isFav } = useFav();

  return (
    <View style={styles.container}>
      <InnerHeader headerTitle={t("productDetail")} />
      <FlatList
        key={product.images.length.toString()}
        horizontal
        data={product.images}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image key={item} style={styles.thumbnail} source={{ uri: item }} />
        )}
      />

      <Text style={styles.title}>
        {t("model")} {product.title}
      </Text>
      <Text style={styles.description}>
        {t("productDescription")}: {product.description}
      </Text>
      <Text style={styles.description}>
        {t("productCategory")} {product.category}
      </Text>
      <Text style={styles.description}>
        {t("brand")} {product.brand}
      </Text>

      <Text style={styles.price}>${product.price}</Text>

      <TouchableOpacity
        style={{ alignItems: "flex-end" }}
        onPress={() =>
          isFav(product.id) ? removeFromFav(product.id) : addToFav(product.id)
        }
      >
        <FontAwesome
          name={isFav(product.id) ? "heart" : "heart-o"}
          size={30}
          color="red"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    paddingTop: height * 0.06,
  },
  thumbnail: {
    width: width * 0.6,
    height: 400,
    borderRadius: 8,
    marginTop: height * 0.06,
    borderWidth: 1,
    marginRight: 8,
    resizeMode: "contain",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    marginBottom: 12,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
  },
});
