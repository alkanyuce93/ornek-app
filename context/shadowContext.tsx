import React, { createContext, useContext, ReactNode } from "react";
import { ViewStyle } from "react-native";

interface ShadowContextProps {
  shadowStyle: ViewStyle;
}

const ShadowContext = createContext<ShadowContextProps | undefined>(undefined);

export const ShadowProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const shadowStyle: ViewStyle = {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 6,
  };

  return (
    <ShadowContext.Provider value={{ shadowStyle }}>
      {children}
    </ShadowContext.Provider>
  );
};

export const useShadow = () => {
  const context = useContext(ShadowContext);
  if (!context) {
    throw new Error("useShadow must be used within a ShadowProvider");
  }
  return context;
};
