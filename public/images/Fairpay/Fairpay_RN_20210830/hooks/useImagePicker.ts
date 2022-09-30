import React from 'react';
import {Platform} from 'react-native';
// import * as ImagePicker from "expo-image-picker";
import * as ImagePicker from 'react-native-image-picker';

interface ImageInfo {
  uri: string;
  width: number;
  height: number;
}

type ImagePickerCallBack = (image?: ImageInfo) => void;

const MAX_SIZE = 1024;

//   const onButtonPress = React.useCallback((type, options) => {
//     if (type === 'capture') {
//       ImagePicker.launchCamera(options, setResponse);
//     } else {
//       ImagePicker.launchImageLibrary(options, setResponse);
//     }
//   }, []);
const useImagePicker = () => {
  const resize = async (uri: string, w: number, h: number) => {
    if (w > MAX_SIZE || h > MAX_SIZE) {
      const resize = {
        width: MAX_SIZE,
        height: MAX_SIZE,
      };

      if (w > h) {
        const rate = MAX_SIZE / w;
        resize.height = rate * h;
      } else {
        const rate = MAX_SIZE / h;
        resize.width = rate * w;
      }
      // const manipResult = await ImageManipulator.manipulateAsync(uri, [
      //   {resize},
      // ]);
      // const img: ImageInfo = {
      //   uri: manipResult.uri,
      //   width: manipResult.width,
      //   height: manipResult.height,
      // };
      // return img;
    } else {
      const img: ImageInfo = {
        uri,
        width: w,
        height: h,
      };
      return img;
    }
  };

  const takePhoto = async (
    callback?: ImagePickerCallBack,
    aspect?: [number, number],
  ) => {
    if (Platform.OS !== 'web') {
      const {status} = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
      }
    }
    let result = await ImagePicker.launchCamera(options, setResponse);

    if (result.cancelled) {
      callback && callback();
    } else {
      callback &&
        callback(await resize(result.uri, result.width, result.height));
    }
  };

  const choosePhoto = async (
    callback?: ImagePickerCallBack,
    aspect?: [number, number],
  ) => {
    if (Platform.OS !== 'web') {
      const {status} = await ImagePicker.launchImageLibrary();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect,
      quality: 0.8,
    });

    if (result.cancelled) {
      callback && callback();
    } else {
      callback &&
        callback(await resize(result.uri, result.width, result.height));
    }
  };
  return [takePhoto, choosePhoto];
};

export default useImagePicker;
