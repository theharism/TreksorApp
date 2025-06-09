import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Dimensions, Image, SafeAreaView, StyleSheet, View } from 'react-native'

const NewEntrySuccessScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.illustrationContainer}>
            <Image
                source={require("@/assets/images/new-entry-success.png")}
                style={styles.illustration}
                resizeMode="contain"
            />
        </View>
    </SafeAreaView>
  )
}

export default NewEntrySuccessScreen

const { width, height } = Dimensions.get("window")

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#02050C",
        alignItems: "center",
        justifyContent: "center",
    },
    illustration: {
        width: width * 0.8,
        height: "100%",
    },
    illustrationContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
})