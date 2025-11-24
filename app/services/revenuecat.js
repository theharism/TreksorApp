import { Platform } from "react-native";
import Purchases, { LOG_LEVEL } from "react-native-purchases";

export async function initRC() {
  await Purchases.setLogLevel(LOG_LEVEL.ERROR);
  await Purchases.configure({
    apiKey: Platform.select({
      ios: "appl_kxtqozOGLNxwGMjPEbTXqYzVZIv",   // your RevenueCat iOS API key
    //   android: "test_AZXCZsABlKeKyQSDbVuRWdpeMoX"
    }),
  });
}

export async function getOfferings() {
    try {
      const offerings = await Purchases.getOfferings();
      console.log("offerings fetched baby>>>", offerings);
      return offerings?.current?.availablePackages || [];
    } catch (e) {
      console.log("Error fetching offerings", e);
      return [];
    }
  }
