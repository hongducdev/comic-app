import { StyleSheet, Text, TouchableOpacity } from "react-native";

const ChapterRange = ({
  range,
  comic,
  displayedChapters,
  handleChapterRangeClick,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        displayedChapters[0]?.id === comic?.chapters[range.start].id &&
          styles.active,
      ]}
      onPress={() => handleChapterRangeClick(range.start, range.end)}
    >
      <Text
        style={[
          styles.text,
          displayedChapters[0]?.id === comic?.chapters[range.start].id &&
            styles.active,
        ]}
      >
        {range.start + 1} - {range.end + 1}
      </Text>
    </TouchableOpacity>
  );
};

export default ChapterRange;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#51576d",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  active: {
    backgroundColor: "#a6d189",
    color: "#232634",
  },
  text: {
    color: "#949cbb",
  },
});
