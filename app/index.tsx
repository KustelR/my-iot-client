import Device, { DeviceData } from "@/src/components/Device";
import DeviceEditor from "@/src/components/Device/DeviceEditor";
import { defaultFontSize } from "@/src/styles";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { Image } from "expo-image";
import { DevicesHook, useDevices } from "@/src/hooks/useDevices";
import { useTranslation } from "react-i18next";
import Picker from "@/src/components/Picker";
import { Portal } from "@/src/components/Portal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { nanoid } from "nanoid/non-secure";

export default function Index() {
  const [deviceIds, setDeviceIds] = useState<string[]>([]);
  const devicesProvider = useDevices();
  useEffect(() => {
    setDeviceIds(devicesProvider.getIds());
    devicesProvider.addSubscriberGlobal((ds) =>
      setDeviceIds(devicesProvider.getIds()),
    );
  }, [devicesProvider]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Header />
      <DeviceList deviceIds={deviceIds} />
    </View>
  );
}

function DeviceList(props: { deviceIds: string[] }) {
  const { deviceIds } = props;
  const [isAdding, setIsAdding] = useState(false);

  const devices = useDevices();

  return (
    <>
      <View style={styles.deviceList}>
        <FlatList
          data={[...props.deviceIds, null]}
          renderItem={(item) => {
            return (
              <View style={{ flex: 1 }}>
                {item.index < deviceIds.length && (
                  <Device id={item.item as string} />
                )}
                {item.index == deviceIds.length && (
                  <AddDeviceButton setIsAdding={setIsAdding} />
                )}
              </View>
            );
          }}
        />
      </View>
      <DeviceEditor
        isVisible={isAdding}
        setIsVisible={setIsAdding}
        onSubmit={(d) => {
          const data = devices?.get();
          if (data) {
            const id = nanoid();
            d.id = id;
            data[id] = d;
            devices?.set(data);
          }
        }}
      />
    </>
  );
}

function AddDeviceButton(props: { setIsAdding?: (arg: boolean) => void }) {
  const { setIsAdding } = props;
  const { t } = useTranslation();
  return (
    <TouchableHighlight>
      <View
        style={styles.addDevice}
        onTouchStart={() => {
          if (setIsAdding) setIsAdding(true);
        }}
      >
        <View style={{ height: 60, width: 60 }}>
          <Image
            placeholder="icon"
            style={{ width: "100%", height: "100%", marginRight: 8 }}
            source={require("@/assets/images/plus.svg")}
          />
        </View>
        <Text style={styles.addDeviceText}>{t("add-device")}</Text>
      </View>
    </TouchableHighlight>
  );
}

function Header() {
  const { t } = useTranslation();

  const [isOpenSettings, setIsOpenSettings] = useState(false);

  return (
    <>
      <View style={styles.header}>
        <View style={{ height: 60, width: 60 }}>
          <Image
            placeholder="icon"
            style={{ width: "90%", height: "100%", marginRight: 8 }}
            source={require("@/assets/images/icon.svg")}
          />
        </View>
        <View style={styles.headerButtons}>
          <Text style={styles.headerText}>{t("header")}</Text>
          <TouchableHighlight>
            <View
              style={{ height: 40, width: 40 }}
              onTouchStart={() => {
                setIsOpenSettings(true);
              }}
            >
              <Image
                placeholder="icon"
                style={{ width: "100%", height: "100%", marginRight: 8 }}
                source={require("@/assets/images/settings.svg")}
              />
            </View>
          </TouchableHighlight>
        </View>
      </View>
      <Portal isVisible={isOpenSettings} setIsVisible={setIsOpenSettings}>
        <Picker
          label="language"
          items={[
            { name: "English", value: "en-US" },
            { name: "Русский", value: "ru-RU" },
          ]}
          onChange={(v) => {
            AsyncStorage.setItem("language", v);
          }}
        />
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#6062c7",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  headerText: {
    color: "white",
    fontSize: 32,
  },
  deviceList: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#D7D7D7",
    width: "100%",
  },
  addDevice: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "white",
    padding: 12,
    margin: defaultFontSize / 2,
    borderRadius: 12,
  },
  addDeviceText: {
    fontSize: defaultFontSize,
  },
  headerButtons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
  },
});
