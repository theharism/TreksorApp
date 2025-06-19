export default {
  "expo": {
    "name": "TreksorApp",
    "slug": "TreksorApp",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "treksorapp",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.treksor.app",
      "googleServicesFile": process.env.GOOGLE_SERVICES_INFOPLIST
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "edgeToEdgeEnabled": true,
      "package": "com.treksor.app",
      "googleServicesFile": process.env.GOOGLE_SERVICES_JSON
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/splash-icon.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#ffffff"
        }
      ],
      [
        "expo-video",
        {
          "supportsBackgroundPlayback": true,
          "supportsPictureInPicture": true
        }
      ],
      [
        "@react-native-google-signin/google-signin"
      ]
    ],
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      "router": {},
      "eas": {
        "projectId": "f85180bc-a756-4c74-bddc-59615dab92af"
      }
    }
  }
}
