"use client"

import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { useEffect } from "react"
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import Button from "@/components/ui/Button"
import { useAuthStore } from "@/store/auth-store"

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const {isAuthenticated, logout, user, loading, requestResetPassword} = useAuthStore();

  // Check if user is authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login")
    }
  }, [isAuthenticated])

  const handleEditProfile = () => {
    router.push("/profile/edit")
  }

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => logout(),
        },
      ],
      { cancelable: true },
    )
  }

  const handleChangePassword = () => {
    requestResetPassword({ email: user.email, isChangePassword: true })
      .then(() => {
          router.push({ pathname: "/(auth)/verify-otp", params: { email:user.email, purpose: 'reset-password' } });
      })
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView style={styles.content}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarSection}>
            {user.avatar ? (
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
              </View>
            )}
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>

          <Button onPress={handleEditProfile} size="small" style={styles.editButton}>
            EDIT PROFILE
          </Button>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>

          <TouchableOpacity style={styles.menuItem} onPress={handleEditProfile}>
            <Ionicons name="person-outline" size={22} color="#FFFFFF" style={styles.menuIcon} />
            <Text style={styles.menuText}>Personal Information</Text>
            <Ionicons name="chevron-forward" size={20} color="#AAAAAA" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleChangePassword}>
            <Ionicons name="lock-closed-outline" size={22} color="#FFFFFF" style={styles.menuIcon} />
            <Text style={styles.menuText}>Change Password</Text>
            <Ionicons name="chevron-forward" size={20} color="#AAAAAA" />
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.menuItem} onPress={() => router.push("/profile/notifications")}>
            <Ionicons name="notifications-outline" size={22} color="#FFFFFF" style={styles.menuIcon} />
            <Text style={styles.menuText}>Notification Settings</Text>
            <Ionicons name="chevron-forward" size={20} color="#AAAAAA" />
          </TouchableOpacity> */}
        </View>

        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>App</Text>

          <TouchableOpacity style={styles.menuItem} onPress={() => router.push("/profile/preferences")}>
            <Ionicons name="settings-outline" size={22} color="#FFFFFF" style={styles.menuIcon} />
            <Text style={styles.menuText}>Preferences</Text>
            <Ionicons name="chevron-forward" size={20} color="#AAAAAA" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => router.push("/help")}>
            <Ionicons name="help-circle-outline" size={22} color="#FFFFFF" style={styles.menuIcon} />
            <Text style={styles.menuText}>Help & Support</Text>
            <Ionicons name="chevron-forward" size={20} color="#AAAAAA" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => router.push("/about")}>
            <Ionicons name="information-circle-outline" size={22} color="#FFFFFF" style={styles.menuIcon} />
            <Text style={styles.menuText}>About</Text>
            <Ionicons name="chevron-forward" size={20} color="#AAAAAA" />
          </TouchableOpacity>
        </View> */}

        <View style={styles.logoutSection}>
          <Button onPress={handleLogout} variant="outline" loading={loading} style={styles.logoutButton}>
            LOGOUT
          </Button>

          <Text style={styles.versionText}>Treksor v1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    padding: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  avatarSection: {
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#3498db",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  profileInfo: {
    alignItems: "center",
    marginBottom: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "#AAAAAA",
  },
  editButton: {
    width: 150,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 15,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A1A1A",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  menuIcon: {
    marginRight: 15,
  },
  menuText: {
    color: "#FFFFFF",
    fontSize: 16,
    flex: 1,
  },
  logoutSection: {
    padding: 20,
    alignItems: "center",
  },
  logoutButton: {
    marginBottom: 20,
  },
  versionText: {
    color: "#666666",
    fontSize: 14,
  },
})
