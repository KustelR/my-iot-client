import { View, Text, FlatList } from "react-native";
import { DeviceActionData, DeviceData } from ".";
import styles from "./styles";
import InlineButton from "@/src/components/InlineButton";
import { useState } from "react";
import { Portal } from "@/src/components/Portal";
import CustomTextInput from "../CustomTextInput";

export default function DeviceActions(props: { data: DeviceData }) {
  const { data } = props;
  return (
    <View>
      <Text style={styles.deviceDataHeader}>Actions</Text>
      {data.actions.length === 0 && <Text>Device provided no actions</Text>}
      <FlatList
        data={data.actions}
        renderItem={(item) => (
          <DeviceAction deviceName={data.name} data={item.item} />
        )}
      />
    </View>
  );
}

function DeviceAction(props: { deviceName: string; data: DeviceActionData }) {
  const [isPerforming, setIsPerforming] = useState(false);
  const { deviceName, data } = props;
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
        deviceName={deviceName}
        action={data}
        isPerforming={isPerforming}
        setIsPerforming={setIsPerforming}
      />
    </>
  );
}

function ActionPerformingMenu(props: {
  deviceName: string;
  action: DeviceActionData;
  isPerforming: boolean;
  setIsPerforming: (arg: boolean) => void;
}) {
  const { deviceName, isPerforming, setIsPerforming, action } = props;

  return (
    <Portal isVisible={isPerforming} setIsVisible={setIsPerforming}>
      <Text style={[styles.deviceDataHeader, { fontWeight: "bold" }]}>
        {deviceName} - {action.name}
      </Text>
      <FlatList
        style={{ marginBottom: 80 }}
        data={action.properties}
        renderItem={(item) => <CustomTextInput label={item.item} />}
      />
      <InlineButton active title="Perform" />
    </Portal>
  );
}
