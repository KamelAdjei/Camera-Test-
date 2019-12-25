import { StyleSheet } from "react-native";
import Dimensions from "./theme/Dimensions";

export const screenHeight = Dimensions.screenHeight;
export const screenWidth = Dimensions.screenWidth;

const styles = StyleSheet.create({

  //SCREEN 
  screen: {
    backgroundColor: "#FF6600",
    flex: 1
  },

  //CAMERA SCREEN
  camera: {
    position: "absolute",
    width: Dimensions.screenWidth,
    height: Dimensions.screenHeight,
    alignItems: "center",
    justifyContent: "center",
    top: 0,
    left: 0,
    flex: 1,
    },
    
    //IMAGE
  imageBackground: {
    position: "absolute",
    width: Dimensions.screenWidth,
    height: Dimensions.screenHeight,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    top: 0,
    left: 0
  },

  //CAMERA SNAP BUTTON CONTAINER
  buttonContainer: {
    width: 70,
    height: 70,
    backgroundColor: "#ffffff",
    borderRadius: 35,
    position: "absolute",
    bottom: 36,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50   //MARGIN
  }, 

   //CAMERA SNAP BUTTON
  button: {
    width: 64,
    height: 64,
    backgroundColor: "#ffffff",
    borderRadius: 32,
    borderWidth: 4,
    borderColor: "#FF6600",//Button border color

  },

  //BOUNDARIES DISPLAYING DETECTED TEXT
  boundingRect: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FF6600"
  }
});

export default styles;
