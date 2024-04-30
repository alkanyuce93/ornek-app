import { Dimensions, StyleSheet, Alert } from "react-native";
import { View } from "@/components/Themed";

import { CustomButton, InnerHeader } from "@/components/common";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { useSession } from "@/context";

const { height, width } = Dimensions.get("window");

export default function SettingsScreen() {
  const { t } = useTranslation();
  const { signOut } = useSession()!;

  const handleSignOut = () => {
    Alert.alert(
      t("logOut"),
      t("confirmLogoutMessage"),
      [
        {
          text: t("cancel"),
          style: "cancel",
        },
        {
          text: t("confirm"),
          onPress: () => {
            signOut();
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handlePress = () => {
    router.navigate("/(tabs)/settings/change-language");
  };

  return (
    <View style={styles.container}>
      <InnerHeader isBack={false} headerTitle={t("Settings")} />
      <View style={styles.content}>
        <CustomButton
          style={styles.buttonContainer}
          text={t("changeTheLanguage")}
          onPress={() => handlePress()}
        />
      </View>
      <CustomButton
        style={{ marginBottom: 50 }}
        type="exit"
        text={t("logOut")}
        onPress={() => handleSignOut()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: height * 0.06,
    paddingHorizontal: width * 0.05,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: width * 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
