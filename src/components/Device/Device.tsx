import { View } from "react-native";
import { DeviceActionData, DeviceData, DeviceDataGSM, DeviceProps } from ".";
import styles from "./styles";
import DeviceStatus from "./DeviceStatus";
import DeviceActions from "./DeviceActions";
import DeviceHeader, { SyncStatus } from "./DeviceHeader";
import { useState } from "react";
import { DevicesHook, useDevices } from "@/src/hooks/useDevices";

const mockAction: DeviceActionData = {
  name: "Relay 111",
  properties: ["duration"],
};
const mockAction2: DeviceActionData = {
  name: "Relay 121",
  startedAt: Date.now(),
  duration: 100002,
  properties: ["duration"],
};
export default function Device(props: DeviceProps) {
  const { data } = props;

  const deviceProvider = useDevices();

  const [isSyncLocked, setIsSyncLocked] = useState<boolean>(false);

  return (
    <View style={styles.device}>
      <DeviceHeader
        name={data.name}
        syncStatus={data.pulledAt ? getSyncStatus(data.pulledAt) : undefined}
        isSyncAnimated={isSyncLocked}
        onSyncTouch={() => {
          deviceProvider
            ? onTouch(data, isSyncLocked, setIsSyncLocked, deviceProvider)
            : {};
        }}
      />
      <DeviceStatus data={data.status} />
      <DeviceActions
        data={data}
        onAction={(name, properties) => {
          handleDeviceAction(data, name, properties, deviceProvider);
        }}
      />
    </View>
  );
}

function getSyncStatus(pulledAt: number): SyncStatus | undefined {
  const age = Date.now() - pulledAt;

  if (pulledAt === -1) return "fail";
  if (age < 600000) return "success";
}

function onTouch(
  data: DeviceData,
  isSyncLocked: boolean,
  setIsSyncLocked: (arg: boolean) => void,
  deviceProvider: DevicesHook,
) {
  setIsSyncLocked(true);
  if (isSyncLocked) {
    return;
  }
  if (Math.random() > 0.5) {
    setTimeout(() => {
      deviceProvider?.update(data.name, {
        ...data,
        pulledAt: -1,
        actions: [],
      });
      setIsSyncLocked(false);
    }, 3000);
  } else {
    setTimeout(() => {
      deviceProvider?.update(data.name, {
        ...data,
        pulledAt: Date.now(),
        actions: [mockAction, mockAction2],
      });
      setIsSyncLocked(false);
    }, 300);
  }
}

function handleDeviceAction(
  data: DeviceData,
  name: string,
  properties: { [key: string]: string },
  deviceProvider?: DevicesHook,
) {
  switch (data.deviceType) {
    case "gsm":
      handleGSMAction((data as DeviceDataGSM).phoneNumber, name, properties);
  }
  if ("duration" in properties && deviceProvider) {
    updateActionDuration(data, name, properties, deviceProvider);
  }
}

function handleGSMAction(
  phoneNumber: string,
  name: string,
  properties: { [key: string]: string },
) {
  console.log(phoneNumber, name, properties);
}

function updateActionDuration(
  data: DeviceData,
  name: string,
  properties: { [key: string]: string },
  deviceProvider: DevicesHook,
) {
  const newAction = data.actions.find((a) => {
    return a.name === name;
  });

  if (!newAction) return;
  newAction.startedAt = Date.now();
  newAction.duration = parseInt(properties.duration) * 1000;
  const newActions = data.actions.filter((a) => {
    return a.name !== name;
  });
  newActions.push(newAction);

  deviceProvider.update(data.name, { ...data, actions: newActions });
}
