import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native"; // Added TouchableOpacity
import { convertStatus, formatNumber } from "../../utils/functions";
import Icon from "react-native-vector-icons/FontAwesome5";

const windowWidth = Dimensions.get("window").width;

const ComicCard = ({ comic, navigation }) => {
  const calculateItemWidth = () => {
    // Calculate the item width for a two-column layout with a gap of 10 pixels
    return windowWidth / 2 - 15; // Subtracting padding and gap
  };

  const itemWidth = calculateItemWidth();

  return (
    <TouchableOpacity // Changed View to TouchableOpacity for onPress functionality
      style={[styles.comicItem, { width: itemWidth }]}
      onPress={() =>
        navigation.navigate("ComicDetail", {
          comicId: comic.id,
        })
      }
    >
      <Image source={{ uri: comic.thumbnail }} style={styles.thumbnail} />
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>{convertStatus(comic.status)}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{comic.title}</Text>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
          }}
        >
          <View style={styles.infoItem}>
            <Icon name="eye" style={styles.infoIcon} />
            <Text style={styles.infoText}>
              {formatNumber(comic.total_views)}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Icon name="user-check" style={styles.infoIcon} />
            <Text style={styles.infoText}>{formatNumber(comic.followers)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  comicItem: {
    marginBottom: 10,
    marginRight: 10,
    shadowColor: "#000", // Changed 'boxShadow' to 'shadowColor'
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // Added elevation for Android shadow
    position: "relative",
    borderRadius: 5, // Added borderRadius
    overflow: "hidden", // Added overflow to clip child elements within borderRadius
  },
  thumbnail: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  statusContainer: {
    position: "absolute",
    opacity: 0.9,
    top: 5,
    left: 5,
    backgroundColor: "#fff",
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  statusText: {
    fontFamily: "Inter-Medium",
    fontSize: 12,
    color: "#ff6b81",
  },
  infoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  title: {
    fontFamily: "Inter-Medium",
    fontSize: 16,
    color: "#fff",
    marginBottom: 5,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  infoIcon: {
    fontSize: 12,
    color: "#ddd",
  },
  infoText: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: "#ddd",
  },
});

export default ComicCard;
