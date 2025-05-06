import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  useAnimatedValue,
  Animated,
  ViewStyle,
} from "react-native";
import { Image } from "expo-image";
import { PropsWithChildren, useEffect, useState } from "react";
import RotatingView from "@/src/components/RotatingView";

export interface DeviceHeaderProps {
  name: string;
  syncStatus?: SyncStatus;
  isSyncAnimated?: boolean;
  onSyncTouch?: () => void;
  onEditTouch?: () => void;
}

export default function DeviceHeader(props: DeviceHeaderProps) {
  const { name, syncStatus, onSyncTouch, onEditTouch, isSyncAnimated } = props;
  return (
    <View style={styles.deviceHeader}>
      <Text style={styles.deviceHeaderText}>{name}</Text>
      <DeviceControls
        syncStatus={syncStatus}
        isSyncAnimated={isSyncAnimated}
        onEditTouch={onEditTouch}
        onSyncTouch={onSyncTouch}
      />
    </View>
  );
}

export type SyncStatus = "success" | "fail";

interface DeviceControlsProps {
  syncStatus?: SyncStatus;
  isSyncAnimated?: boolean;
  onSyncTouch?: () => void;
  onEditTouch?: () => void;
}
function DeviceControls(props: DeviceControlsProps) {
  const { syncStatus, onSyncTouch, onEditTouch, isSyncAnimated } = props;
  const syncUnknown = require(`@/assets/images/sync-unknown.svg`);
  const syncSuccess = require(`@/assets/images/sync-success.svg`);
  const syncFail = require(`@/assets/images/sync-fail.svg`);

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
    <View style={styles.controls}>
      <TouchableHighlight>
        <RotatingView
          style={styles.controlIcon}
          isAnimated={isSyncAnimated}
          onTouchStart={onSyncTouch}
        >
          <Image style={{ width: "90%", height: "90%" }} source={syncIcon} />
        </RotatingView>
      </TouchableHighlight>
      <TouchableHighlight>
        <View style={styles.controlIcon} onTouchStart={onEditTouch}>
          <Image
            style={{ width: "100%", height: "100%" }}
            source={require("@/assets/images/edit.svg")}
          />
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
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
  deviceHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  deviceHeaderText: {
    fontWeight: "bold",
    fontSize: 32,
  },
});
