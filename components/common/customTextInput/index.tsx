import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import React, { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  ViewStyle,
  TextInput,
} from "react-native";
import { eye, eyeSlash } from "@/assets/images";

type CustomTextInputProps = {
  title?: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  image?: number;
  isPassword?: boolean;
  style?: ViewStyle;
  editable?: boolean;
};

export const CustomTextInput: React.FC<CustomTextInputProps> = ({
  title,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  isPassword = false,
  image,
  style,
  editable = true,
}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(isPassword);

  const handleImagePress = () => {
    if (isPassword) {
      setSecureTextEntry((prev) => !prev);
    }
  };

  const getImageSource = () => {
    return isPassword ? (secureTextEntry ? eyeSlash : eye) : image;
  };

  const handleTextChange = (text: string) => {
    const transformedText =
      keyboardType === "email-address" ? text.toLowerCase() : text;

    onChangeText(transformedText);
  };

  return (
    <View style={[styles.inputContainer, style]}>
      {title && <Text style={[styles.title]}>{title}</Text>}
      <View style={[styles.inputRow]}>
        <TextInput
          style={[styles.input, style]}
          placeholder={placeholder}
          placeholderTextColor={Colors.light.borderColor}
          value={value}
          onChangeText={handleTextChange}
          keyboardType={keyboardType}
          secureTextEntry={isPassword ? secureTextEntry : false}
          editable={editable}
        />
        {isPassword && (
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={handleImagePress}
          >
            <Image source={getImageSource()} style={styles.image} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
    width: "100%",
  },
  title: {
    fontSize: 18,
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.light.borderColor,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    height: 40,
    fontSize: 16,
  },
  imageContainer: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -10 }],
  },
  image: {
    width: 20,
    height: 20,
  },
});
