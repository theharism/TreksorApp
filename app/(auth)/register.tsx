import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { StatusBar } from "expo-status-bar"
import React, { useState } from "react"
import {
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native"

import Button from "@/components/ui/Button"
import TextInput from "@/components/ui/TextInput"
import { useAuthStore } from "@/store/auth-store"

export default function Register() {
  const {register, requestOtp, loading} = useAuthStore();
  const [step, setStep] = useState(1)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  // const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  // Animation values
  const fadeAnim = React.useRef(new Animated.Value(0)).current
  const slideAnim = React.useRef(new Animated.Value(50)).current

  React.useEffect(() => {
    // Start animations when component mounts
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  const validateStep1 = () => {
    let valid = true
    const newErrors = { ...errors }

    // Name validation
    if (!name.trim()) {
      newErrors.name = "Name is required"
      valid = false
    } else {
      newErrors.name = ""
    }

    // Email validation
    if (!email) {
      newErrors.email = "Email is required"
      valid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid"
      valid = false
    } else {
      newErrors.email = ""
    }

    setErrors(newErrors)
    return valid
  }

  const validateStep2 = () => {
    let valid = true
    const newErrors = { ...errors }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required"
      valid = false
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
      valid = false
    } else {
      newErrors.password = ""
    }

    // Confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
      valid = false
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match"
      valid = false
    } else {
      newErrors.confirmPassword = ""
    }

    setErrors(newErrors)
    return valid
  }

  const handleNextStep = () => {
    Keyboard.dismiss()

    if (validateStep1()) {
      // Animate transition to next step
      Animated.sequence([
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnim, {
            toValue: -50,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(slideAnim, {
          toValue: 50,
          duration: 0,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setStep(2)
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start()
      })
    }
  }

  const handlePrevStep = () => {
    // Animate transition to previous step
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 50,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(slideAnim, {
        toValue: -50,
        duration: 0,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setStep(1)
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start()
    })
  }

  const handleRegister = () => {
    Keyboard.dismiss()

    if (validateStep2()) {
      register({
        name,
        email,
        password,
        role: "user",
      }).then(() => {
        requestOtp({email}).then(() => {
          router.push({ pathname: "/(auth)/verify-otp", params: { email } });
        })
      })
    }
  }

  return (
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.overlay} />
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <Animated.View
            style={[
              styles.content,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <TouchableOpacity style={styles.backButton} onPress={() => (step === 1 ? router.back() : handlePrevStep())}>
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>

            <View style={styles.stepIndicator}>
              <View style={[styles.stepDot, step >= 1 && styles.activeStepDot]} />
              <View style={styles.stepLine} />
              <View style={[styles.stepDot, step >= 2 && styles.activeStepDot]} />
            </View>

            <Text style={styles.heading}>{step === 1 ? "Create Account" : "Set Password"}</Text>
            <Text style={styles.subHeading}>
              {step === 1 ? "Let's get started with your journey" : "Choose a strong password to secure your account"}
            </Text>

            <View style={styles.form}>
              {step === 1 ? (
                <>
                  <TextInput
                    placeholder="Full Name"
                    value={name}
                    onChangeText={setName}
                    icon="person-outline"
                    error={errors.name}
                  />

                  <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    icon="mail-outline"
                    error={errors.email}
                  />

                  <Button onPress={handleNextStep}>CONTINUE</Button>
                </>
              ) : (
                <>
                  <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    icon="lock-closed-outline"
                    error={errors.password}
                  />

                  <TextInput
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    icon="shield-checkmark-outline"
                    error={errors.confirmPassword}
                  />

                  <Button onPress={handleRegister} loading={loading}>
                    CREATE ACCOUNT
                  </Button>
                </>
              )}
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.push("/login")}>
                <Text style={styles.signInText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // adjust opacity as needed
    zIndex: -1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },
  stepIndicator: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  stepDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  activeStepDot: {
    backgroundColor: "#3498db",
  },
  stepLine: {
    width: 50,
    height: 2,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    marginHorizontal: 5,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  subHeading: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  form: {
    width: "100%",
    alignItems: "center",
  },
  footer: {
    flexDirection: "row",
    marginTop: 30,
  },
  footerText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 14,
  },
  signInText: {
    color: "#3498db",
    fontSize: 14,
    fontWeight: "bold",
  },
})
