import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const Navbar = () => {
  return (
    <View style={styles.navbar}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 5,
          alignItems: "center",
        }}
      >
        <Icon name="book" size={24} color="#40a02b" />
        <Text style={styles.logo}>Nettruyen</Text>
      </View>
      <Icon name="search" size={24} color="#5c5f77" />
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    padding: 10,
    backgroundColor: "#e6e9ef",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    color: "#40a02b",
    fontSize: 24,
    fontFamily: "Inter-Bold",
  },
});

export default Navbar;
