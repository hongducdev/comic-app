import React, { useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator, FlatList } from "react-native";
import { getDetailComic } from "../apis";
import { Navbar } from "../components/Navbar";
import { Chapter, ChapterRange, Information } from "../components/ComicDetail";
import { Loading } from "../components/Loading";

const ComicDetailScreen = ({ route, navigation }) => {
  const { comicId } = route.params;

  const [comic, setComic] = useState("");
  const [firstChapter, setFirstChapter] = useState(null);
  const [displayedChapters, setDisplayedChapters] = useState([]);
  const [chapterRanges, setChapterRanges] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchComic = async () => {
      setIsLoading(true);
      try {
        const fetchedComic = await getDetailComic(comicId);
        setComic(fetchedComic);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchComic();
  }, [comicId]);

  useEffect(() => {
    if (comic) {
      const length = comic?.chapters?.length;
      const firstChapter = comic?.chapters[length - 1];
      setFirstChapter(firstChapter.id);

      const reversedChapters = comic?.chapters.reverse();
      const totalChapters = reversedChapters.length;
      const rangeSize = 50;
      const ranges = [];

      for (let i = 0; i < totalChapters; i += rangeSize) {
        const start = i;
        const end = Math.min(i + rangeSize - 1, totalChapters - 1);
        ranges.push({ start, end });
      }

      setChapterRanges(ranges);
      setDisplayedChapters(
        reversedChapters.slice(ranges[0].start, ranges[0].end + 1)
      );
    }
  }, [comic]);

  const handleChapterRangeClick = (start, end) => {
    setDisplayedChapters(comic?.chapters.slice(start, end + 1));
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        {isLoading ? (
          <Loading />
        ) : (
          comic && (
            <FlatList
              style={styles.main}
              ListHeaderComponent={() => (
                <>
                  <Information comic={comic} navigation={navigation} />
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 10,
                      flexWrap: "wrap",
                      marginVertical: 10,
                    }}
                  >
                    {chapterRanges.map((range) => (
                      <ChapterRange
                        key={range.start}
                        range={range}
                        comic={comic}
                        displayedChapters={displayedChapters}
                        handleChapterRangeClick={handleChapterRangeClick}
                      />
                    ))}
                  </View>
                </>
              )}
              data={displayedChapters}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              renderItem={({ item }) => (
                <Chapter
                  navigation={navigation}
                  item={item}
                  comicId={comic.id}
                />
              )}
            />
          )
        )}
      </View>
    </View>
  );
};

export default ComicDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#303446",
  },
  main: {
    flex: 1,
    padding: 10,
  },
});
