// "use client";

// import { useMySpaceStore } from "@/store/myspace-store";
// import { MySpace } from "@/types/myspace";
// import { LinearGradient } from "expo-linear-gradient";
// import { router } from "expo-router";
// import { StatusBar } from "expo-status-bar";
// import { useEffect, useState } from "react";
// import {
//   Dimensions,
//   Animated as RNAnimated,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View
// } from "react-native";

// const { width } = Dimensions.get("window");

// export default function MySpaceScreen() {
//   const {myspaces} = useMySpaceStore();
//   const [animatedValues] = useState(
//     myspaces.map(() => new RNAnimated.Value(0))
//   );

//   useEffect(() => {
//     // Stagger the card animations
//     const animations = animatedValues.map((animatedValue, index) =>
//       RNAnimated.timing(animatedValue, {
//         toValue: 1,
//         duration: 600,
//         delay: index * 100,
//         useNativeDriver: true,
//       })
//     );

//     RNAnimated.stagger(80, animations).start();
//   }, []);

//   const renderMySpaces = (mySpace: MySpace, index: number) => {
//     const animatedValue = animatedValues[index];

//     if(!animatedValue)
//       return null;

//     const translateY = animatedValue.interpolate({
//       inputRange: [0, 1],
//       outputRange: [30, 0],
//     });

//     const opacity = animatedValue.interpolate({
//       inputRange: [0, 1],
//       outputRange: [0, 1],
//     });

//     const scale = animatedValue.interpolate({
//       inputRange: [0, 1],
//       outputRange: [0.95, 1],
//     });

//     return (
//       <RNAnimated.View
//         key={mySpace.id}
//         style={[
//           styles.mySpaceCard,
//           {
//             opacity,
//             transform: [{ translateY }, { scale }],
//           },
//         ]}
//       >
//         {/* Outer LinearGradient for the border */}
//         <LinearGradient
//           colors={["rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0.4)"]}
//           start={{ x: 0.2, y: 0 }}
//           end={{ x: 0.8, y: 1 }}
//           style={styles.borderGradient}
//         >
//           {/* Inner LinearGradient for the button background */}
//           <LinearGradient
//             colors={["#262626", "#0a0a0a"]}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//             style={styles.innerGradient}
//           >
//             <View style={styles.card}>
//               <View style={styles.cardHeader}>
//                 <Text style={styles.dateText}>{mySpace.date}</Text>
//                 <View style={styles.mood}>
//                   <Text style={styles.moodText}>{mySpace.mood}</Text>
//                 </View>
//               </View>

//               <Text style={styles.text}>{mySpace.text}</Text>
//             </View>
//           </LinearGradient>
//         </LinearGradient>
//       </RNAnimated.View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar style="light" />

//       <TouchableOpacity style={styles.newEntry} onPress={()=>router.push("/mental/myspace/new-entry")}>
//         <Text style={styles.newEntryText}>New Entry</Text>
//       </TouchableOpacity>

//       {/* Thoughts List */}
//       <ScrollView
//         style={styles.content}
//         contentContainerStyle={{
//           paddingHorizontal: 20,
//           paddingVertical: 10,
//           gap: 16,
//         }}
//         showsVerticalScrollIndicator={false}
//         // showsVerticalScrollIndicator={false}
//       >
//         {myspaces.map((mySpace, index) =>
//           renderMySpaces(mySpace, index)
//         )}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#02050C",
//   },
//   content: {
//     flex: 1,
//     paddingTop: 10,
//   },
//   cardHeader: {
//     marginBottom: 16,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   cardFooter: {
//     justifyContent: "flex-end",
//     alignItems: "flex-end",
//     marginTop: 16,
//   },
//   dateText: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#EFB33F",
//   },
//   text: {
//     fontSize: 18,
//     color: "#FFFFFF",
//     lineHeight: 31,
//     textAlign: "left",
//     letterSpacing: 1,
//   },
//   borderGradient: {
//     borderRadius: 12,
//     padding: 1,
//   },
//   innerGradient: {
//     borderRadius: 11,
//     minHeight: 120, // Add minimum height
//   },
//   mySpaceCard: {
//     width: width - 40, // Account for horizontal padding
//     borderRadius: 12,
//     overflow: "hidden",
//   },
//   card: {
//     width: "100%",
//     padding: 20, // Add padding back
//   },
//   newEntry: {
//     height:60,
//     width: width - 40,
//     backgroundColor: "#EFB33F",
//     borderRadius: 12,
//     alignItems:'center',
//     justifyContent:'center',
//     alignSelf: 'center',
//     marginTop: 10,
//   },
//   newEntryText: {
//     fontWeight: 'semibold',
//     fontSize: 18,
//   },
//   mood: {
//     height: 20,
//     borderRadius: 100,
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.2)',
//     backgroundColor: 'rgba(239, 179, 63, 0.2)',
//     minWidth: 60,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   moodText: {
//     color: '#FFFFFF',
//     fontSize: 10,
//     lineHeight: 16,
//   },
// });

