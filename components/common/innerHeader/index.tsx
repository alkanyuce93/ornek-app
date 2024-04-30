import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { leftArrow } from "@/assets/images";

interface InnerHeaderProps {
  headerTitle: string;
  onBackPress?: () => void;
  isBack?: boolean;
  onRightPress?: () => void;
  paddingTop?: number;
}

const { width, height } = Dimensions.get("window");

export const InnerHeader: React.FC<InnerHeaderProps> = ({
  headerTitle,
  onBackPress,
  isBack = true,
  onRightPress,
  paddingTop = height * 0.01,
}) => {
  const router = useRouter();

  const handleBackPress = () => {
    onBackPress ? onBackPress() : router.back();
  };

  const renderLeftComponent = () => {
    if (isBack) {
      return (
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Image source={leftArrow} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
      );
    }
    return <View style={{ flex: 1 }} />;
  };

  const renderRightComponent = () => {
    if (onRightPress) {
      return (
        <TouchableOpacity onPress={onRightPress} style={styles.rightButton} />
      );
    }
    return <View style={{ flex: 1 }} />;
  };

  return (
    <View style={[styles.innerHeader, { paddingTop }]}>
      {renderLeftComponent()}

      <Text style={styles.headerText}>{headerTitle}</Text>

      {renderRightComponent()}
    </View>
  );
};

const styles = StyleSheet.create({
  innerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    width: width,
  },
  backButton: {
    marginRight: 8,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "500",
    flex: 8,
    textAlign: "center",
  },
  rightButton: {
    flex: 1,
    alignItems: "flex-end",
  },
});

export default InnerHeader;
