import { View, Text, StyleSheet } from "react-native";
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

export interface DeviceEditorProps {
  isVisible: boolean;
  setIsVisible: (arg: boolean) => void;
  devices: DeviceData[];
  setDevices: (arg: DeviceData[]) => void;
}

export default function DeviceEditor(props: DeviceEditorProps) {
  const { isVisible, setIsVisible, devices, setDevices } = props;
  return (
    <Portal isVisible={isVisible} setIsVisible={setIsVisible}>
      <DeviceEditorInternal
        onSubmit={(d) => setDevices([...devices, d])}
        setIsVisible={setIsVisible}
      />
    </Portal>
  );
}

function DeviceEditorInternal(props: {
  onSubmit?: (device: DeviceData) => void;
  setIsVisible: (arg: boolean) => void;
}) {
  const { t } = useTranslation();
  const { onSubmit, setIsVisible } = props;
  const [deviceName, setDeviceName] = useState("");
  const [deviceType, setDeviceType] = useState<DeviceType | undefined>(
    undefined,
  );
  const [gsmPhoneNumber, setGsmPhoneNumber] = useState<string>("");
  return (
    <View>
      <View style={{ marginBottom: 120 }}>
        <Text style={styles.deviceEditorHeader}>Device Editor</Text>
        <CustomTextInput
          label={t("name")}
          onChangeText={(val) => {
            setDeviceName(val);
          }}
        />
        <View style={{ marginBottom: 12 }}>
          <Picker
            label={t("mode")}
            items={[{ name: "GSM", value: "gsm" }]}
            onChange={(val) => {
              if (isDeviceType(val)) setDeviceType(val);
            }}
          />
        </View>
        {deviceType == "gsm" && (
          <GSMDeviceEditor
            onChange={(data) => {
              setGsmPhoneNumber(data.phoneNumber);
            }}
          />
        )}
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

function handleSubmit(
  name: string,
  deviceType: DeviceType | undefined,
  gsmPhoneNumber: string,
  onSubmit?: (device: DeviceData) => void,
) {
  const device: DeviceData = {
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
  onChange?: (arg: { phoneNumber: string }) => void;
}) {
  const { t } = useTranslation();
  return (
    <View>
      <CustomTextInput
        label={t("phone-number")}
        onChangeText={(value) => {
          props.onChange ? props.onChange({ phoneNumber: value }) : () => {};
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
});
