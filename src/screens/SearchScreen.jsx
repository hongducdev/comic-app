import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getSearch } from "../apis";
import { ComicCard } from "../components/ComicCard";
import { Loading } from "../components/Loading";
import useDebounce from "../hooks/useDebouce"; // Đảm bảo thay đổi đường dẫn tương ứng

const SearchScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  const debouncedSearchText = useDebounce(searchText, 500); // Sử dụng useDebounce

  useEffect(() => {
    fetchData();
  }, [debouncedSearchText, page]);

  const fetchData = async () => {
    if (!debouncedSearchText) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await getSearch(debouncedSearchText, page);
      setSearchedData(response);
      setTotalPages(response.total_pages);
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const nextPage = async () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const previousPage = async () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          placeholderTextColor="#c6d0f5"
          onChangeText={(text) => setSearchText(text)}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={fetchData}
          disabled={isLoading || debouncedSearchText === ""}
        >
          <Ionicons name="search" size={20} />
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <View style={{
          padding: 20
        }}>
          <Loading />
        </View>
      ) : error ? (
        <Text>{error}</Text>
      ) : searchedData?.comics?.length > 0 ? (
        <FlatList
          data={searchedData.comics}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ComicCard comic={item} navigation={navigation} />
          )}
          numColumns={2}
          style={styles.listComics}
          ListFooterComponent={() => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
                marginTop: 10,
                marginBottom: 60,
              }}
            >
              <TouchableOpacity
                style={styles.pageNavigationButton}
                onPress={previousPage}
                disabled={page === 1}
              >
                <Ionicons name="caret-back" size={20} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.pageNavigationButton}
                onPress={nextPage}
                disabled={page === totalPages}
              >
                <Ionicons name="caret-forward" size={20} />
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text
          style={{
            color: "#c6d0f5",
            fontSize: 20,
            textAlign: "center",
            marginTop: 10,
          }}
        >
          Không có kết quả
        </Text>
      )}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#303446",
    paddingBottom: 60,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    maxHeight: 40,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    backgroundColor: "#51576d",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#51576d",
    color: "#c6d0f5",
  },
  searchButton: {
    backgroundColor: "#a6d189",
    padding: 10,
    height: "100%",
    width: 40,
    borderRadius: 5,
    marginLeft: 10,
  },
  listComics: {
    marginTop: 10,
  },
  pageNavigationButton: {
    backgroundColor: "#a6d189",
    padding: 10,
    height: 40,
    width: 40,
    borderRadius: 5,
    marginLeft: 10,
  },
});
