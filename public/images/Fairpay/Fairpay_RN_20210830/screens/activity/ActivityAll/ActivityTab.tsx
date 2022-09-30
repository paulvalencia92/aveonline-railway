import React, {memo, useCallback} from 'react';
import {FlatList, StyleSheet, Image, ImageSourcePropType} from 'react-native';
import {Layout, useTheme} from '@ui-kitten/components';
import Text from 'components/Text';

import {ActivityProps} from 'constants/Types';
import {getListViewDate} from '../Activity';
import ActivityItem from 'components/ActivityItem';

interface ActivityTabProps {
  nodataTitle?: string;
  nodataImage: ImageSourcePropType;
  data: ActivityProps[];
}
const ActivityTab = memo(
  ({nodataTitle, nodataImage, data}: ActivityTabProps) => {
    let list = getListViewDate(data);
    const themes = useTheme();
    const RenderListsEmpty = useCallback(() => {
      return (
        <Layout style={styles.layout}>
          <Image source={nodataImage} style={styles.image} />
          <Text center marginTop={24} status="body" category="h8-p">
            {nodataTitle}
          </Text>
        </Layout>
      );
    }, []);
    return (
      <Layout style={styles.container}>
        <FlatList
          data={list}
          renderItem={({item}) => <ActivityItem item={item} />}
          ListEmptyComponent={() => <RenderListsEmpty />}
          style={{
            backgroundColor: themes['background-basic-color-1'],
          }}
          contentContainerStyle={styles.containerFlatlist}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
        />
      </Layout>
    );
  },
);

export default ActivityTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 160,
    height: 160,
    marginTop: 88,
  },
  layout: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24,
    marginTop: 40,
  },
  containerFlatlist: {
    paddingBottom: 40,
  },
});
