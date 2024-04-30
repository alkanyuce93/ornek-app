import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, View } from "react-native";

import { ProductApi } from "@/services/api";
import { ProductDetailCard } from "@/components/product";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();

  const {
    data: productData,
    isSuccess,
    isLoading,
  } = ProductApi.useGetProductDetailQuery(Number(id));

  return (
    <View style={{ flex: 1 }}>
      {isLoading && (
        <ActivityIndicator
          size="large"
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        />
      )}
      {isSuccess && <ProductDetailCard product={productData} />}
    </View>
  );
}
