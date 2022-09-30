import React from "react";
import { StyleProp, TouchableOpacity, View, ViewStyle } from "react-native";
import {
  Modal,
  StyleService,
  useStyleSheet,
  useTheme,
} from "@ui-kitten/components";
import { useTranslation } from "react-i18next";
import useLayout from "hooks/useLayout";
import useAppTheme from "hooks/useAppTheme";

import Text from "./Text";
interface ModalConfirmProps {
  title: string;
  description: string;
  firstButton: string;
  secondButton: string;
  pressFirstBtn?(): void;
  pressSecondBtn?(): void;
  style?: StyleProp<ViewStyle>;
  styleFirstBtn?: StyleProp<ViewStyle>;
  styleSecondBtn?: StyleProp<ViewStyle>;
}

function DialogPayment(
  {
    title,
    description,
    firstButton,
    secondButton,
    pressFirstBtn,
    pressSecondBtn,
    style,
    styleFirstBtn,
    styleSecondBtn,
  }: ModalConfirmProps,
  ref: React.ForwardedRef<{ show: () => void; hide: () => void }>
) {
  const { width } = useLayout();
  const { theme, toggleTheme } = useAppTheme();
  const { t } = useTranslation("dialogPayment");
  const styles = useStyleSheet(themedStyles);
  const themes = useTheme();

  const modalRef = React.useRef<Modal>(null);

  React.useImperativeHandle(ref, () => ({
    show: () => {
      modalRef.current?.show();
    },
    hide: () => {
      modalRef.current?.hide();
    },
  }));

  const hide = React.useCallback(() => {
    modalRef.current?.hide();
  }, []);

  return (
    <Modal
      ref={modalRef}
      onBackdropPress={hide}
      backdropStyle={[
        styles.container,
        {
          backgroundColor:
            theme === "light"
              ? "rgba(30, 31, 32, 0.86)"
              : "rgba(0, 0, 0, 0.86)",
        },
      ]}
    >
      <View style={[styles.modal, style]}>
        <Text
          marginTop={48}
          marginBottom={16}
          marginHorizontal={32}
          category="h7"
          center
        >
          {title}
        </Text>
        <Text center category="h8-p" marginBottom={32} marginHorizontal={24}>
          {description}
        </Text>
        <TouchableOpacity
          style={[
            styles.firstButton,
            {
              backgroundColor: themes["color-primary-500"],
              width: width / 1.52,
            },
            styleFirstBtn,
          ]}
          onPress={pressFirstBtn}
        >
          <Text center category="h7">
            {firstButton}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.secondButton,
            {
              width: width / 1.52,
              backgroundColor: themes["button-background-disable-color"],
            },
            styleSecondBtn,
          ]}
          onPress={pressSecondBtn}
        >
          <Text center category="h7">
            {secondButton}
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

export default React.forwardRef(DialogPayment) as (
  props: ModalConfirmProps & {
    ref?: React.ForwardedRef<{ show: () => void; hide: () => void }>;
  }
) => ReturnType<typeof DialogPayment>;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(30, 31, 32, 0.86)",
  },
  modal: {
    flex: 1,
    borderRadius: 24,
    paddingBottom: 40,
    alignSelf: "center",
    backgroundColor: "background-modal-color",
  },
  firstButton: {
    height: 50,
    marginBottom: 12,
    borderRadius: 12,
    alignItem: "center",
    justifyContent: "center",
  },
  secondButton: {
    height: 50,
    marginBottom: 12,
    borderRadius: 12,
    alignItem: "center",
    justifyContent: "center",
    marginHorizontal: 32,
  },
});
