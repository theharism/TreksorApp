"use client"

import { workoutContent } from "@/mock/workouts"
import { useWorkoutStore } from "@/store/workout-store"
import { Ionicons } from "@expo/vector-icons"
import { useEvent } from "expo"
import { BlurView } from "expo-blur"
import { LinearGradient } from "expo-linear-gradient"
import { router, useLocalSearchParams } from "expo-router"
import * as Speech from 'expo-speech'
import { StatusBar } from "expo-status-bar"
import { useVideoPlayer, VideoView } from "expo-video"
import { useEffect, useState } from "react"
import {
  Dimensions,
  Pressable,
  Animated as RNAnimated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
const { width, height } = Dimensions.get("window")

interface WorkoutStats {
  burn: string
  time: string
}

interface WorkoutGoals {
  title: string
  items: string[]
}

interface WorkoutContentData {
  description: string
  goals: WorkoutGoals
}

interface WorkoutInfo {
  id: string
  title: string
  videoUrl: string
  stats: WorkoutStats
  content: WorkoutContentData
}

export default function WorkoutInfoScreen() {
  const insets = useSafeAreaInsets()
  const { id } = useLocalSearchParams()
  const {workouts, updateExerciseStatus} = useWorkoutStore();
  const [workout, setWorkout] = useState<WorkoutInfo | null>(null)
  const [isRead, setIsRead] = useState(false)
  const [fadeAnim] = useState(new RNAnimated.Value(0))
  const [slideAnim] = useState(new RNAnimated.Value(30))

  const player = useVideoPlayer("https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", player => {
    player.loop = true;
    player.play();
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  useEffect(() => {
    // Load workout content based on ID
    const workoutKey = id as keyof typeof workoutContent
    if (workoutContent[workoutKey]) {
      const workoutInfo = workoutContent[workoutKey] as WorkoutInfo
      setWorkout(workoutInfo)

      // Start entrance animations
      RNAnimated.parallel([
        RNAnimated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        RNAnimated.timing(slideAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start()
    }
  }, [id])

  const handleBackPress = () => {
    router.back()
  }

  const handleMarkAsRead = () => {
    setIsRead(true)
    // Here you could save the read status to storage
    console.log("Marked as read:", workout?.title)
    updateExerciseStatus(id as string,"pull-ups-or-lat-pulldown")
  }

  const handlePlayVideo = () => {
    console.log("Play workout video:", workout?.title)
    // Navigate to video player or open video
    if (isPlaying) {
        player.pause();
      } else {
        player.play();
      }
  }

  const handleSpeak = (title: string, description: string, goals: string[]) => {
    const goalsText = goals.map((goal, i) => `Goal ${i + 1}: ${goal}`).join('. ');
    const speechText = `${title}. ${description.replace(/<[^>]+>/g, '')}. ${goalsText}`;
    Speech.speak(speechText);
  };

  // Parse HTML content (simple implementation)
  const parseHTMLContent = (htmlString: string) => {
    // Remove HTML tags for React Native Text component
    return htmlString.replace(/<[^>]*>/g, "")
  }

  if (!workout) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <StatusBar style="light" />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading workout info...</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="light" />

      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{workout.title}</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <RNAnimated.View
          style={[
            styles.animatedContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Video/Image Section */}
          <View style={styles.videoSection}>
            {/* <Image source={{ uri: workout.videoUrl }} style={styles.videoThumbnail} /> */}
            <VideoView style={styles.video} player={player} allowsFullscreen allowsPictureInPicture />
            {/* {!isPlaying && <TouchableOpacity style={styles.playButton} onPress={handlePlayVideo} activeOpacity={0.8}>
              <BlurView intensity={20} style={styles.playButtonBlur}>
                <Ionicons name="play" size={32} color="#FFFFFF" />
              </BlurView>
            </TouchableOpacity>} */}

            {/* Stats Overlay */}
            <View style={styles.statsOverlay}>
              <BlurView intensity={40} style={styles.statsBlur}>
                <View style={styles.statsContainer}>
                  <View style={styles.statItem}>
                    <Ionicons name="flame" size={20} color="#F39C12" />
                    <Text style={styles.statLabel}>Burn</Text>
                    <Text style={styles.statValue}>{workout.stats.burn}</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Ionicons name="time" size={20} color="#F39C12" />
                    <Text style={styles.statLabel}>Time</Text>
                    <Text style={styles.statValue}>{workout.stats.time}</Text>
                  </View>
                </View>
              </BlurView>
            </View>
          </View>

          {/* Content Section */}
          <View style={styles.contentSection}>
            <View style={styles.titleRow}>
              <Text style={styles.workoutTitle}>{workout.title}</Text>
              <Pressable onPress={() => handleSpeak(workout.title, workout.content.description, workout.content.goals.items)}>
                <Ionicons name="volume-high-outline" size={24} color="gray" />
              </Pressable>
            </View>

            <Text style={styles.description}>{parseHTMLContent(workout.content.description)}</Text>

            <View style={styles.goalsSection}>
              <Text style={styles.goalsTitle}>{workout.content.goals.title}</Text>
              {workout.content.goals.items.map((goal, index) => (
                <View key={index} style={styles.goalItem}>
                  <View style={styles.bulletPoint} />
                  <Text style={styles.goalText}>{goal}</Text>
                </View>
              ))}
            </View>
          </View>
        </RNAnimated.View>
      </ScrollView>

      {/* Mark as Read Button */}
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  headerSpacer: {
    width: 34,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  animatedContainer: {
    flex: 1,
  },
  videoSection: {
    position: "relative",
    height: height * 0.35,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    overflow: "hidden",
  },
  videoThumbnail: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  playButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -30 }, { translateY: -30 }],
  },
  playButtonBlur: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  statsOverlay: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  statsBlur: {
    borderRadius: 12,
    overflow: "hidden",
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  statLabel: {
    color: "#FFFFFF",
    fontSize: 14,
    marginLeft: 8,
    marginRight: 4,
  },
  statValue: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  statDivider: {
    width: 1,
    height: 20,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    marginHorizontal: 15,
  },
  contentSection: {
    padding: 20,
  },
  workoutTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  description: {
    fontSize: 16,
    color: "#CCCCCC",
    lineHeight: 24,
    marginBottom: 24,
  },
  goalsSection: {
    marginTop: 8,
  },
  goalsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  goalItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#F39C12",
    marginTop: 8,
    marginRight: 12,
  },
  goalText: {
    fontSize: 16,
    color: "#CCCCCC",
    lineHeight: 24,
    flex: 1,
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
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  video: {
    width: "100%",
    height: 275,
    borderRadius:12,
  },
  controlsContainer: {
    padding: 10,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },  
})
