import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getTop } from "../apis";
import { ComicCard } from "../components/ComicCard";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Loading } from "../components/Loading";

const types = [
  {
    id: "daily",
    name: "Ngày",
  },
  {
    id: "weekly",
    name: "Tuần",
  },
  {
    id: "monthly",
    name: "Tháng",
  },
  {
    id: "yearly",
    name: "Năm",
  },
  {
    id: "chapter",
    name: "Chương",
  },
  {
    id: "follow",
    name: "Theo dõi",
  },
];

const statuses = [
  {
    id: "all",
    name: "Tất cả",
  },
  {
    id: "completed",
    name: "Hoàn thành",
  },
  {
    id: "ongoing",
    name: "Đang tiến hành",
  },
];

const TopScreen = ({navigation}) => {
  const [type, setType] = useState("daily");
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("all");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    const fetchComic = async () => {
      setIsLoading(true);
      const fetchedComic = await getTop(type, status, page);
      if (fetchedComic) {
        setData(fetchedComic.comics);
        setTotalPage(fetchedComic.total_pages);
        setIsLoading(false);
      } else {
        setData([]);
        setIsLoading(false);
      }
    };
    fetchComic();
  }, [type, status, page]);

  const nextPage = async () => {
    if (page < totalPage) {
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
      <FlatList
        ListHeaderComponent={
          <View>
            <View style={styles.header}>
              {types.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => setType(item.id)}
                >
                  <Text
                    style={[
                      styles.headerItem,
                      type === item.id && {
                        backgroundColor: "#a6d189",
                        color: "#000",
                      },
                    ]}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View
              style={[
                styles.header,
                {
                  marginTop: 10,
                },
              ]}
            >
              {statuses.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => setStatus(item.id)}
                >
                  <Text
                    style={[
                      styles.headerItem,
                      status === item.id && {
                        backgroundColor: "#a6d189",
                        color: "#000",
                      },
                      {
                        marginBottom: 10,
                      },
                    ]}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        }
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.comicCardContainer}>
            <ComicCard comic={item} navigation={navigation} />
            {isLoading && (
              <View style={styles.loadingOverlay}>
                <Loading />
              </View>
            )}
          </View>
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
              disabled={page === totalPage}
            >
              <Ionicons name="caret-forward" size={20} />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default TopScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#303446",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
  },
  headerItem: {
    backgroundColor: "#51576d",
    padding: 10,
    borderRadius: 10,
    flex: 0.5,
    alignItems: "center",
    fontFamily: "Inter-Regular",
    color: "#c6d0f5",
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
