import { Portal } from "@/src/components/Portal";
import { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { defaultFontSize, primaryColor } from "@/src/styles";
import { useTranslation } from "react-i18next";

interface PickerItem {
  name: string;
  value: string;
}

export default function Picker(props: {
  label: string;
  value?: string;
  items: PickerItem[];
  onChange?: (arg: string) => void;
}) {
  const { label, items, onChange, value } = props;
  const [isVisible, setIsVisible] = useState(false);
  const [selected, setSelected] = useState<PickerItem | undefined>(
    value ? items.find((item) => item.value == value) : undefined,
  );

  useEffect(() => {
    if (!onChange || !selected) return;
    onChange(selected.value);
  }, [selected, onChange]);
  return (
    <>
      <TouchableHighlight>
        <View
          style={styles.select}
          onTouchStart={() => {
            setIsVisible(true);
          }}
        >
          <Text style={styles.normalText}>{label}: </Text>
          <View style={styles.selectItem}>
            <Text style={styles.normalText}>
              {selected ? selected.name : ""}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
      <PickerPortal
        isVisible={isVisible}
        setSelected={setSelected}
        setIsVisible={setIsVisible}
        items={items}
      />
    </>
  );
}

function PickerPortal(props: {
  isVisible: boolean;
  setIsVisible: (arg: boolean) => void;
  items: PickerItem[];
  setSelected: (arg: PickerItem) => void;
}) {
  const { t } = useTranslation();
  const { isVisible, setIsVisible, setSelected, items } = props;
  return (
    <Portal isVisible={isVisible} setIsVisible={setIsVisible}>
      <Text style={styles.header}>{t("pick-one")}</Text>
      <View style={styles.selectItem}>
        <FlatList
          data={items}
          renderItem={(item) => (
            <TouchableHighlight>
              <View
                style={styles.pickerItem}
                onTouchStart={() => {
                  setSelected(item.item);
                  setIsVisible(false);
                }}
              >
                <Text style={styles.normalText}>{item.item.name}</Text>
              </View>
            </TouchableHighlight>
          )}
        />
      </View>
    </Portal>
  );
}

const styles = StyleSheet.create({
  select: {
    display: "flex",
    flexDirection: "column",
  },
  selectItem: {
    width: "100%",
    padding: defaultFontSize / 3,
    borderColor: primaryColor,
    borderWidth: 2,
  },
  normalText: {
    fontSize: defaultFontSize,
    backgroundColor: "white",
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
  },
  pickerItem: {
    backgroundColor: "white",
  },
});
