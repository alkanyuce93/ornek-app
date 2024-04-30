import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { InnerHeader } from "@/components/common";
import { Product } from "@/interfaces";
import { useFav } from "@/context/favContext";
import { useTranslation } from "react-i18next";
import Colors from "@/constants/Colors";

const { height, width } = Dimensions.get("window");

interface ProductDetailCardProps {
  product: Product;
}

export const ProductDetailCard: React.FC<ProductDetailCardProps> = ({
  product,
}) => {
  const { t } = useTranslation();
  const flatListRef = useRef<FlatList>(null);

  const scrollLeft = () => {
    flatListRef.current?.scrollToIndex({
      animated: true,
      index: Math.max(0, currentIndex - 1),
    });
  };

  const scrollRight = () => {
    flatListRef.current?.scrollToIndex({
      animated: true,
      index: Math.min(product.images.length - 1, currentIndex + 1),
    });
  };

  const { addToFav, removeFromFav, isFav } = useFav();
  const [currentIndex, setCurrentIndex] = useState(0);

  const renderImageIndicators = () => {
    return product.images.map((_, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => {
          flatListRef.current?.scrollToIndex({
            animated: true,
            index: index,
          });
        }}
      >
        <View
          style={[
            styles.imageIndicator,
            {
              backgroundColor:
                currentIndex === index
                  ? "rgba(0, 0, 0, 0.5)"
                  : "rgba(0, 0, 0, 0.1)",
            },
          ]}
        />
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <InnerHeader headerTitle={t("productDetail")} />

      <FlatList
        ref={flatListRef}
        style={{ marginTop: 8 }}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        data={product.images}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(
            event.nativeEvent.contentOffset.x / width
          );
          setCurrentIndex(newIndex);
        }}
        renderItem={({ item }) => (
          <Image
            key={item as string}
            style={{
              width: width - 32,
              height: 400,
              borderRadius: 8,
              marginRight: 8,
              resizeMode: "cover",
            }}
            source={{ uri: item as string }}
          />
        )}
      />
      <View style={styles.imageIndicatorsContainer}>
        {renderImageIndicators()}
      </View>

      <View
        style={{
          alignItems: "flex-end",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <TouchableOpacity onPress={scrollLeft}>
          <AntDesign name="caretleft" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={scrollRight}>
          <AntDesign name="caretright" size={24} color="black" />
        </TouchableOpacity>
      </View>

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
  imageIndicatorsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  imageIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
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
