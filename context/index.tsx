import React, { useEffect } from "react";
import { useStorageState } from "./useStorageState";
import { ILoginResponse } from "../interfaces/auth";
import { router } from "expo-router";
import { api } from "../services/api/auth/index";

const AuthContext = React.createContext<{
  signIn: (data: ILoginResponse) => void;
  signOut: () => void;
  session?: string | null;
  userId?: string | null;
  isLoading: boolean;
} | null>(null);

export function useSession() {
  const value = React.useContext(AuthContext);

  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: any) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const [[isUserLoading, userId], setUserId] = useStorageState("userId");

  useEffect(() => {
    if (session) {
      api.defaults.headers["Authorization"] = `Bearer ${session}`;
      router.replace("/(tabs)/home");
    } else {
      router.replace("/loginScreen");
    }
  }, [session]);

  return (
    <AuthContext.Provider
      value={{
        signIn: (data: ILoginResponse) => {
          setSession(data.token);

          api.defaults.headers["Authorization"] = `Bearer ${data.token}`;
        },
        signOut: () => {
          setSession(null);
          setUserId(null);
          router.push("/loginScreen");
        },
        session,
        isLoading,
        userId,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
