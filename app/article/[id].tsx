"use client";

import { useArticleStore } from "@/store/article-store";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

const { width } = Dimensions.get("window");

interface Article {
  _id: string;
  category: string;
  title: string;
  description: string;
  body: string;
  image: string;
}

export default function ArticleDetailScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [isRead, setIsRead] = useState(false)
  const { fetchArticleById, loading } = useArticleStore();
  useEffect(() => {
    if (id) {
      fetchArticleById({ id: id as string }).then((res) => {
        if (res) {
          setArticle(res);
        }
      });
    }
  }, [id]);

  const handleMarkAsRead = () => {
    setIsRead(true)
  }

  if (loading) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <StatusBar style="light" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#F39C12" />
          <Text style={styles.loadingText}>Loading article...</Text>
        </View>
      </View>
    );
  }

  const imageUrl = `https://app.treksor.com/${article?.image}`;

  // Create HTML content for WebView to render the body with proper styling
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background-color: #000000;
          color: #FFFFFF;
          margin: 0;
        }
      </style>
    </head>
    <body>
      ${article?.body}
    </body>
    </html>
  `;

  return (
    <View style={[styles.container, { paddingBottom: 100 }]}>
      <StatusBar style="light" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Article Image */}
        <Image
          source={{ uri: imageUrl }}
          style={styles.articleImage}
          resizeMode="cover"
        />

        {/* Article Content */}
        <View style={styles.articleContent}>
          {/* <Text style={styles.category}>{article?.category}</Text> */}
          <Text style={styles.title}>{article?.title}</Text>
          <Text style={styles.description}>{article?.description}</Text>

          {/* Article Body */}
          <View style={styles.bodyContainer}>
            <WebView
              source={{ html: htmlContent }}
              style={styles.webView}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              backgroundColor="transparent"
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomSection}>
          <TouchableOpacity
            style={[styles.markAsReadButton, isRead && styles.markAsReadButtonRead]}
            onPress={handleMarkAsRead}
            disabled={isRead}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={isRead ? ["#4CAF50", "#45A049"] : ["#F39C12", "#E67E22"]}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.buttonText}>{isRead ? "Read ✓" : "Mark as read"}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#AAAAAA",
    fontSize: 16,
    marginTop: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  errorText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginTop: 16,
    textAlign: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  articleImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },
  articleContent: {
    padding: 20,
  },
  category: {
    fontSize: 14,
    color: "#F39C12",
    fontWeight: "600",
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    lineHeight: 28,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: "#FFFFFF",
    lineHeight: 28,
    // marginBottom: 24,
  },
  bodyContainer: {
    minHeight: 200,
  },
  webView: {
    backgroundColor: "transparent",
    height: 400,
  },
  bottomSection: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(10, 10, 10, 0.95)",
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 40,
  },
  markAsReadButton: {
    borderRadius: 12,
    overflow: "hidden",
  },
  markAsReadButtonRead: {
    opacity: 0.8,
  },
  buttonGradient: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "600",
  },
});
