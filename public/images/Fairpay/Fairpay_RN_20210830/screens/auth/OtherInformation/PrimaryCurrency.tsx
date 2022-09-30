import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Text from "components/Text";
import { Icon, useTheme } from "@ui-kitten/components";
import { TouchableOpacity } from "react-native-gesture-handler";

interface ItemCurrencyProps {
  type?: string;
  image?: string;
}
export interface PrimaryCurrencyProps {
  onChangeItem: (index: number) => void;
  tabActive: number;
  tab: ItemCurrencyProps[];
}

const PrimaryCurrency = ({
  onChangeItem,
  tab,
  tabActive,
}: PrimaryCurrencyProps) => {
  const themes = useTheme();
  const _onChangeItem = React.useCallback(
    (number: number) => {
      onChangeItem(number);
    },
    [onChangeItem]
  );
  return (
    <ScrollView
      contentContainerStyle={styles.content}
      showsHorizontalScrollIndicator={false}
      horizontal
    >
      {tab?.map((item, index) => {
        const backgroundColor = {
          backgroundColor:
            tabActive === index
              ? themes["background-basic-color-6"]
              : themes["background-basic-color-5"],
        };
        const textColor =
          tabActive === index
            ? themes["background-basic-color-5"]
            : themes["background-basic-color-6"];
        const tintColor =
          tabActive === index
            ? themes["background-basic-color-6"]
            : themes["background-basic-color-6"];

        const backgroundTintColor = {
          backgroundColor:
            tabActive === index
              ? themes["background-active-color"]
              : themes["button-background-disable-color"],
        };
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.container, backgroundColor]}
            onPress={() => _onChangeItem(index)}
          >
            <View style={[styles.image, backgroundTintColor]}>
              <Icon
                pack="assets"
                name={item?.image}
                style={{ tintColor: tintColor }}
              />
            </View>
            <Text category="h9" style={{ color: textColor }}>
              {item?.type}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default PrimaryCurrency;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    marginHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 108,
  },
  image: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    width: 48,
    height: 48,
    margin: 12,
  },
  content: {
    paddingLeft: 24,
    paddingRight: 32,
  },
});
