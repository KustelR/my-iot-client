import { View, Text, FlatList } from "react-native";
import { DeviceActionData } from ".";
import styles from "./styles";
import InlineButton from "@/src/components/InlineButton";
import { useState } from "react";
import { Portal } from "@/src/components/Portal";

export default function DeviceActions(props: { data: DeviceActionData[] }) {
  return (
    <View>
      <Text style={styles.deviceDataHeader}>Actions</Text>
      <FlatList
        data={props.data}
        renderItem={(item) => <DeviceAction data={item.item} />}
      />
    </View>
  );
}

function DeviceAction(props: { data: DeviceActionData }) {
  const [isPerforming, setIsPerforming] = useState(false);
  const { data } = props;
  return (
    <>
      <View style={styles.deviceListItem}>
        <Text style={styles.deviceListItemText}>{data.name}</Text>
        <Text style={styles.deviceListItemText}>
          {data.status ? "On" : "Off"}
        </Text>
        <InlineButton
          title="Turn on"
          onTouchStart={() => {
            setIsPerforming(true);
          }}
        />
      </View>
      <ActionPerformingMenu
        isPerforming={isPerforming}
        setIsPerforming={setIsPerforming}
      />
    </>
  );
}

function ActionPerformingMenu(props: {
  isPerforming: boolean;
  setIsPerforming: (arg: boolean) => void;
}) {
  const { isPerforming, setIsPerforming } = props;
  return (
    <Portal isVisible={isPerforming} setIsVisible={setIsPerforming}>
      <Text>sadfasdf</Text>
    </Portal>
  );
}
