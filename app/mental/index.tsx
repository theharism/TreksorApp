import Button from "@/components/ui/Button";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BodyHome = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {/* <ImageBackground
        source={require("@/assets/images/body-home.png")}
        contentFit="cover"
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle}
      > */}
        {/* <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
          <TouchableOpacity style={styles.backButton} onPress={()=>router.back()}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>MENTAL</Text>
          <View style={styles.headerSpacer} />
        </View> */}
        <View style={[styles.content, { paddingBottom: insets.bottom + 30 }]}>
          {/* <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <AnimatedDonutChart
                percentage={60}
                size={250}
                strokeWidth={25}
                color="#EFB33F"
            />
          </View> */}
          <Button onPress={()=>router.push("/mental/thoughts")} icon={require("@/assets/images/mental-power-thoughts.png")}>Power Thoughts</Button>
          <Button onPress={()=>router.push("/mental/articles")} icon={require("@/assets/images/mental-articles.png")}>Articles</Button>
          <Button onPress={()=>router.push("/mental/myspace")} icon={require("@/assets/images/mental-my-space.png")}>My Space</Button>
        </View>
      {/* </ImageBackground> */}
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
