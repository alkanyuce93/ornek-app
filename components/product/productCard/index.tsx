import React from "react";
import { Dimensions, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../../Themed";
import { Product } from "@/interfaces";
import { useFav } from "@/context/favContext";
import { FontAwesome } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useShadow } from "@/context/shadowContext";

const { width } = Dimensions.get("window");

interface ProductProps {
  product: Product;
  onPress: (productId: number) => void;
}

export const ProductCard: React.FC<ProductProps> = ({ product, onPress }) => {
  const { shadowStyle } = useShadow();
  const { t } = useTranslation();

  const { addToFav, removeFromFav, isFav } = useFav();

  const handlePress = () => {
    onPress(product.id);
  };

  const handleFavPress = () => {
    if (isFav(product.id)) {
      removeFromFav(product.id);
    } else {
      addToFav(product.id);
    }
  };

  return (
    <TouchableOpacity style={shadowStyle} onPress={handlePress}>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: product.thumbnail }} />
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>

        <Text style={styles.price}>{product.price} USD</Text>
        <Text style={styles.rating}>
          {t("rating")}: {product.rating}
        </Text>

        <TouchableOpacity style={styles.favButton} onPress={handleFavPress}>
          <FontAwesome
            name={isFav(product.id) ? "heart" : "heart-o"}
            size={20}
            color="red"
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.4,
    height: 350,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  image: {
    width: "100%",
    height: "60%",
    resizeMode: "cover",
    borderRadius: 5,
  },
  title: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  price: {
    fontSize: 14,
    color: "gray",
    marginTop: 5,
  },
  rating: {
    fontSize: 14,
    color: "gray",
  },
  favButton: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 5,
    backgroundColor: "white",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "lightgray",
    borderWidth: 1,
  },
});
