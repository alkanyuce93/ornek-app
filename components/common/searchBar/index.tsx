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
import { FontAwesome } from "@expo/vector-icons";
import { SearchApi } from "@/services/api/search";
import { useTranslation } from "react-i18next";
import { Product } from "@/interfaces";
import Colors from "@/constants/Colors";

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

  const clearSearchQuery = () => {
    setSearchQuery("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder={t("search")}
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={clearSearchQuery}
            style={styles.clearButton}
          >
            <FontAwesome name="times-circle" size={20} color="gray" />
          </TouchableOpacity>
        )}
      </View>
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    height: 40,
    borderColor: Colors.light.textTitle,
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
  },
  clearButton: {
    position: "absolute",
    right: 10,
    top: 10,
    bottom: 10,
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
