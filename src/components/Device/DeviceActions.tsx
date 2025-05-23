import { View, Text, FlatList } from "react-native";
import { DeviceActionData, DeviceData } from ".";
import styles from "./styles";
import InlineButton from "@/src/components/InlineButton";
import { useEffect, useState } from "react";
import { Portal } from "@/src/components/Portal";
import CustomTextInput from "../CustomTextInput";
import { useTranslation } from "react-i18next";

export default function DeviceActions(props: {
  data: DeviceData;
  onAction?: (
    actionName: string,
    properties: { [key: string]: string },
  ) => void;
}) {
  const { data, onAction } = props;
  const { t } = useTranslation();
  return (
    <View>
      <Text style={styles.deviceDataHeader}>{t("actions")}</Text>
      {data.actions.length === 0 && <Text>{t("no-actions")}</Text>}
      <FlatList
        data={data.actions}
        renderItem={(item) => (
          <DeviceAction
            device={data}
            data={item.item}
            callback={(name, properties) => {
              onAction ? onAction(name, properties) : {};
            }}
          />
        )}
      />
    </View>
  );
}

function DeviceAction(props: {
  device: DeviceData;
  data: DeviceActionData;
  callback?: (
    actionName: string,
    properties: { [key: string]: string },
  ) => void;
}) {
  const { device, data, callback } = props;
  const { t } = useTranslation();

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
          {isActive && duration
            ? `${t("on")}: ${Math.floor((duration ? duration : 0) / 1000)
                .toString()
                .slice(0, 8)} ${t("seconds")}`
            : t("off")}
        </Text>
        <View style={{ flex: 1, maxWidth: "40%" }}>
          <InlineButton
            title={isActive ? t("turn-off") : t("turn-on")}
            active={isActive}
            onTouchStart={() => {
              setIsPerforming(true);
            }}
          />
        </View>
      </View>
      <ActionPerformingMenu
        deviceName={device.name}
        action={data}
        isPerforming={isPerforming}
        setIsPerforming={setIsPerforming}
        callback={(properties) => {
          callback ? callback(data.name, properties) : {};
        }}
      />
    </>
  );
}

function ActionPerformingMenu(props: {
  deviceName: string;
  action: DeviceActionData;
  isPerforming: boolean;
  setIsPerforming: (arg: boolean) => void;
  callback?: (args: { [key: string]: string }) => void;
}) {
  const { t } = useTranslation();
  const { deviceName, isPerforming, setIsPerforming, action, callback } = props;
  const [properties, setProperties] = useState<{ [key: string]: string }>({});

  return (
    <Portal isVisible={isPerforming} setIsVisible={setIsPerforming}>
      <Text style={[styles.deviceDataHeader, { fontWeight: "bold" }]}>
        {deviceName} - {action.name}
      </Text>
      <FlatList
        style={{ marginBottom: 80 }}
        data={action.properties}
        renderItem={(item) => (
          <CustomTextInput
            label={item.item}
            onChangeText={(v) => {
              const data = { ...properties };
              data[item.item] = v;
              setProperties(data);
            }}
          />
        )}
      />
      <InlineButton
        active
        title={t("perform")}
        onTouchStart={() => {
          callback ? callback(properties) : {};
        }}
      />
    </Portal>
  );
}
