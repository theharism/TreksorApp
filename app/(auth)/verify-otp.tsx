"use client"

import { Ionicons } from "@expo/vector-icons"
import { router, useLocalSearchParams } from "expo-router"
import { StatusBar } from "expo-status-bar"
import React, { useEffect, useRef, useState } from "react"
import {
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native"

import Button from "@/components/ui/Button"
import OtpInput from "@/components/ui/OtpInput"
import { useAuthStore } from "@/store/auth-store"

export default function VerifyOtp() {
  const { verifyOtp, loading, getCurrentUser, requestOtp, requestResetPassword} = useAuthStore();
  const params = useLocalSearchParams()
  const { email, purpose = "registration" } = params

  const [otp, setOtp] = useState("")
  const [error, setError] = useState("")
  const [timeLeft, setTimeLeft] = useState(30)
  const [canResend, setCanResend] = useState(false)
  const timerRef = useRef<number | null>(null)

  // Animation values
  const fadeAnim = React.useRef(new Animated.Value(0)).current
  const slideAnim = React.useRef(new Animated.Value(50)).current

  useEffect(() => {
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

    // Start countdown timer
    startTimer()

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  const startTimer = () => {
    setTimeLeft(30)
    setCanResend(false)

    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current!)
          setCanResend(true)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)
  }

  const handleVerify = () => {
    Keyboard.dismiss()

    if (!otp || otp.length !== 4) {
      setError("Please enter a valid 4-digit code")
      return
    }

    setError("")

    verifyOtp({ email: email as string, otp }).then((token)=>{
      if(purpose === 'reset-password')
      {
        router.push({ pathname: "/(auth)/reset-password", params: { token } });
      }
      else {
        getCurrentUser();
      }
    })
  }

  const handleResendCode = () => {
    if (!canResend) return

    if(purpose === 'reset-password')
    {
      requestResetPassword({ email: email as string })
    }
    else{
      requestOtp({ email: email as string });
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.overlay} />
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.iconContainer}>
            <Ionicons name="shield-checkmark-outline" size={60} color="#3498db" />
          </View>

          <Text style={styles.heading}>Verification Code</Text>
          <Text style={styles.subHeading}>
            We've sent a 4-digit code to {email}. Enter the code below to verify your{" "}
            {purpose === "reset-password" ? "identity" : "account"}.
          </Text>

          <OtpInput codeLength={4} onCodeFilled={setOtp} error={!!error} />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Button onPress={handleVerify} loading={loading}>
            VERIFY
          </Button>

          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>Didn't receive the code? </Text>
            {canResend ? (
              <TouchableOpacity onPress={handleResendCode} disabled={loading}>
                <Text style={styles.resendButton}>Resend Code</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.timerText}>Resend in {formatTime(timeLeft)}</Text>
            )}
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
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
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(52, 152, 219, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
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
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
  },
  resendContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  resendText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 14,
  },
  resendButton: {
    color: "#3498db",
    fontSize: 14,
    fontWeight: "bold",
  },
  timerText: {
    color: "#3498db",
    fontSize: 14,
  },
})
