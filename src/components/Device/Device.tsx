import { View, Text } from "react-native";
import { DeviceActionData, DeviceData, DeviceDataGSM, DeviceProps } from ".";
import styles from "./styles";
import DeviceStatus from "./DeviceStatus";
import DeviceActions from "./DeviceActions";
import DeviceHeader, { SyncStatus } from "./DeviceHeader";
import { useEffect, useState } from "react";
import { DevicesHook, useDevices } from "@/src/hooks/useDevices";
import DeviceEditor from "./DeviceEditor";

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
  const { id } = props;

  const [data, setData] = useState<DeviceData>();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const deviceProvider = useDevices();
  useEffect(() => {
    setData(deviceProvider.getDevice(id));
    deviceProvider.addSubscriberById(id, (d) => {
      setData(d);
    });
  }, []);

  const [isSyncLocked, setIsSyncLocked] = useState<boolean>(false);

  return (
    <>
      {data && (
        <View style={styles.device}>
          <DeviceHeader
            name={data.name}
            syncStatus={getSyncStatus(data.pulledAt)}
            isSyncAnimated={isSyncLocked}
            onSyncTouch={() => {
              onTouch(data, isSyncLocked, setIsSyncLocked, deviceProvider);
            }}
            onEditTouch={() => {
              setIsEditing(true);
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
      )}
      {!data && <DeviceFallback id={id} />}
      {isEditing && (
        <DeviceEditor
          isVisible={isEditing}
          data={data}
          setIsVisible={setIsEditing}
          onSubmit={(d) => {
            d.id = id;
            deviceProvider.update(id, d);
          }}
          onDelete={() => {
            deviceProvider.deleteDevice(id);
          }}
        />
      )}
    </>
  );
}

function DeviceFallback(props: { id: string }) {
  return (
    <View style={[styles.device, { height: 100 }]}>
      <Text>{props.id}</Text>
    </View>
  );
}

function getSyncStatus(pulledAt: number | undefined): SyncStatus | undefined {
  if (!pulledAt) return undefined;
  const age = Date.now() - pulledAt;

  if (pulledAt === -1) return "fail";
  if (age < 600000) return "success";
}

function onTouch(
  data: DeviceData,
  isSyncLocked: boolean,
  setIsSyncLocked: (arg: boolean) => void,
  deviceProvider?: DevicesHook,
) {
  setIsSyncLocked(true);
  if (isSyncLocked) {
    return;
  }
  if (Math.random() > 0.5) {
    setTimeout(() => {
      deviceProvider?.update(data.id, {
        ...data,
        pulledAt: -1,
        actions: [],
      });
      setIsSyncLocked(false);
    }, 3000);
  } else {
    setTimeout(() => {
      deviceProvider?.update(data.id, {
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
  deviceProvider.update(data.id, { ...data, actions: newActions });
}
