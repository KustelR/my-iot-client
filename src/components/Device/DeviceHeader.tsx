import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import styles from "./styles";
import { Image } from "expo-image";
import { useEffect, useState } from "react";

export interface DeviceHeaderProps {
  name: string;
  syncStatus?: SyncStatus;
  onSyncTouch?: () => void;
  onEditTouch?: () => void;
}

export default function DeviceHeader(props: DeviceHeaderProps) {
  const { name, syncStatus, onSyncTouch, onEditTouch } = props;
  return (
    <View style={styles.deviceHeader}>
      <Text style={styles.deviceHeaderText}>{name}</Text>
      <DeviceControls
        syncStatus={syncStatus}
        onEditTouch={onEditTouch}
        onSyncTouch={onSyncTouch}
      />
    </View>
  );
}

export type SyncStatus = "success" | "fail";

interface DeviceControlsProps {
  syncStatus?: SyncStatus;
  onSyncTouch?: () => void;
  onEditTouch?: () => void;
}

function DeviceControls(props: DeviceControlsProps) {
  const { syncStatus, onSyncTouch, onEditTouch } = props;
  const syncUnknown = require(`@/assets/images/sync-unknown.svg`);
  const syncSuccess = require(`@/assets/images/sync-unknown.svg`);
  const syncFail = require(`@/assets/images/sync-unknown.svg`);

  const [syncIcon, setSyncIcon] = useState<any>(null);

  useEffect(() => {
    switch (syncStatus) {
      case "success":
        setSyncIcon(syncSuccess);
        break;
      case "fail":
        setSyncIcon(syncFail);
        break;
      default:
        setSyncIcon(syncUnknown);
        break;
    }
  }, [syncStatus]);
  return (
    <View style={localStyles.controls}>
      <TouchableHighlight>
        <View style={localStyles.controlIcon} onTouchStart={onSyncTouch}>
          <Image style={{ width: "90%", height: "90%" }} source={syncIcon} />
        </View>
      </TouchableHighlight>
      <TouchableHighlight>
        <View style={localStyles.controlIcon} onTouchStart={onEditTouch}>
          <Image
            style={{ width: "100%", height: "100%" }}
            source={require("@/assets/images/edit.svg")}
          />
        </View>
      </TouchableHighlight>
    </View>
  );
}

const localStyles = StyleSheet.create({
  controlIcon: {
    width: 40,
    height: 40,
    marginRight: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  controls: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
  },
});
