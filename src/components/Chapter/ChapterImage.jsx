import { Dimensions, Image } from "react-native";

const ChapterImage = ({ url }) => {
  const width = Dimensions.get("window").width;

  return (
    <Image
      source={{ uri: url }}
      style={{ width: width, minHeight: 500, resizeMode: "stretch" }}
    />
  );
};

export default ChapterImage;
