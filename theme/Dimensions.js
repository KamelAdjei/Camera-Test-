import { Dimensions } from "react-native";

// DIMENSIONS OF USERS WINDOW
const { height, width } = Dimensions.get("window");

const dim = {
  screenWidth: width,
  screenHeight: height
};

export default dim;
