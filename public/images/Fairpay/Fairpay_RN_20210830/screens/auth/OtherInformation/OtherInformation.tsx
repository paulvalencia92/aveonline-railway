import React, {memo} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {
  Avatar,
  Button,
  Icon,
  Input,
  TopNavigation,
  useTheme,
} from '@ui-kitten/components';

import Text from 'components/Text';
import Container from 'components/Container';
import NavigationAction from 'components/NavigationAction';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Images} from 'assets/images';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import PrimaryCurrency from './PrimaryCurrency';
import {DATA_FLAG, PRIMARY_CURRENCY} from 'constants/Data';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from 'navigation/types';
import ModalPanel from 'components/ModalPanel';
import useModalize from 'hooks/useModalize';
import CurrencyCountry from './CurrencyCountry';
import {Action, FlagProps} from 'constants/Types';
import useAppTheme from 'hooks/useAppTheme';
import * as ImagePicker from 'react-native-image-picker';

import {ImagePickerResponse} from 'react-native-image-picker';
interface ItemCurrency<T = any> {
  data?: Array<T>;
}
const OtherInformation = memo(({data}: ItemCurrency<FlagProps>) => {
  const {t} = useTranslation(['login', 'modalScreen', 'otherInformation']);
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();
  const {theme} = useAppTheme();
  const themes = useTheme();
  const {modalizeRef, open, close} = useModalize();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [response, setResponse] = React.useState<ImagePickerResponse>();
  const onButtonPress = React.useCallback((type, options) => {
    ImagePicker.launchImageLibrary(options, setResponse);
  }, []);
  const actions: Action = {
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
    },
  };
  const {
    control,
    formState: {errors},
  } = useForm({
    defaultValues: {
      fullname: 'Hieu Le Quang',
    },
  });
  const handleDone = React.useCallback(() => {
    navigate('ModalScreen', {
      modalScreen: {
        image: theme === 'dark' ? Images.lightSymbol : Images.darkSymbol,
        title: t('welcome'),
        description: t('modalScreen:registerSuccess'),
        children: [
          {
            title: t('modalScreen:createGroup'),
            onPress: () => navigate('Main', {screen: 'Group'}),
            status: 'primary',
          },
          {
            title: t('modalScreen:goToActivity'),
            onPress: () => navigate('Main', {screen: 'Activity'}),
            status: 'basic',
          },
        ],
      },
    });
  }, []);
  let list = getListFlag();
  return (
    <Container style={styles.container}>
      <TopNavigation accessoryLeft={() => <NavigationAction />} />
      <Text
        marginLeft={32}
        status="basic"
        category="h4"
        marginBottom={8}
        marginTop={8}>
        {t('others')}
      </Text>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.viewAvatar}>
          {response?.assets ? (
            <Avatar
              source={{uri: response.assets[0].uri}}
              size="giant"
              style={styles.avatar}
            />
          ) : (
            <Avatar
              source={Images.avatarCircle}
              size="giant"
              style={styles.avatar}
            />
          )}
          <TouchableOpacity
            onPress={() => onButtonPress(actions.type, actions.options)}
            activeOpacity={0.7}
            style={[
              styles.edit,
              {backgroundColor: themes['color-primary-500']},
            ]}>
            <Icon name="edit16" pack="assets" style={styles.icon} />
          </TouchableOpacity>
        </View>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              keyboardType="email-address"
              label={t('FULL NAME').toString()}
              size="large"
              style={styles.inputBox}
              placeholder={t('yourName')}
            />
          )}
          name="fullname"
        />
        <View style={styles.selectView}>
          <View>
            <Text status="basic" category="h7">
              {t('otherInformation:selectCurrency')}
            </Text>
            <Text marginTop={8} status="body" category="h8-sl">
              {t('otherInformation:changeCurrency')}
            </Text>
          </View>
          <NavigationAction icon="add" onPress={open} status="primary" />
        </View>
        <PrimaryCurrency
          onChangeItem={setCurrentIndex}
          tabActive={currentIndex}
          tab={PRIMARY_CURRENCY}
        />
      </KeyboardAwareScrollView>
      <Button
        activeOpacity={0.7}
        style={styles.buttonBottom}
        accessoryRight={() => <Icon pack={'assets'} name="next" />}
        onPress={handleDone}>
        {t('imDone').toString()}
      </Button>
      <ModalPanel
        data={list}
        ref={modalizeRef}
        renderItem={({item}) => <CurrencyCountry item={item} onPress={close} />}
        title={t('otherInformation:addCurrency')}
        searchProps={{
          accessoryLeft: () => (
            <Icon
              style={[styles.iconModal, {tintColor: themes['color-basic-400']}]}
              pack="assets"
              name="searchNormal"
            />
          ),
          placeholder: t('otherInformation:typeCurrency'),
        }}
      />
    </Container>
  );
});

export default OtherInformation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconModal: {
    marginRight: 8,
  },
  content: {
    paddingHorizontal: 32,
    marginTop: 43,
    marginBottom: 32,
  },
  icon: {
    width: 16,
    height: 16,
  },
  avatar: {
    alignSelf: 'center',
    justifyContent: 'center',
    height: 104,
    width: 104,
    marginBottom: 12,
  },
  viewAvatar: {
    marginTop: 36,
    alignItems: 'center',
  },
  inputBox: {
    marginTop: 32,
    paddingHorizontal: 32,
  },
  edit: {
    height: 32,
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    position: 'absolute',
    bottom: 0,
  },
  selectView: {
    marginTop: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    marginBottom: 32,
  },
  scrollView: {
    paddingLeft: 24,
    marginBottom: 26,
    paddingRight: 24,
  },
  buttonBottom: {
    justifyContent: 'space-between',
    marginLeft: 32,
    marginBottom: 8,
    marginTop: 12,
  },
  add: {
    alignItems: 'center',
  },
});
export const getListFlag = (data = DATA_FLAG as FlagProps[]): FlagProps[] => {
  let output = [];
  for (let i = 0; i < data.length; i++) {
    let findIndex = output.findIndex(item => data[i].kindle === item.title);
    if (findIndex < 0) {
      output.push({title: data[i].kindle, type: 'header'}, data[i]);
    } else {
      output.push(data[i]);
    }
  }
  return output;
};
