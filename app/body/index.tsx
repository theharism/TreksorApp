import Button from "@/components/ui/Button";
import { Ionicons } from "@expo/vector-icons";
import { ImageBackground } from "expo-image";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BodyHome = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground
        source={require("@/assets/images/body-home.png")}
        contentFit="cover"
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle}
      >
        <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
          <TouchableOpacity style={styles.backButton} onPress={()=>router.back()}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>BODY</Text>
          <View style={styles.headerSpacer} />
        </View>
        <View style={[styles.content, { paddingBottom: insets.bottom + 30 }]}>
          <Button onPress={()=>router.push("/body/workout/selection")} icon={require("@/assets/images/dumbbell.png")}>WORKOUT</Button>
          <Button onPress={()=>router.push("/body/nutrition")} icon={require("@/assets/images/food-items.png")}>NUTRITION</Button>
          <Button icon={require("@/assets/images/articles.png")}>ARTICLES</Button>
        </View>
      </ImageBackground>
    </View>
  );
};

export default BodyHome;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width,
    height,
  },
  imageStyle: {
    opacity: 1,
  },
  scrollView: {
    flex: 1,
    justifyContent: "center",
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  headerSpacer: {
    width: 34,
  },
});
