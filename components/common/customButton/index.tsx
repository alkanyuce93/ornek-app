import { Text } from "@/components/Themed";
import Colors from "@/constants/Colors";
import React from "react";
import { TouchableOpacity, StyleSheet, ViewStyle } from "react-native";

type CustomButtonProps = {
  onPress: () => void;
  text: string;
  type?: "small" | "medium" | "large" | "exit";
  style?: ViewStyle;
};

export const CustomButton: React.FC<CustomButtonProps> = ({
  onPress,
  text,
  type = "large",
  style,
}) => {
  const buttonStyles =
    type === "small"
      ? [styles.smallButton, style]
      : type === "medium"
      ? [styles.mediumButton, style]
      : type === "exit"
      ? [styles.exitButton, style]
      : [styles.largeButton, style];

  const textStyles =
    type === "small"
      ? styles.smallButtonText
      : type === "medium"
      ? styles.mediumButtonText
      : type === "exit"
      ? styles.exitButtonText
      : styles.largeButtonText;

  return (
    <TouchableOpacity
      style={[
        buttonStyles,
        {
          backgroundColor:
            type === "exit" ? "red" : Colors.light.buttonBackgroundColor,
        },
      ]}
      onPress={onPress}
    >
      <Text style={textStyles}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  smallButton: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    height: 22,
    width: "30%",
  },
  mediumButton: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    height: 30,
    width: "50%",
  },
  largeButton: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: "100%",
  },
  exitButton: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: "100%",
  },
  smallButtonText: {
    color: "white",
    fontSize: 14,
  },
  mediumButtonText: {
    color: "white",
    fontSize: 16,
  },
  largeButtonText: {
    color: "white",
    fontSize: 18,
  },
  exitButtonText: {
    color: "white",
    fontSize: 18,
  },
});
