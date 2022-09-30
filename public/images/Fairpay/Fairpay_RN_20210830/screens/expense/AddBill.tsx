import React, {memo} from 'react';
import {Image, TouchableOpacity, View, StyleSheet} from 'react-native';
import {
  useStyleSheet,
  StyleService,
  TopNavigation,
} from '@ui-kitten/components';
import {useTranslation} from 'react-i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  useNavigation,
  NavigationProp,
  useRoute,
} from '@react-navigation/native';
import useToggle from 'hooks/useToggle';

import Text from 'components/Text';
import Container from 'components/Container';
import NavigationAction from 'components/NavigationAction';
import * as ImagePicker from 'react-native-image-picker';
import {Action} from 'screens/profile/ProfileEdit';

import {Images} from 'assets/images';
import {ExpenseStackParamList, AddBillNavigationProps} from 'navigation/types';
import FocusAwareStatusBar from 'components/FocusAwareStatusBar';
import {RNCamera, TakePictureResponse} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import {Callback, ImagePickerResponse} from 'react-native-image-picker';

const AddBill = memo(() => {
  const {top, bottom} = useSafeAreaInsets();
  const {t} = useTranslation('addBill');
  const {navigate} = useNavigation<NavigationProp<ExpenseStackParamList>>();
  const styles = useStyleSheet(themedStyles);
  const route = useRoute<AddBillNavigationProps>();

  const [{cameraRef}, {takePicture}] = useCamera();
  const [hasPermission, setHasPermission] = React.useState<boolean>();
  const [flash, setFlash] = React.useState(false);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const actions: Action = {
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
    },
  };
  const [response, setResponse] = React.useState<ImagePickerResponse>();

  const handleAuto = React.useCallback(() => {}, []);

  const handlePickImage = React.useCallback((type, options) => {
    ImagePicker.launchImageLibrary(options, res => {
      const data = res;
      navigate('EditBill', {bill: data.assets});
      setResponse(res);
    });
  }, []);
  const handleChosePhoto = React.useCallback(async () => {
    handlePickImage(actions.type, actions.options);
  }, []);
  React.useEffect(() => {
    if (flash === true) {
      RNCamera.Constants.FlashMode.on;
      setFlash(true);
    } else {
      RNCamera.Constants.FlashMode.off;
      setFlash(false);
    }
  }, [flash]);
  const handleTakePicture = React.useCallback(async () => {
    const data = await takePicture();
    if (route.params.bill) {
      let arr = route.params.bill;

      if (data) {
        let bill = [...arr, data];
        // @ts-ignore
        navigate('EditBill', {bill: bill});
      }
    } else {
      if (data) {
        let bill = [data];
        navigate('EditBill', {bill: bill});
      }
    }
  }, [route.params.bill]);

  return (
    <Container useSafeArea={false} style={styles.container}>
      <FocusAwareStatusBar barStyle={'light-content'} />
      <RNCamera
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        flashMode={flash === true ? 'torch' : 'off'}
        ref={cameraRef}
        type={RNCamera.Constants.Type.back}
        style={styles.camera}>
        <View style={[styles.top, {paddingTop: top}]}>
          <TopNavigation
            style={styles.header}
            accessoryLeft={() => <NavigationAction icon="close" />}
            accessoryRight={() => (
              <NavigationAction
                title={t('auto')}
                titleStatus="white"
                onPress={handleAuto}
              />
            )}
          />
        </View>

        <View style={[styles.bottom, {paddingBottom: bottom + 12}]}>
          <View style={styles.imageView}>
            <TouchableOpacity
              onPress={() => handleChosePhoto()}
              activeOpacity={0.7}>
              <Image
                // @ts-ignore
                style={styles.image}
                source={Images.default}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.viewButton}>
            <View style={styles.buttonBorder}>
              <TouchableOpacity
                onPress={() => handleTakePicture()}
                activeOpacity={0.7}
                style={styles.button}
              />
            </View>
          </View>
          <View style={styles.flashView}>
            <NavigationAction
              icon={flash ? 'flashOn' : 'flashOff'}
              onPress={() => setFlash(!flash)}
            />
          </View>
        </View>
      </RNCamera>
    </Container>
  );
});

export default AddBill;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  camera: {
    flex: 1,
  },
  top: {
    backgroundColor: 'rgba(30, 31, 32, 0.24)',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
  },
  header: {
    backgroundColor: 'transparent',
  },
  bottom: {
    backgroundColor: 'rgba(30, 31, 32, 0.24)',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 12,
  },
  viewButton: {
    flex: 1,
    alignItems: 'center',
  },
  buttonBorder: {
    width: 72,
    height: 72,
    backgroundColor: 'transparent',
    borderRadius: 72,
    borderWidth: 6,
    borderColor: 'color-primary-500',
    padding: 2,
    justifyContent: 'center',
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 56,
    backgroundColor: 'color-basic-100',
  },
  imageView: {
    flex: 1,
  },
  image: {
    width: 48,
    height: 48,
  },
  box: {
    width: 48,
    height: 48,
  },
  flashView: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
