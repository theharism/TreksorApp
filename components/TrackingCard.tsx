"use client"

import AnimatedDonutChart from "@/components/ui/Donut"
import { TrackingItem } from "@/types/tracking"
import { LinearGradient } from "expo-linear-gradient"
import { Dimensions, StyleSheet, Text, View } from "react-native"

const { width } = Dimensions.get("window")

interface TrackingCardProps {
  title: string
  percentage: number
  items: TrackingItem[]
  custom: boolean
}

export default function TrackingCard({ title, percentage, items, custom }: TrackingCardProps) {

  const done = items.reduce((count, item) => {
    return count + Object.values(item?.record || {}).filter(t => t === true).length;
  }, 0);
  const total = items.reduce((count, item) => {
    return count + Object.keys(item?.record || {}).length;
  }, 0);

  return (
    <View style={styles.buttonContainer}>
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
          <View style={styles.cardContent}>
            <View style={styles.leftContent}>
              <Text style={styles.title}>{title}</Text>
              <View style={styles.itemsContainer}>
                {items.map((item, index) => (
                  <View key={index} style={styles.itemRow}>
                    <Text style={styles.itemLabel}>{item.label}:</Text>
                  {
                    custom ? <Text style={styles.itemValue}>{done}/{total}</Text> :
                    <Text style={styles.itemValue}>{item.value}</Text> 
                  }
                  </View>
                ))}
              </View>
            </View>
            <AnimatedDonutChart percentage={percentage} size={100} strokeWidth={8} color="#EFB33F" />
          </View>
        </LinearGradient>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: width - 20,
    minHeight: 140,
    borderRadius: 16,
    overflow: "hidden",
    marginVertical: 8,
  },
  borderGradient: {
    flex: 1,
    borderRadius: 16,
    padding: 1,
  },
  innerGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  cardContent: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  leftContent: {
    flex: 1,
    gap: 12,
  },
  title: {
    color: "#EFB33F",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  itemsContainer: {
    gap: 6,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemLabel: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "400",
    marginRight: 4,
  },
  itemValue: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
})
