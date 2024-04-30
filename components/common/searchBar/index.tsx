import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { SearchApi } from "@/services/api/search";
import { useTranslation } from "react-i18next";
import { Product } from "@/interfaces";

interface SearchBarProps {
  onItemSelected: (selectedItem: Product) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onItemSelected }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const { data, isLoading } = SearchApi.useSearch(searchQuery);

  const { t } = useTranslation();

  const handleItemSelected = (selectedItem: any) => {
    setSearchQuery("");
    onItemSelected(selectedItem);
  };

  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(() => {
      if (searchQuery.trim() !== "") {
        console.log("Search query:", searchQuery);
      }
    }, 2000);

    setDebounceTimeout(timeout);

    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder={t("search")}
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      {isLoading && <Text>{t("loading")}</Text>}
      {data && data.products.length > 0 && searchQuery.length > 0 ? (
        <FlatList
          key={data.products.length.toString()}
          data={data.products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id.toString()}
              onPress={() => handleItemSelected(item)}
            >
              <View style={styles.itemContainer}>
                <Image
                  source={{ uri: item.thumbnail }}
                  style={styles.thumbnail}
                />
                <Text style={styles.itemText}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        !isLoading &&
        searchQuery.length !== 0 && (
          <View style={styles.emptyView}>
            <Text>{t("noResults")}</Text>
          </View>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: "100%",
  },
  textInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  thumbnail: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  itemText: {
    fontSize: 16,
  },
  emptyView: {
    justifyContent: "center",
    alignItems: "center",
  },
});
