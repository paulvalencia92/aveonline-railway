import React, {memo, useRef} from 'react';
import {
  Animated,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Button,
  Icon,
  Input,
  TopNavigation,
  useTheme,
} from '@ui-kitten/components';

import Text from 'components/Text';
import Container from 'components/Container';
import NavigationAction from 'components/NavigationAction';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import AddFriendItem from './AddFriendItem';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {DATA_GROUP, DATA_GROUP_FRIEND} from 'constants/Data';
import Modal from 'react-native-modal';
import ModalAction from 'components/ModalAction';
import useKeyboard from 'hooks/useKeyboard';
import useModalize from 'hooks/useModalize';
import ModalPanel from 'components/ModalPanel';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from 'navigation/types';

const NewGroup = memo(() => {
  const {t} = useTranslation(['groups', 'common']);
  const themes = useTheme();
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      setName: '',
    },
  });
  const [invisible, setInvisible] = React.useState<boolean>(false);
  const handleDone = React.useCallback(() => {}, []);
  const refModal = useRef<Modal>(null);
  const {height: keyboardHeight} = useKeyboard();
  const {open, close, modalizeRef} = useModalize();
  const [focusKeyB, setFocusKeyB] = React.useState(true);
  const onFocus = React.useCallback(() => {
    setFocusKeyB(!focusKeyB);
  }, [focusKeyB]);
  React.useEffect(() => {
    onFocus;
  }, [focusKeyB]);

  const handleSendInvite = React.useCallback(() => {
    close();
  }, []);
  return (
    <Container style={[styles.container]}>
      <TopNavigation
        accessoryLeft={() => <NavigationAction icon="close" status="basic" />}
        accessoryRight={() => (
          <Text
            category="h7"
            capitalize
            onPress={() => navigate('Groups', {screen: 'NewGroupDetails'})}>
            {t('done')}
          </Text>
        )}
      />
      <KeyboardAwareScrollView
        scrollToOverflowEnabled
        style={styles.scrollView}>
        <Controller
          control={control}
          name="setName"
          rules={{
            required: true,
            pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              status={errors.setName ? 'warning' : undefined}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              onFocus={onFocus}
              keyboardType="email-address"
              placeholder={t('enterGroupName')}
              size="giant"
              textStyle={styles.textStyle}
              style={[styles.input]}
              autoFocus={focusKeyB}
            />
          )}
        />
        <Text marginTop={32} category="h7" status="basic">
          {t('addParticipants')}
        </Text>
        <FlatList
          contentContainerStyle={styles.list}
          data={DATA_GROUP}
          renderItem={({item}) => <AddFriendItem item={item} />}
          keyExtractor={(item, index) => item.id.toString()}
          // refreshControl={
          //   <RefreshControl
          //     tintColor={themes["color-primary-500"]}
          //     onRefresh={() => {}}
          //   />
          // }
        />
        <TouchableOpacity
          onPress={() => {
            setInvisible(true);
          }}
          style={[
            {
              backgroundColor: themes['background-basic-color-5'],
            },
            styles.buttonAdd,
          ]}
          activeOpacity={0.7}>
          <View
            style={[
              styles.icon,
              {
                backgroundColor: themes['color-primary-500'],
              },
            ]}>
            <Icon pack="assets" name="plus" />
          </View>
          <Text marginLeft={16} category="h8" status="basic">
            {t('addParticipants')}
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>

      <Animated.View
        style={[
          {
            bottom: Animated.subtract(keyboardHeight, 0),
            backgroundColor: themes['background-basic-color-5'],
            alignItems: 'flex-end',
          },
        ]}>
        {focusKeyB === false ? (
          <Text marginVertical={16} marginRight={24} onPress={handleDone}>
            {t('Done')}
          </Text>
        ) : null}
      </Animated.View>
      <ModalAction
        isInvisible={invisible}
        setIsInvisible={setInvisible}
        ref={refModal}
        title={t('addParticipants')}
        dataNearby={DATA_GROUP_FRIEND}
        onAddNewFriend={open}
      />
      <ModalPanel ref={modalizeRef} title={t('addFriend')}>
        <View>
          <Controller
            name="name"
            control={control}
            render={({field: {value, onChange, onBlur}}) => (
              <Input
                style={styles.inputModal}
                label={t('fullName').toString()}
                placeholder={t('placeholderName')}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
            rules={{required: true, minLength: 10}}
          />
          <Controller
            name="email"
            control={control}
            render={({field: {value, onChange, onBlur}}) => (
              <Input
                style={styles.inputModal}
                label={t('emailNPhone').toString()}
                placeholder={t('placeholderEmail')}
                keyboardType="name-phone-pad"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
            rules={{required: true, minLength: 10}}
          />
          <Button
            size="large"
            children={t('sendInvite').toString()}
            style={styles.buttonSend}
            onPress={handleSendInvite}
          />
        </View>
      </ModalPanel>
    </Container>
  );
});

export default NewGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textStyle: {
    fontSize: 24,
    lineHeight: 32,
  },
  list: {
    marginTop: 24,
  },
  buttonText: {
    height: 50,
    alignItems: 'flex-end',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
  },
  buttonAdd: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 24,
    borderRadius: 12,
  },
  icon: {
    borderRadius: 40,
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftView: {
    width: 80,
  },
  input: {
    paddingBottom: 40,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  bottomView: {
    flexDirection: 'row',
    height: 116,
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  buttonDone: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 32,
  },
  rightView: {
    paddingHorizontal: 24,
    flex: 1,
  },
  modal: {
    flexDirection: 'row',
    ...StyleSheet.absoluteFillObject,
  },
  scrollView: {
    paddingHorizontal: 32,
  },
  buttonSend: {
    marginTop: 24,
    marginHorizontal: 32,
  },
  inputModal: {
    marginTop: 24,
    marginHorizontal: 32,
  },
});
