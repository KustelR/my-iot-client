import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { Image } from "expo-image";
import {
  DeviceData,
  DeviceDataGSM,
  DeviceType,
  isDeviceType,
} from "@/src/components/Device";
import InlineButton from "@/src/components/InlineButton";
import CustomTextInput from "@/src/components/CustomTextInput";
import Picker from "@/src/components/Picker";
import { useState } from "react";
import { Portal } from "@/src/components/Portal";
import { useTranslation } from "react-i18next";
import { nanoid } from "nanoid/non-secure";
import { defaultFontSize } from "@/src/styles";

export interface DeviceEditorProps {
  isVisible: boolean;
  data?: DeviceData;
  onSubmit?: (arg: DeviceData) => void;
  onDelete?: () => void;
  setIsVisible: (arg: boolean) => void;
}

export default function DeviceEditor(props: DeviceEditorProps) {
  const { isVisible, setIsVisible, onSubmit, onDelete, data } = props;

  return (
    <Portal isVisible={isVisible} setIsVisible={setIsVisible}>
      <DeviceEditorInternal
        onSubmit={onSubmit}
        onDelete={onDelete}
        setIsVisible={setIsVisible}
        data={data}
      />
    </Portal>
  );
}

function DeviceEditorInternal(props: {
  onSubmit?: (device: DeviceData) => void;
  data?: DeviceData;
  onDelete?: () => void;
  setIsVisible: (arg: boolean) => void;
}) {
  const { t } = useTranslation();
  const { onSubmit, onDelete, data, setIsVisible } = props;
  const [deviceName, setDeviceName] = useState(data ? data.name : "");
  const [deviceType, setDeviceType] = useState<DeviceType | undefined>(
    data ? data.deviceType : undefined,
  );
  const [gsmPhoneNumber, setGsmPhoneNumber] = useState<string>(
    data?.deviceType == "gsm" ? (data as DeviceDataGSM).phoneNumber : "",
  );
  return (
    <View>
      <View style={{ marginBottom: 60 }}>
        <DeviceEditorHeader data={data} onDelete={onDelete} />
        <MainEditor
          setDeviceName={setDeviceName}
          setDeviceType={setDeviceType}
          data={data}
        />
        <GSMDeviceEditor
          data={data}
          deviceType={deviceType}
          onChange={(data) => {
            setGsmPhoneNumber(data.phoneNumber);
          }}
        />
      </View>
      <InlineButton
        active
        onTouchStart={() => {
          handleSubmit(deviceName, deviceType, gsmPhoneNumber, onSubmit);
          setIsVisible(false);
        }}
        title={t("add")}
      />
    </View>
  );
}

function DeviceEditorHeader(props: {
  data?: DeviceData;
  onDelete?: () => void;
}) {
  const { data, onDelete } = props;
  const [isDotMenu, setIsDotMenu] = useState(false);
  const { t } = useTranslation();
  return (
    <>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.deviceEditorHeader}>
          {data ? data.name : t("new-device")}
        </Text>
        {data && (
          <TouchableHighlight style={{ height: "100%" }}>
            <Image
              onTouchStart={() => {
                setIsDotMenu(true);
              }}
              style={{
                width: 10,
                height: 50,
              }}
              source={require("@/assets/images/dots.svg")}
            />
          </TouchableHighlight>
        )}
      </View>
      <Portal isVisible={isDotMenu} setIsVisible={setIsDotMenu}>
        <Text style={{ marginBottom: 20, fontSize: defaultFontSize * 1.5 }}>
          {t("actions")}
        </Text>
        <InlineButton
          style={{ marginBottom: 10 }}
          destructive
          title={t("delete")}
          onTouchStart={onDelete ? onDelete : () => {}}
        />
        <InlineButton
          active
          title="JSON"
          onTouchStart={() => {
            alert(JSON.stringify(data, null, 2));
          }}
        />
      </Portal>
    </>
  );
}

function MainEditor(props: {
  setDeviceName: (arg: string) => void;
  setDeviceType: (arg: DeviceType) => void;
  data?: DeviceData;
}) {
  const { setDeviceName, setDeviceType, data } = props;
  const { t } = useTranslation();
  return (
    <>
      <CustomTextInput
        defaultValue={data?.name}
        label={t("name")}
        onChangeText={(val) => {
          setDeviceName(val);
        }}
      />
      <View style={{ marginBottom: 12 }}>
        <Picker
          value={data?.deviceType}
          label={t("mode")}
          items={[{ name: "GSM", value: "gsm" }]}
          onChange={(val) => {
            if (isDeviceType(val)) setDeviceType(val);
          }}
        />
      </View>
    </>
  );
}

function handleSubmit(
  name: string,
  deviceType: DeviceType | undefined,
  gsmPhoneNumber: string,
  onSubmit?: (device: DeviceData) => void,
) {
  const device: DeviceData = {
    id: "",
    name: name,
    deviceType: deviceType,
    actions: [],
    status: {},
  };
  switch (device.deviceType) {
    case "gsm":
      (device as DeviceDataGSM).phoneNumber = gsmPhoneNumber;
  }
  onSubmit ? onSubmit(device) : {};
}

function GSMDeviceEditor(props: {
  deviceType: DeviceType | undefined;
  onChange?: (arg: { phoneNumber: string }) => void;
  data?: DeviceData;
}) {
  const { deviceType, onChange, data } = props;
  const { t } = useTranslation();
  if (deviceType !== "gsm") return;
  return (
    <View>
      <CustomTextInput
        defaultValue={data ? (data as DeviceDataGSM).phoneNumber : undefined}
        label={t("phone-number")}
        onChangeText={(value) => {
          onChange ? onChange({ phoneNumber: value }) : () => {};
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  deviceEditorHeader: {
    fontSize: 32,
    fontWeight: "bold",
  },
  deviceEditorListItem: {},
});
