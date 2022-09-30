import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Text from 'components/Text';
import {Icon, Layout, useTheme} from '@ui-kitten/components';
import CurrencyText from './CurrencyText';
import {SpendingDetailsProps} from 'constants/Types';
import dayjs from 'dayjs';

interface SpendItemProps {
  item?: SpendingDetailsProps;
  onPress?(): void;
}

const SpendItem = ({item, onPress}: SpendItemProps) => {
  const themes = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {backgroundColor: themes['background-text-input-color']},
      ]}>
      <View
        style={[
          styles.icon,
          {
            backgroundColor: item?.color,
          },
        ]}>
        {item?.icon ? (
          <Icon
            style={{tintColor: themes['color-basic-100']}}
            name={item.icon}
            pack="assets"
          />
        ) : null}
      </View>

      <View style={styles.title}>
        <View style={styles.titleItem}>
          <Text category="h8" marginBottom={4}>
            {item?.title}
          </Text>
        </View>
        <Text status="body" category="h8-sl">
          {dayjs(item?.date).format('MMM D')}
        </Text>
      </View>
      <CurrencyText
        category="h8"
        style={styles.spent}
        marginTop={12}
        status="success">
        {item?.amount}
      </CurrencyText>
    </TouchableOpacity>
  );
};
export default SpendItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 88,
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  spent: {
    position: 'absolute',
    bottom: 22,
    right: 24,
  },

  icon: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  title: {
    marginLeft: 16,
  },
  titleItem: {
    height: 24,
  },
});
