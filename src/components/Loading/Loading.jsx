import { ActivityIndicator } from "react-native";
import React from "react";

const Loading = ({ size = "large" }) => {
  return <ActivityIndicator size={size} color="#a6e3a1" />;
};

export default Loading;
