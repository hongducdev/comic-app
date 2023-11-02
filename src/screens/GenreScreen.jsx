import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { getGenres, getGenre } from "../apis";
import { ComicCard } from "../components/ComicCard";

const GenreScreen = ({ navigation, route }) => {
  const { genreId } = route.params || {};

  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState(genreId || "all");
  const [genreData, setGenreData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchGenres = async () => {
      const genres = await getGenres();
      setGenres(genres);
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const fetchGenre = async () => {
      const genre = await getGenre(selectedGenres);
      if (genre) {
        setGenreData(genre);
        setIsLoading(false);
      } else {
        setGenreData([]);
        setIsLoading(false);
      }
    };
    fetchGenre();
  }, [selectedGenres, genreId]);

  return (
    <View style={styles.container}>
      {genres.length > 0 && (
        <FlatList
          data={genreData.comics}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={() => (
            <View style={styles.genreContainer}>
              {genres.map((genre) => {
                return (
                  <Text
                    key={genre.id}
                    style={[
                      styles.genreItem,
                      {
                        backgroundColor:
                          selectedGenres === genre.id ? "#a6e3a1" : "#51576d",
                        color: selectedGenres === genre.id ? "#000" : "#c6d0f5",
                      },
                    ]}
                    onPress={() => setSelectedGenres(genre.id)}
                  >
                    {genre.name}
                  </Text>
                );
              })}
            </View>
          )}
          renderItem={({ item }) => (
            <View style={styles.comicCardContainer}>
              <ComicCard comic={item} navigation={navigation} />
              {isLoading && (
                <View style={styles.loadingOverlay}>
                  <ActivityIndicator size="small" color="#a6e3a1" />
                </View>
              )}
            </View>
          )}
          numColumns={2}
          style={styles.listComics}
        />
      )}
    </View>
  );
};

export default GenreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingBottom: 60,
    backgroundColor: "#303446",
  },
  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 10,
  },
  genreItem: {
    color: "#000",
    backgroundColor: "#51576d",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  listComics: {
    marginTop: 10,
  },
  comicCardContainer: {
    flex: 1,
    margin: 5,
    position: "relative",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
});
