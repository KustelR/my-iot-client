import { View, Text } from "react-native";
import { Image } from "expo-image";
import { DeviceProps } from ".";
import styles from "./styles";
import DeviceStatus from "./DeviceStatus";
import DeviceActions from "./DeviceActions";
import DeviceHeader, { SyncStatus } from "./DeviceHeader";
import { useState } from "react";

export default function Device(props: DeviceProps) {
  const { data } = props;

  const [syncState, setSyncState] = useState<SyncStatus | undefined>(undefined);
  const [isSyncLocked, setIsSyncLocked] = useState<boolean>(false);

  return (
    <View style={styles.device}>
      <DeviceHeader
        name={data.name}
        syncStatus={syncState}
        isSyncAnimated={isSyncLocked}
        onSyncTouch={() => {
          setIsSyncLocked(true);
          if (isSyncLocked) {
            return;
          }
          if (Math.random() > 0.5) {
            setTimeout(() => {
              setSyncState("fail");
              setIsSyncLocked(false);
            }, 3000);
          } else {
            setTimeout(() => {
              setSyncState("success");
              setIsSyncLocked(false);
            }, 300);
          }
        }}
      />
      <DeviceStatus data={data.status} />
      <DeviceActions data={data} />
    </View>
  );
}
