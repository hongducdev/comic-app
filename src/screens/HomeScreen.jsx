import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Navbar } from "../components/Navbar";
import { getTrending } from "../apis";
import { ComicCard } from "../components/ComicCard";
import { Loading } from "../components/Loading";

const HomeScreen = ({ navigation }) => {
  const [trendingComics, setTrendingComics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchTrendingComics = async () => {
      try {
        const response = await getTrending(1);
        setTrendingComics(response.comics);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching recommended comics: ", error);
      }
    };

    fetchTrendingComics();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        {isLoading ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loading />
          </View>
        ) : (
          <FlatList
            data={trendingComics}
            ListHeaderComponent={
              <View>
                <Text style={styles.titleList}>
                  Các truyện đang hot
                </Text>
              </View>
            }
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ComicCard comic={item} navigation={navigation} />
            )}
            numColumns={2}
            style={styles.listComics}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#303446",
    paddingBottom: 60,
  },
  main: {
    flex: 1,
    paddingHorizontal: 10,
  },
  titleList: {
    fontSize: 20,
    fontFamily: "Inter-Medium",
    color: "#c6d0f5",
    marginBottom: 20,
  },
  listComics: {
    marginTop: 10,
  },
});

export default HomeScreen;
