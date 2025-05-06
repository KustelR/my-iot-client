import { View, Text, FlatList } from "react-native";
import { DeviceActionData, DeviceData } from ".";
import styles from "./styles";
import InlineButton from "@/src/components/InlineButton";
import { useEffect, useState } from "react";
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
  const { deviceName, data } = props;

  const [isPerforming, setIsPerforming] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [now, setNow] = useState(0);
  const [duration, setDuration] = useState<number | undefined>(undefined);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!data.duration || !data.startedAt) return;

    const dur = data.duration + data.startedAt - now;
    setIsActive(dur > 0);
    setDuration(dur);
  }, [data, now]);
  return (
    <>
      <View style={styles.deviceListItem}>
        <Text style={styles.deviceListItemText}>{data.name}</Text>
        <Text style={styles.deviceListItemText}>
          {isActive
            ? `On: ${Math.floor((duration ? duration : 0) / 1000)} s`
            : "Off"}
        </Text>
        <InlineButton
          title={isActive ? "Turn off" : "Turn on"}
          active={isActive}
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
