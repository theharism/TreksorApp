"use client";

import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const cardWidth = (width - 60) / 2; // Account for padding and gap

interface RitualCard {
  id: string;
  title: string;
  ritualsCompleted: number;
  totalRituals: number;
  image: any;
  isLocked?: boolean;
  availableDate?: string;
  backgroundColor: string;
  route: string;
}

interface PowerThought {
  id: string;
  category: string;
  title: string;
  content: string;
  isRead: boolean;
}

const ritualCards: RitualCard[] = [
  {
    id: "body",
    title: "Body",
    ritualsCompleted: 3,
    totalRituals: 5,
    image: require("@/assets/images/body-ritual.png"),
    backgroundColor: "#2D4A3E",
    route: "/body",
  },
  {
    id: "mental",
    title: "Mental",
    ritualsCompleted: 5,
    totalRituals: 7,
    image: require("@/assets/images/mental-ritual.png"),
    backgroundColor: "#3D3D3D",
    route: "/body",
  },
  {
    id: "spiritual",
    title: "Spiritual",
    ritualsCompleted: 3,
    totalRituals: 4,
    image: require("@/assets/images/spiritual-ritual.png"),
    backgroundColor: "#4A3D2D",
    route: "/body",
  },
  {
    id: "purpose",
    title: "Purpose",
    ritualsCompleted: 0,
    totalRituals: 0,
    image: require("@/assets/images/locked-ritual.png"),
    isLocked: true,
    availableDate: "Available August 2025",
    backgroundColor: "#2D2D2D",
    route: "/body",
  },
];

const powerThoughts: PowerThought[] = [
  {
    id: "1",
    category: "Power Thought",
    title: "Discipline",
    content: "Discipline is remembering what you want.",
    isRead: false,
  },
  {
    id: "2",
    category: "Daily Wisdom",
    title: "Growth",
    content: "The only way to grow is to step outside your comfort zone.",
    isRead: false,
  },
  {
    id: "3",
    category: "Motivation",
    title: "Success",
    content: "Success is the sum of small efforts repeated day in and day out.",
    isRead: false,
  },
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [currentThoughtIndex, setCurrentThoughtIndex] = useState(0);
  const [readThoughts, setReadThoughts] = useState<Set<string>>(new Set());
  const thoughtsRef = useRef<FlatList>(null);

  const handleMarkAsRead = () => {
    const currentThought = powerThoughts[currentThoughtIndex];
    setReadThoughts((prev) => new Set([...prev, currentThought.id]));
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
    const isRead = readThoughts.has(item.id);

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
            <Text style={styles.powerThoughtCategory}>{item.category}</Text>
            <Text style={styles.powerThoughtContent}>{item.content}</Text>
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

  // const renderPowerThought = ({
  //   item,
  //   index,
  // }: {
  //   item: PowerThought
  //   index: number
  // }) => {
  //   const isRead = readThoughts.has(item.id)

  //   return (
  //     <View style={styles.powerThoughtCard}>

  //       <Text style={styles.powerThoughtCategory}>{item.category}</Text>
  //       <Text style={styles.powerThoughtContent}>{item.content}</Text>

  //       <TouchableOpacity
  //         style={[styles.markAsReadButton, isRead && styles.markAsReadButtonRead]}
  //         onPress={handleMarkAsRead}
  //         disabled={isRead}
  //       >
  //         <View style={styles.checkmarkContainer}>
  //           <Ionicons name="checkmark" size={12} color="#000000" />
  //         </View>
  //         <Text style={[styles.markAsReadText, isRead && styles.markAsReadTextRead]}>
  //           {isRead ? "Read" : "Mark as read"}
  //         </Text>
  //       </TouchableOpacity>
  //     </View>
  //   )
  // }

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <View style={styles.streakContainer}>
            <Text style={styles.streakEmoji}>🔥</Text>
            <Text style={styles.streakText}>4-Day Streak</Text>
          </View>
        </View>

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
            keyExtractor={(item) => item.id}
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
          {/* <View style={styles.powerThoughtIcon}>
            <LinearGradient
              colors={["#F39C12", "#E67E22"]}
              style={styles.iconGradient}
            >
              <Ionicons name="bulb" size={24} color="#000000" />
            </LinearGradient>
          </View> */}
        </View>
      </ScrollView>
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
    paddingBottom: 30,
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
    color: "#F39C12",
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
    bottom: 60,
    left: 40,
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
  },
  innerGradient: {
    // flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
    borderRadius: 11, // Slightly smaller than outer radius
    padding: 10,
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
