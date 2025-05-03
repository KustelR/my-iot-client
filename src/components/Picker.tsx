import { Portal } from "@/src/components/Portal";
import { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { defaultFontSize } from "@/src/styles";

interface PickerItem {
  name: string;
  value: string;
}

export default function Picker(props: {
  label: string;
  items: PickerItem[];
  onChange?: (arg: string) => void;
}) {
  const { label, items, onChange } = props;
  const [isVisible, setIsVisible] = useState(false);
  const [selected, setSelected] = useState<PickerItem | null>(null);

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
          <View
            style={{
              flex: 1,
              paddingTop: 4,
              paddingBottom: 4,
              backgroundColor: "#d7d7d7",
            }}
          >
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
  const { isVisible, setIsVisible, setSelected, items } = props;
  return (
    <Portal isVisible={isVisible} setIsVisible={setIsVisible}>
      <Text style={styles.header}>Pick one:</Text>
      <View style={{ backgroundColor: "#d7d7d7", paddingTop: 4 }}>
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
    paddingTop: 4,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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
    marginBottom: 4,
  },
});
