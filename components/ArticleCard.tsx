import { Article } from "@/types/article";
// import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const ArticleCard = ({
  item,
  handleArticlePress,
}: {
  item: Article;
  handleArticlePress: (item: Article) => void;
}) => {
  // Construct full image URL
  const imageUrl = `https://app.treksor.com/${item.image}`;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => handleArticlePress(item)}
      style={styles.articleCard}
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
          <View style={styles.cardContent}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: imageUrl }}
                style={styles.articleImage}
                resizeMode="cover"
              />
            </View>

            <View style={styles.textContent}>
              <Text style={styles.articleTitle} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.articleDescription} numberOfLines={3}>
                {item.description}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ArticleCard;

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  articleCard: {
    width: width - 20, // Full width minus margins
    height: 180,
    borderRadius: 12,
    overflow: "hidden",
  },
  borderGradient: {
    flex: 1,
    borderRadius: 12,
    padding: 1, // This creates the border thickness
  },
  innerGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 11, // Slightly smaller than outer radius
  },
  cardContent: {
    flexDirection: "row",
    alignItems:'center',
  },
  imageContainer: {
    width: "43%",
    height: "100%",
    borderRadius: 12,
    overflow: "hidden",
  },
  articleImage: {
    width: "100%",
    height: "100%",
  },
  textContent: {
    flex: 1,
    justifyContent: "space-between",
    height:150,
    gap:8,
    textAlign:'left',
    marginHorizontal:16
  },
  articleTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    lineHeight: 28,
  },
  articleDescription: {
    fontSize: 16,
    color: "#FFFFFF",
    lineHeight: 28,
  },
});
