import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { getChapter } from "../apis";
import { ChapterImage } from "../components/Chapter";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Loading } from "../components/Loading";

const ChapterScreen = ({ route, navigation }) => {
  const { chapterId, comicId } = route.params;
  const flatListRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previousOffset, setPreviousOffset] = useState(0);
  const [chapter, setChapter] = useState([]);
  const [nextChapter, setNextChapter] = useState(null);
  const [prevChapter, setPrevChapter] = useState(null);

  const fetchChapter = async () => {
    setIsLoading(true);
    try {
      const fetchedChapter = await getChapter(comicId, chapterId);
      setChapter(fetchedChapter);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const changeChapter = async (selectedChapterId) => {
    try {
      const fetchedChapter = await getChapter(comicId, selectedChapterId);
      setChapter(fetchedChapter.images);
      navigation.setParams({ chapterId: selectedChapterId });
    } catch (error) {
      console.log(error);
    }
  };

  const scrollToTop = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    }
  };

  useEffect(() => {
    fetchChapter();
  }, [chapterId, comicId]);

  useEffect(() => {
    if (chapter && chapter.chapters) {
      const currentIndex = chapter.chapters.findIndex(
        (chapter) => chapter.id === +chapterId
      );
      const nextChapter =
        currentIndex !== -1 ? chapter.chapters[currentIndex - 1] : null;
      const prevChapter =
        currentIndex !== -1 ? chapter.chapters[currentIndex + 1] : null;
      setNextChapter(nextChapter);
      setPrevChapter(prevChapter);
    }
  }, [chapterId, chapter]);

  return (
    <View style={{ flex: 1, backgroundColor: "#303446" }}>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#303446",
          }}
        >
          <Loading />
        </View>
      ) : (
        <>
          <View style={styles.navigationButtonsContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <Ionicons
                name="home"
                size={20}
                style={{
                  backgroundColor: "#a6d189",
                  padding: 8,
                  borderRadius: 5,
                  alignItems: "center",
                  color: "#303446",
                }}
              />
            </TouchableOpacity>
            {/* back */}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ComicDetail", {
                  comicId: comicId,
                })
              }
            >
              <Ionicons
                name="arrow-back"
                size={20}
                style={{
                  backgroundColor: "#a6d189",
                  padding: 8,
                  borderRadius: 5,
                  alignItems: "center",
                  color: "#303446",
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => changeChapter(prevChapter?.id)}
              style={[
                styles.navigationButton,
                !prevChapter && styles.disabledButton,
              ]}
              disabled={!prevChapter}
            >
              <Text style={styles.navigationButtonText}>
                Quay lại
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => changeChapter(nextChapter?.id)}
              style={[
                styles.navigationButton,
                !nextChapter && styles.disabledButton,
              ]}
              disabled={!nextChapter}
            >
              <Text style={styles.navigationButtonText}>
                Tiếp theo
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            ref={flatListRef}
            data={chapter.images}
            keyExtractor={(item) => item.page.toString()}
            renderItem={({ item }) => <ChapterImage url={item.src} />}
            style={{ padding: 10 }}
          />
          <TouchableOpacity
            onPress={scrollToTop}
            style={styles.scrollToTopButton}
          >
            <Text style={styles.scrollToTopText}>
              <Ionicons name="arrow-up" size={20} color="white" />
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollToTopButton: {
    position: "absolute",
    bottom: 30,
    right: 16,
    backgroundColor: "#a6d189",
    opacity: 0.8,
    padding: 10,
    borderRadius: 5,
  },
  scrollToTopText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  navigationButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    backgroundColor: "#232634",
  },
  navigationButton: {
    backgroundColor: "#a6d189",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
    color: "#c6d0f5",
  },
  disabledButton: {
    backgroundColor: "#838ba7",
  },
  navigationButtonText: {
    color: "#303446",
  },
});

export default ChapterScreen;
