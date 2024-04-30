import React from "react";
import { Dimensions, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { useTranslation } from "react-i18next";
import { InnerHeader } from "@/components/common";
import { tick } from "@/assets/images";

const { height, width } = Dimensions.get("window");

const ChangeLanguageScreen = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <View style={styles.container}>
      <InnerHeader headerTitle={t("changeTheLanguage")} />
      <View style={styles.content}>
        <Text style={styles.title}>{t("changesApplicationLanguage")}</Text>
        <TouchableOpacity
          style={[styles.buttonContainer]}
          onPress={() => changeLanguage("en")}
        >
          <Text>{t("english")}</Text>
          {i18n.language === "en" && (
            <Image style={styles.image} source={tick} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonContainer]}
          onPress={() => changeLanguage("tr")}
        >
          <Text>{t("turkish")}</Text>
          {i18n.language === "tr" && (
            <Image style={styles.image} source={tick} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: height * 0.06,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    position: "absolute",
    right: 10,
  },

  buttonContainer: {
    width: width * 0.8,
    justifyContent: "center",
    alignItems: "center",
    margin: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    flexDirection: "row",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default ChangeLanguageScreen;
