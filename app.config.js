export default {
  expo: {
    name: "TreksorApp",
    slug: "TreksorApp",
    version: "1.3.0",
    orientation: "portrait",
    icon: "./assets/images/appicon-treksor.png",
    scheme: "treksorapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    splash: {
      image: "./assets/images/splash-treksor.png",
      resizeMode: "contain",
      backgroundColor: "#000000",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.treksor.app",
      googleServicesFile: process.env.GOOGLE_SERVICES_INFOPLIST,
      buildNumber: "7",
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
        NSPhotoLibraryUsageDescription:
          "This app needs access to your photo library to let you pick and upload images.",
        NSCameraUsageDescription:
          "The app needs accesse to your photo library to let you upload/change your profile picture.",
      },
      usesAppleSignIn: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
      package: "com.treksor.app",
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      "expo-web-browser",
      "expo-apple-authentication",
      [
        "expo-image-picker",
        {
          photosPermission:
            "The app accesses your photos to let you change your profile picture.",
        },
      ],
      [
        "expo-video",
        {
          supportsBackgroundPlayback: true,
          supportsPictureInPicture: true,
        },
      ],
      ["@react-native-google-signin/google-signin"],
      [
        "expo-font",
        {
          fonts: ["assets/fonts/Nunito-Regular.ttf"],
          android: {
            fonts: [
              {
                fontFamily: "Nunito-Regular",
                fontDefinitions: [
                  {
                    path: "assets/fonts/Nunito-Regular.ttf",
                    weight: 800,
                  },
                ],
              },
            ],
          },
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {},
      eas: {
        projectId: "d5f9b141-617b-41ca-bed2-0c2fb862c6f8",
      },
      owner: "fahadzahidd24",
    },
  },
};
