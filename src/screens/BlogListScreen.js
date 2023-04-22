import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Image,
  StyleSheet,
  Button,
  Switch,
} from "react-native";
import BlogContext from "../context/BlogContext";
import DarkModeContext from "../../DarkModeContext";

const BlogListScreen = ({ navigation }) => {
  const { blogPosts, setBlogPosts } = useContext(BlogContext);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://www.lenasoftware.com/api/v1/en/maestro/1?page=1&count=10`
      );
      const jsonResponse = await response.json();

      const newBlogPosts = jsonResponse.result;
      setBlogPosts(newBlogPosts);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center", marginRight: 20 }}>
          <Text style={{ fontSize:16, marginRight: 10, color: isDarkMode ? "#f5dd4b" : "black" }}>
            {isDarkMode ? "Light" : "Dark"}
          </Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleDarkMode}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
          />
        </View>
      ),
    });
  }, [navigation, isDarkMode, toggleDarkMode]);
  

  const renderItem = ({ item }) => {
    if (!item) return null;
    const imageUrl = item.image;

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("BlogDetail", {
            content: item.content,
            imageUrl: item.image,
          })
        }
        style={styles(isDarkMode).card}
      >
        <Image
          source={{ uri: imageUrl }}
          style={styles(isDarkMode).cardImage} // İstenilen boyutlara göre stil ayarlayabilirsiniz
          resizeMode="cover"
        />
        <View style={styles(isDarkMode).cardContent}>
          <Text style={styles(isDarkMode).cardTitle}>{item.title}</Text>
          <Text style={styles(isDarkMode).cardSummary}>{item.summary}</Text>
          <Text style={styles(isDarkMode).cardReadingTime}>
            {item.totalReadingTime
              ? `${item.totalReadingTime} dakika okuma süresi`
              : ""}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        data={blogPosts.filter((post) => post)}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.postId}_${index}`}
        onEndReached={() => {
          setPage(page + 1);
          fetchBlogPosts();
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading && <ActivityIndicator />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={async () => {
              setRefreshing(true);
              await fetchBlogPosts();
              setRefreshing(false);
            }}
            colors={["#0000ff"]}
            tintColor={"#0000ff"}
          />
        }
      />
    </View>
  );
};

const styles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? "#000" : "#fff",
    },
    card: {
      backgroundColor: isDarkMode ? "#333" : "#fff",
      borderRadius: 5,
      overflow: "hidden",
      marginBottom: 20,
    },
    cardImage: {
      width: "100%",
      height: 200,
    },
    cardContent: {
      padding: 15,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
      color: isDarkMode ? "#fff" : "#000",
    },
    cardSummary: {
      fontSize: 14,
      marginBottom: 5,
      color: isDarkMode ? "#ddd" : "#000",
    },
    cardReadingTime: {
      fontSize: 18,
      color: isDarkMode ? "#999999" : "#999999",
    },
  });

export default BlogListScreen;
