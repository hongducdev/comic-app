import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { convertStatus, formatNumber } from "../../utils/functions";

const Information = ({ comic, navigation }) => {
  return (
    <>
      <Image source={{ uri: comic?.thumbnail }} style={styles.thumbnail} />
      <View style={{ flexDirection: "column", gap: 5 }}>
        <Text style={styles.title}>{comic?.title}</Text>
        <Text style={styles.infoItemText}>
          <Text style={styles.infoItemTitle}>Tác giả: </Text>
          {comic?.authors}
        </Text>
        <Text style={styles.infoItemText}>
          <Text style={styles.infoItemTitle}>Tình trạng: </Text>
          {convertStatus(comic?.status)}
        </Text>
        <Text style={styles.infoItemTitle}>Thể loại: </Text>
        <View style={styles.genreContainer}>
          {comic?.genres.map((genre) => (
            <TouchableOpacity
              key={genre.id}
              onPress={() =>
                navigation.navigate("Genre", { genreId: genre.id })
              }
            >
              <Text style={styles.genreText}>{genre.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.infoItemText}>
          <Text style={styles.infoItemTitle}>Lượt xem: </Text>
          {formatNumber(comic?.total_views)}
        </Text>
        <Text style={styles.infoItemText}>
          <Text style={styles.infoItemTitle}>Mô tả: </Text>
          {comic?.description}
        </Text>
      </View>
    </>
  );
};

export default Information;

const styles = StyleSheet.create({
  thumbnail: {
    width: 250,
    height: 350,
    borderRadius: 10,
    alignSelf: "center",
    resizeMode: "contain",
  },
  title: {
    fontFamily: "Inter-Bold",
    fontSize: 24,
    marginTop: 20,
    color: "#a6d189",
  },
  infoItemTitle: {
    fontFamily: "Inter-Bold",
    color: "#838ba7",
  },
  infoItemText: {
    fontFamily: "Inter-Regular",
    color: "#c6d0f5",
  },
  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  genreText: {
    fontFamily: "Inter-Regular",
    color: "#c6d0f5",
    backgroundColor: "#51576d",
    padding: 5,
    borderRadius: 5,
  },
});
