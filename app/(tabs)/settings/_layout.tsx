import { Stack } from "expo-router";

export default function SettingsScreenLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="change-language"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
