import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { useNavigation } from "expo-router";
import { CustomTextInput, CustomButton } from "@/components/common";
import { useSession } from "@/context";
import { ScrollView } from "react-native-gesture-handler";
import { AuthApi } from "@/services/api/auth";
import { ILoginProps } from "@/interfaces/auth";
import { useTranslation } from "react-i18next";

const { width, height } = Dimensions.get("window");

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const { signIn } = useSession()!;
  const { t } = useTranslation();

  const loginMutation = AuthApi.useLogin();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const handleContinue = async () => {
    if (userName && password) {
      const data: ILoginProps = {
        username: userName,
        password,
      };
      const result = await loginMutation.mutateAsync(data).catch((error) => {
        alert(t("controlUserNameAndPassword"));
      });

      if (result) {
        signIn(result);
      }
    }
  };

  return (
    <ScrollView style={[styles.container]}>
      <View style={[styles.content]}>
        <Text style={[styles.title]}>{t("products")}</Text>
        <CustomTextInput
          title={t("email")}
          placeholder={t("email")}
          value={userName}
          onChangeText={setUserName}
          keyboardType="default"
        />

        <CustomTextInput
          title={t("password")}
          placeholder={t("password")}
          value={password}
          onChangeText={setPassword}
          isPassword
        />
        <CustomButton
          type="large"
          style={{ marginBottom: 20 }}
          text={t("login")}
          onPress={handleContinue}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.1,
  },
  content: {
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingBottom: 20,
  },
});

export default LoginScreen;
