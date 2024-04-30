import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useColorScheme } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SplashScreen, Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { I18nextProvider } from "react-i18next";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import { SessionProvider } from "@/context";
import { CategoryProvider } from "@/context/categoryContext";
import { FavProvider } from "@/context/favContext";
import { ProductProvider } from "@/context/productContext";

import i18n from "@/i18";
import { ShadowProvider } from "@/context/shadowContext";

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: true,
      },
    },
  });

  const colorScheme = useColorScheme();

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <ShadowProvider>
          <GestureHandlerRootView>
            <I18nextProvider i18n={i18n}>
              <ProductProvider>
                <FavProvider>
                  <CategoryProvider>
                    <ThemeProvider
                      value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
                    >
                      <Stack>
                        <Stack.Screen
                          name="loginScreen"
                          options={{ headerShown: false }}
                        />
                        <Stack.Screen
                          name="(tabs)"
                          options={{ headerShown: false }}
                        />
                      </Stack>
                    </ThemeProvider>
                  </CategoryProvider>
                </FavProvider>
              </ProductProvider>
            </I18nextProvider>
          </GestureHandlerRootView>
        </ShadowProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
