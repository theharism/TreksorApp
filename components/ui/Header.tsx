"use client"

import { useAuthStore } from "@/store/auth-store"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { router } from "expo-router"
import type React from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

interface HeaderProps {
  title?: string
  showAvatar?: boolean
  showBackButton?: boolean
  onBackPress?: () => void
}

const Header: React.FC<HeaderProps> = ({
  title,
  showAvatar = true,
  showBackButton = false,
  onBackPress,
}) => {
  const insets = useSafeAreaInsets()
  const {user} = useAuthStore();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress()
    } else {
      router.back()
    }
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  const displayName = user?.name ? user.name.split(" ")[0] : "there"
  const imageUrl = `https://app.treksor.com/${user?.avatar}`;

  return (
    <LinearGradient
      colors={["rgba(0,0,0,0.9)", "rgba(0,0,0,0.7)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={[styles.container, { paddingTop: insets.top }]}
    >

      {/* Header Content */}
      <View style={styles.headerContent}>
        {showBackButton ? (
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        ) : null}

        <View style={styles.titleContainer}>
          {!title && (
            <View style={{flexDirection:'row'}}>
              <Text style={styles.title}>{`${getGreeting()},`}{" "}</Text>
              <Text style={styles.title}>{displayName}</Text>
            </View>
          )}
          {title && (
            <>
              <Text style={styles.title}>{title}</Text>
            </>
          )}
        </View>

        {showAvatar && (
          <TouchableOpacity style={styles.avatarContainer} onPress={() => router.push("/profile")} activeOpacity={0.8}>
            {user?.avatar ? (
              <Image source={{ uri: imageUrl }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>{displayName.charAt(0)}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingTop: 15,
    paddingBottom: 5,
  },
  backButton: {
    padding: 5,
    marginRight: 10,
  },
  titleContainer: {
    flex: 1,
  },
  greeting: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
    opacity: 0.9,
  },
  name: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#3498db",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#3498db",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  title:{
    textAlign:'center',
    fontWeight:'bold',
    fontSize: 22,
    color: "#FFFFFF",
  }
})

export default Header
