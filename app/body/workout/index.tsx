import { Ionicons } from "@expo/vector-icons";
import { ImageBackground } from "expo-image";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Selection = () => {
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
                {/* Header */}
          <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
          <TouchableOpacity style={styles.backButton} onPress={()=>router.back()}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>WORKOUT</Text>
          <View style={styles.headerSpacer} />
        </View>
        <View style={[styles.content, { paddingBottom: insets.bottom + 30 }]}>
          <TouchableOpacity
            onPress={() => router.push("/body/workout/workouts")}
            style={styles.gymButtonContainer}
          >
            <Text style={styles.gymButtonText}>PUSH</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/body/workout/workouts")}
            style={styles.gymButtonContainer}
          >
            <Text style={styles.gymButtonText}>PULL</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/body/workout/workouts")}
            style={styles.gymButtonContainer}
          >
            <Text style={styles.gymButtonText}>LEGS</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.otherButtonContainer}
          >
            <Text style={styles.otherButtonText}>REST</Text>
          </TouchableOpacity>
          <Text style={{color:"#FFFFFF", textAlign:"center", marginTop:20}}>
            Recommendations:
            Perform this workout twice per week for optimal strength and recovery
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Selection;

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
  gymButtonContainer: {
    width: width - 40, // Full width minus margins
    height: 56,
    borderRadius: 12,
    overflow: "hidden",
    marginVertical: 10,
    backgroundColor: "#EFB33F",
    alignItems:'center',
    justifyContent:'center'
  },
  otherButtonContainer: {
    width: width - 40, // Full width minus margins
    height: 56,
    borderRadius: 12,
    overflow: "hidden",
    marginVertical: 10,
    backgroundColor: "#303030",
    alignItems:'center',
    justifyContent:'center',
  },
  gymButtonText: {
    color: "#000000",
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 1,
    lineHeight: 24,
  },
  otherButtonText: {
    color: "#EFB33F",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
    lineHeight: 24,
  },
  otherButtonSubText: {
    color: "#FFFFFF",
    fontSize: 14  ,
    fontWeight: "bold",
    letterSpacing: 1,
    lineHeight: 24,
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
