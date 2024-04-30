import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { api } from "@/services/api/instance";
import { useSession } from "@/context";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const token = useSession();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1);
  }, []);

  useEffect(() => {
    if (!loading && token) {
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      router.push("/(tabs)/home");
    } else if (!loading && !token) {
      router.push("/loginScreen");
    }
  }, [loading]);

  return <View />;
}
