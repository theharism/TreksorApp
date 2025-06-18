"use client";

import ChatModal from "@/components/ChatModal";
import { useNotifications } from "@/hooks/useNotifications";
import { ritualCards } from "@/mock/rituals";
import { usePowerThoughtStore } from "@/store/thought-store";
import { useUserStore } from "@/store/user-store";
import { PowerThought } from "@/types/powerThought";
import { RitualCard } from "@/types/ritualCard";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView
} from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const cardWidth = (width - 60) / 2; // Account for padding and gap

export default function HomeScreen() {
  const {powerThoughts, fetchPowerThoughts, markPowerThoughtAsRead} = usePowerThoughtStore();
  const [currentThoughtIndex, setCurrentThoughtIndex] = useState(0);
  const thoughtsRef = useRef<FlatList>(null);
  const [expandedThoughts, setExpandedThoughts] = useState<Set<string>>(new Set());
  const {hasPermission, requestPermissions} = useNotifications();
  const {savePushToken} = useUserStore();
  const [showChat, setShowChat] = useState(false)

  useEffect(()=>{
    fetchPowerThoughts();
    if(!hasPermission) {
      requestPermissions().then((token) => {
        if (token) {
          savePushToken({ token });
        }
      })
    }
  },[fetchPowerThoughts, requestPermissions, hasPermission]);

  const toggleExpand = (id: string) => {
    setExpandedThoughts(prev => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const handleMarkAsRead = () => {
    const currentThought = powerThoughts[currentThoughtIndex];
    markPowerThoughtAsRead(currentThought._id);
    // setReadThoughts((prev) => new Set([...prev, currentThought._id]));
  };

  const handleRitualPress = (ritual: RitualCard) => {
    if (ritual.isLocked) {
      return; // Don't navigate if locked
    }
    router.push(ritual.route);
  };

  const renderRitualCard = (ritual: RitualCard) => {
    return (
      <TouchableOpacity
        key={ritual.id}
        style={[styles.ritualCard, { backgroundColor: ritual.backgroundColor }]}
        onPress={() => handleRitualPress(ritual)}
        activeOpacity={0.8}
      >
        {ritual.isLocked ? (
          <ImageBackground
            source={ritual.image}
            style={styles.cardImage}
            imageStyle={styles.cardImageStyle}
          >
            <BlurView intensity={20} style={styles.blurOverlay}>
              <View style={styles.lockedCard}>
                <View style={styles.cardContent}>
                  <Text style={[styles.cardTitle, { marginBottom: 15 }]}>
                    {ritual.title}
                  </Text>
                  <Text style={styles.lockedText}>{ritual.availableDate}</Text>
                </View>
              </View>
            </BlurView>
          </ImageBackground>
        ) : (
          <ImageBackground
            source={ritual.image}
            style={styles.cardImage}
            imageStyle={styles.cardImageStyle}
          >
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.7)"]}
              style={styles.cardGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            >
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{ritual.title}</Text>
                <View style={styles.ritualProgress}>
                  <View style={styles.progressBadge}>
                    <Text style={styles.progressNumber}>
                      {ritual.ritualsCompleted}
                    </Text>
                  </View>
                  <Text style={styles.progressText}>Rituals Done</Text>
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        )}
      </TouchableOpacity>
    );
  };

  const renderPowerThought = ({
    item,
    index,
  }: {
    item: PowerThought;
    index: number;
  }) => {
    const isRead = item.isRead;
    const isExpanded = expandedThoughts.has(item._id);

    return (
      <View style={styles.powerThoughtCard}>
        {/* Outer LinearGradient for the border */}
        <LinearGradient
          colors={["rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0.4)"]}
          start={{ x: 0.2, y: 0 }}
          end={{ x: 0.8, y: 1 }}
          style={styles.borderGradient}
        >
          {/* Inner LinearGradient for the button background */}
          <LinearGradient
            colors={["#262626", "#0a0a0a"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.innerGradient}
          >
            <View>
              <Text style={styles.powerThoughtCategory}>Power Thought</Text>
              <Text style={styles.powerThoughtContent} onPress={() => toggleExpand(item._id)} numberOfLines={isExpanded ? undefined: 3}>{item.thought}</Text>
            </View>
            <TouchableOpacity
              style={[
                styles.markAsReadButton,
                isRead && styles.markAsReadButtonRead,
              ]}
              onPress={handleMarkAsRead}
              disabled={isRead}
            >
              <Ionicons
                name={"checkmark"}
                size={10}
                color={isRead ? "#000" : "#000"}
                style={{
                  backgroundColor: "#EFB33F",
                  borderRadius: 6,
                  borderColor: "#EFB33F",
                }}
              />
              <Text
                style={[
                  styles.markAsReadText,
                  isRead && styles.markAsReadTextRead,
                ]}
              >
                {isRead ? "Read" : "Mark as read"}
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </LinearGradient>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}/>
          {/* <View style={styles.streakContainer}>
            <Text style={styles.streakEmoji}>🔥</Text>
            <Text style={styles.streakText}>4-Day Streak</Text>
          </View>
        </View> */}

        {/* Ritual Cards Grid */}
        <View style={styles.ritualsGrid}>
          <View style={styles.ritualsRow}>
            {renderRitualCard(ritualCards[0])}
            {renderRitualCard(ritualCards[1])}
          </View>
          <View style={styles.ritualsRow}>
            {renderRitualCard(ritualCards[2])}
            {renderRitualCard(ritualCards[3])}
          </View>
        </View>

        {/* Power Thought Section */}
        <View style={styles.powerThoughtSection}>
          <FlatList
            ref={thoughtsRef}
            data={powerThoughts}
            renderItem={renderPowerThought}
            keyExtractor={(item) => item._id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(
                event.nativeEvent.contentOffset.x / width
              );
              setCurrentThoughtIndex(index);
            }}
          />

          {/* Pagination Dots */}
          <View style={styles.paginationContainer}>
            {powerThoughts.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === currentThoughtIndex && styles.paginationDotActive,
                ]}
              />
            ))}
          </View>

          {/* Power Thought Icon */}
          <TouchableOpacity style={styles.powerThoughtIcon} onPress={() => setShowChat(true)}>
              <Image source={require("@/assets/images/chatbot.png")} style={{ width: 75, height: 75 }} />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <ChatModal visible={showChat} onClose={() => setShowChat(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  welcomeSection: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 10,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 15,
  },
  streakContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  streakEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  streakText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  ritualsGrid: {
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  ritualsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  ritualCard: {
    width: cardWidth,
    height: 180,
    borderRadius: 16,
    overflow: "hidden",
  },
  cardImage: {
    flex: 1,
    justifyContent: "flex-end",
  },
  cardImageStyle: {
    borderRadius: 16,
  },
  cardGradient: {
    flex: 1,
    justifyContent: "flex-end",
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  ritualProgress: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    borderColor: "#EFB33F",
    borderWidth: 1,
  },
  progressNumber: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#EFB33F",
  },
  progressText: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.9,
  },
  lockedCard: {
    flex: 1,
    justifyContent: "flex-end",
  },
  blurOverlay: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  lockIcon: {
    marginBottom: 8,
    opacity: 0.7,
  },
  lockedText: {
    color: "#FFFFFF",
    fontSize: 12,
    textAlign: "center",
    opacity: 0.7,
  },
  powerThoughtSection: {
    position: "relative",
    marginBottom: 100,
  },
  powerThoughtCard: {
    minHeight: 200,
    width: width - 40,
    // backgroundColor: "#1A1A1A",
    borderRadius: 16,
    // padding: 20,
    marginHorizontal: 20,
    // borderColor:"gray",
    // borderWidth:1
  },
  powerThoughtCategory: {
    fontSize: 16,
    color: "#EFB33F",
    fontWeight: "600",
    marginBottom: 12,
  },
  powerThoughtContent: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "600",
    lineHeight: 32,
    marginBottom: 20,
    overflow: "hidden",
  },
  markAsReadButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  markAsReadButtonRead: {
    backgroundColor: "rgba(243, 156, 18, 0.2)",
  },
  markAsReadText: {
    color: "#FFFFFF",
    fontSize: 10,
    marginLeft: 6,
  },
  markAsReadTextRead: {
    color: "#000000",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: "#F39C12",
  },
  powerThoughtIcon: {
    position: "absolute",
    bottom: -10,
    left: 10,
  },
  iconGradient: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  borderGradient: {
    borderRadius: 12,
    padding: 1, // This creates the border thickness
    minHeight: 200,
  },
  innerGradient: {
    // flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
    borderRadius: 11, // Slightly smaller than outer radius
    padding: 10,
    minHeight: 200,
    justifyContent:'space-between',
  },
  checkmarkContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#F39C12",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
});
