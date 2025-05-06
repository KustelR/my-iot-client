import { ReactNode, useEffect } from "react";
import { Modal, View, StyleSheet, BackHandler } from "react-native";
import InlineButton from "./InlineButton";
import { useTranslation } from "react-i18next";

export function Portal(props: {
  isVisible: boolean;
  setIsVisible: (arg: boolean) => void;
  children: ReactNode;
}) {
  const { isVisible, setIsVisible, children } = props;
  const { t } = useTranslation();

  return (
    <>
      {isVisible && (
        <Modal onRequestClose={() => setIsVisible(false)} animationType="fade">
          <View style={styles.portal}>
            <View style={styles.container}>
              <View style={styles.items}>{children}</View>
            </View>
            <InlineButton
              title={t("back")}
              onTouchStart={() => {
                setIsVisible(false);
              }}
              destructive
            />
          </View>
        </Modal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  portal: {
    padding: 10,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-between",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
  },
  items: {
    width: "100%",
    padding: 12,
    borderRadius: 12,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
