import React, { Component } from "react";
import { TouchableOpacity, View, ImageBackground } from "react-native";
import { RNCamera as Camera } from "react-native-camera";
import RNTextDetector from "react-native-text-detector";
import style, { screenHeight, screenWidth } from "./styles";

const PICTURE_OPTIONS = {
  quality: 1, 
  fixOrientation: true,
  forceUpOrientation: true
};

export default class Cameranice extends Component {

  state = {
    loading: false,
    image: null,
    error: null,
    visionResp: []
  };

 //ERROR
//Handles error situation at any stage of the process

  reset(error = "OTHER") {
    this.setState(
      {
        loading: false,
        image: null,
        error
      },
      () => {
     
      }
    );
  }


   // CAPTURE IMAGE/TAKE PICTURE
   // Responsible for getting image from react native camera
  
  takePicture = async camera => {
    this.setState({
      loading: true
    });
    try {
      const data = await camera.takePictureAsync(PICTURE_OPTIONS);
      if (!data.uri) {
        throw "OTHER";
      }
      this.setState(
        {
          image: data.uri
        },
        () => {
          console.log(data.uri);
          this.processImage(data.uri, {
            height: data.height,
            width: data.width
          });
        }
      );
    } catch (e) {
      console.warn(e);
      this.reset(e);
    }
  };


  //PROCESSING IMAGE CAPTURED
   // Responsible for getting image from react native camera and
   // starting image processing.
  
   //  {string} uri              Path for the image to be processed
   //  {object} imageProperties  Other properties of image to be processed
 
  processImage = async (uri, imageProperties) => {
    const visionResp = await RNTextDetector.detectFromUri(uri);
    console.log(visionResp);
    if (!(visionResp && visionResp.length > 0)) {
      
      throw "Could not detect any text";    //Message shown if no text is detected

    }
    this.setState({
      visionResp: this.mapVisionRespToScreen(visionResp, imageProperties)
    });
  };

  /**
 
   *MAP RESPONSE FROM RN TEXT DETECTOR TO SCREEN
   SHOW RESULTS ON SCREEN

   * Converts RNTextDetectors response in representable form for
   * device's screen in accordance with the dimensions of image
   * used to processing.
   
     {array}  visionResp       Response from RNTextDetector
     {object} imageProperties  Other properties of image to be processed
   */

  mapVisionRespToScreen = (visionResp, imageProperties) => {
    const IMAGE_TO_SCREEN_Y = screenHeight / imageProperties.height;
    const IMAGE_TO_SCREEN_X = screenWidth / imageProperties.width;

    return visionResp.map(item => {
      return {
        ...item,
        position: {
          width: item.bounding.width * IMAGE_TO_SCREEN_X,
          left: item.bounding.left * IMAGE_TO_SCREEN_X,
          height: item.bounding.height * IMAGE_TO_SCREEN_Y,
          top: item.bounding.top * IMAGE_TO_SCREEN_Y
        }
      };
    });
  };

//REACT NATIVE RENDER FUNCTION

  render() {
    return (
      <View style={style.screen}>
        {!this.state.image ? (
          <Camera
            ref={cam => {
              this.camera = cam;
            }}
            key="camera"
            style={style.camera}//How the Camera looks like
            type={Camera.Constants.Type.back}//specify which camera to use - the back camera
            notAuthorizedView={null}
            flashMode={Camera.Constants.FlashMode.auto} //phone will decide based on lighting conditions
            androidCameraPermissionOptions={{
              title: 'Permission to access camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}//Permission to use camera message
            playSoundOnCapture
          >

            {({ camera, status }) => {
              if (status !== "READY") {
                return null;
              }
              return (
                <View style={style.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => this.takePicture(camera)}
                    style={style.button}
                  />
                </View>
              );//Snap Button 
            }}
          </Camera>
        ) : null}
        {this.state.image ? (
          <ImageBackground
            source={{ uri: this.state.image }}
            style={style.imageBackground}
            key="image"
            resizeMode="cover"
          >
            {this.state.visionResp.map(item => {
              return (
                <TouchableOpacity
                  style={[style.boundingRect, item.position]}
                  key={item.text}
                />
              );
            })}
          </ImageBackground>
        ) : null}
      </View>
    );
  }
}
