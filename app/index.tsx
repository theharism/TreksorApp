import Button from "@/components/ui/Button";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>TREKSOR</Text>
      <Text style={styles.subHeading}>A Personal Development App For Men</Text>
      <View style={styles.buttonContainer}>
        <Button onPress={() => router.push("/login")}>GET STARTED</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: 1,
    color: "#FFFFFF",
    textAlign: "center",
  },
  subHeading: {
    fontSize: 16,
    letterSpacing: 1,
    color: "#FFFFFF",
    textAlign: "center",
    marginVertical: 20,
  },
  buttonContainer: {
    marginBottom: 40,
    alignItems: "center",
  },
});
