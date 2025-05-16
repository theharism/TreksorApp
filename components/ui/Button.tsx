import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";

type ButtonProps = {
  children: React.ReactNode | string;
  onPress?: () => void;
  loading?: boolean;
};

const Button = ({ children, onPress, loading }: ButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.buttonContainer}
    >
      {/* Outer LinearGradient for the border */}
      <LinearGradient
        colors={["rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0.4)"]}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={styles.borderGradient}
      >
        {/* Inner LinearGradient for the button background */}
        <LinearGradient
          colors={["#262626", "#0a0a0a"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.innerGradient}
        >
            {loading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
            ) : typeof children === "string" ? (
            <Text style={styles.buttonText}>{children}</Text>
            ) : (
            children
            )}
        </LinearGradient>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  buttonContainer: {
    width: width - 40, // Full width minus margins
    height: 56,
    borderRadius: 12,
    overflow: "hidden",
    marginVertical: 10,
  },
  borderGradient: {
    flex: 1,
    borderRadius: 12,
    padding: 1, // This creates the border thickness
  },
  innerGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 11, // Slightly smaller than outer radius
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "500",
    letterSpacing: 1,
    lineHeight: 24,
  },
});

export default Button;
