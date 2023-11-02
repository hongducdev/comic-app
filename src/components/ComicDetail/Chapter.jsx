import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

const Chapter = ({ navigation, item, comicId }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Chapter", {
          chapterId: item.id,
          comicId: comicId,
        })
      }
      style={styles.container}
    >
      <Text style={styles.text}>{item.name}</Text>
    </TouchableOpacity>
  );
};

export default Chapter;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#51576d",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 5,
    flex: 0.5,
    alignItems: "center",
    color: "#000",
  },
  text: {
    fontFamily: "Inter-Regular",
    color: "#c6d0f5",
  },
});
