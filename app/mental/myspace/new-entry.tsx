"use client"

import { useMySpaceStore } from "@/store/myspace-store"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useState } from "react"
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const { width, height } = Dimensions.get("window")

// List of mood options
const moodOptions = ["Happy", "Sad", "Stressed", "Anxious", "Calm", "Frustrated", "Grateful", "Tired"]

export default function NewEntryScreen() {
  const insets = useSafeAreaInsets()
  const [mood, setMood] = useState("Happy")
  const {addMySpace} = useMySpaceStore();
  const [entryText, setEntryText] = useState("")
  const [showMoodDropdown, setShowMoodDropdown] = useState(false)

  const handleAddEntry = () => {
    // Here you would save the entry with the selected mood and text
    console.log("Adding entry with mood:", mood, "and text:", entryText)
    addMySpace({mood,text:entryText})
    // Navigate back after saving
    router.push('/mental/myspace/new-entry-success');
  }

  const selectMood = (selectedMood: string) => {
    setMood(selectedMood)
    setShowMoodDropdown(false)
  }

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="light" />

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoid}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
      
          {/* Illustration */}
          <View style={styles.illustrationContainer}>
            <Image
              source={require("@/assets/images/new-entry.png")}
              style={styles.illustration}
              resizeMode="contain"
            />
          </View>

          {/* Mood Selector */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Select Mood</Text>
            <TouchableOpacity style={styles.dropdownButton} onPress={() => setShowMoodDropdown(!showMoodDropdown)}>
              <Text style={styles.dropdownButtonText}>{mood}</Text>
              <Ionicons name={showMoodDropdown ? "chevron-up" : "chevron-down"} size={20} color="#E5B94B" />
            </TouchableOpacity>

            {showMoodDropdown && (
              <ScrollView style={styles.dropdownMenu}>
                {moodOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[styles.dropdownItem, mood === option && styles.dropdownItemSelected]}
                    onPress={() => selectMood(option)}
                  >
                    <Text style={[styles.dropdownItemText, mood === option && styles.dropdownItemTextSelected]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>

          {/* Entry Text Input */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Add entry text</Text>
            <TextInput
              style={styles.textInput}
              multiline
              placeholder="Write your thoughts here..."
              placeholderTextColor="#666"
              value={entryText}
              onChangeText={setEntryText}
              textAlignVertical="top"
            />
          </View>

          {/* Add Button */}
          <TouchableOpacity style={styles.addButton} onPress={handleAddEntry} activeOpacity={0.8}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#02050C",
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  illustrationContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    height: height * 0.25, // Responsive height
  },
  illustration: {
    width: width * 0.8,
    height: "100%",
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1A1A1A",
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: "#333",
  },
  dropdownButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  dropdownMenu: {
    backgroundColor: "#1A1A1A",
    borderRadius: 10,
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#333",
    maxHeight: 200,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  dropdownItemSelected: {
    backgroundColor: "rgba(229, 185, 75, 0.2)",
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  dropdownItemTextSelected: {
    color: "#E5B94B",
  },
  textInput: {
    backgroundColor: "#1A1A1A",
    borderRadius: 10,
    padding: 15,
    color: "#FFFFFF",
    fontSize: 16,
    minHeight: 150,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#333",
  },
  addButton: {
    backgroundColor: "#EFB33F",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
  },
})