"use client"

import EntryOptionsModal from "@/components/EntryOptionsModal"
import { useMySpaceStore } from "@/store/myspace-store"
import type { MySpace } from "@/types/myspace"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { router } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useEffect, useState } from "react"
import {
  Dimensions,
  Animated as RNAnimated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"

const { width } = Dimensions.get("window")

export default function MySpaceScreen() {
  const { myspaces, deleteMySpace } = useMySpaceStore()
  const [animatedValues] = useState(myspaces.map(() => new RNAnimated.Value(0)))
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null)
  const [showOptionsModal, setShowOptionsModal] = useState(false)

  useEffect(() => {
    // Stagger the card animations
    const animations = animatedValues.map((animatedValue, index) =>
      RNAnimated.timing(animatedValue, {
        toValue: 1,
        duration: 600,
        delay: index * 100,
        useNativeDriver: true,
      }),
    )

    RNAnimated.stagger(80, animations).start()
  }, [])

  const handleLongPress = (entryId: string) => {
    setSelectedEntry(entryId)
    setShowOptionsModal(true)
  }

  const handleView = () => {
    if (selectedEntry) {
      router.push(`/mental/myspace/view-entry/${selectedEntry}`)
    }
  }

  const handleEdit = () => {
    if (selectedEntry) {
      router.push(`/mental/myspace/edit-entry/${selectedEntry}`)
    }
  }

  const handleDelete = () => {
    if (selectedEntry) {
      deleteMySpace(selectedEntry)
    }
  }

  const renderMySpaces = (mySpace: MySpace, index: number) => {
    const animatedValue = animatedValues[index]

    if (!animatedValue) return null

    const translateY = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [30, 0],
    })

    const opacity = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    })

    const scale = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.95, 1],
    })

    return (
      <RNAnimated.View
        key={mySpace.id}
        style={[
          styles.mySpaceCard,
          {
            opacity,
            transform: [{ translateY }, { scale }],
          },
        ]}
      >
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
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push(`/mental/myspace/view-entry/${mySpace.id}`)}
              onLongPress={() => handleLongPress(mySpace.id)}
              activeOpacity={0.8}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.dateText}>{mySpace.date}</Text>
                <View style={styles.cardActions}>
                  <View style={styles.mood}>
                    <Text style={styles.moodText}>{mySpace.mood}</Text>
                  </View>
                  <TouchableOpacity style={styles.moreButton} onPress={() => handleLongPress(mySpace.id)}>
                    <Ionicons name="ellipsis-vertical" size={16} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              </View>

              <Text style={styles.text} numberOfLines={3}>
                {mySpace.text}
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </LinearGradient>
      </RNAnimated.View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <TouchableOpacity style={styles.newEntry} onPress={() => router.push("/mental/myspace/new-entry")}>
        <Text style={styles.newEntryText}>New Entry</Text>
      </TouchableOpacity>

      {/* Thoughts List */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          gap: 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        {myspaces.map((mySpace, index) => renderMySpaces(mySpace, index))}
      </ScrollView>

      {/* Options Modal */}
      <EntryOptionsModal
        visible={showOptionsModal}
        onClose={() => {
          setShowOptionsModal(false)
          setSelectedEntry(null)
        }}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        entryId={selectedEntry || ""}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#02050C",
  },
  content: {
    flex: 1,
    paddingTop: 10,
  },
  cardHeader: {
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#EFB33F",
  },
  text: {
    fontSize: 18,
    color: "#FFFFFF",
    lineHeight: 31,
    textAlign: "left",
    letterSpacing: 1,
  },
  borderGradient: {
    borderRadius: 12,
    padding: 1,
  },
  innerGradient: {
    borderRadius: 11,
    minHeight: 120,
  },
  mySpaceCard: {
    width: width - 40,
    borderRadius: 12,
    overflow: "hidden",
  },
  card: {
    width: "100%",
    padding: 20,
  },
  newEntry: {
    height: 60,
    width: width - 40,
    backgroundColor: "#EFB33F",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 10,
  },
  newEntryText: {
    fontWeight: "600",
    fontSize: 18,
  },
  mood: {
    height: 20,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    backgroundColor: "rgba(239, 179, 63, 0.2)",
    minWidth: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  moodText: {
    color: "#FFFFFF",
    fontSize: 10,
    lineHeight: 16,
  },
  moreButton: {
    padding: 4,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
})
