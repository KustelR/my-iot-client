import CustomTextInput from "@/src/components/CustomTextInput";
import Device, { DeviceData } from "@/src/components/Device";
import InlineButton from "@/src/components/InlineButton";
import Picker from "@/src/components/Picker";
import { Portal } from "@/src/components/Portal";
import { defaultFontSize } from "@/src/styles";
import { useState } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableHighlight,
} from "react-native";

const mockAction = {
  name: "Relay 111",
  status: false,
  properties: ["duration"],
};

type DeviceType = "gsm";

function isDeviceType(data: string): data is DeviceType {
  const deviceTypes = ["gsm"];
  if (deviceTypes.includes(data)) return true;
  return false;
}

const mockDevices: DeviceData[] = [
  { name: "POLIVALKA 3000", status: { Power: "100%" }, actions: [mockAction] },
  {
    name: "POLIVALKA 3001",
    status: { Power: "33%" },
    actions: [mockAction, mockAction],
  },
];

export default function Index() {
  const [devices, setDevices] = useState<DeviceData[]>([]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Header />
      <DeviceList data={mockDevices} />
    </View>
  );
}

function DeviceList(props: { data: DeviceData[] }) {
  const { data } = props;
  const [isAdding, setIsAdding] = useState(false);
  return (
    <>
      <View style={styles.deviceList}>
        <FlatList
          data={[...props.data, null]}
          renderItem={(item) => {
            return (
              <View style={{ flex: 1 }}>
                {item.index < data.length && <Device data={data[item.index]} />}
                {item.index == data.length && (
                  <AddDeviceButton setIsAdding={setIsAdding} />
                )}
              </View>
            );
          }}
        />
      </View>
      <Portal isVisible={isAdding} setIsVisible={setIsAdding}>
        <DeviceEditor />
      </Portal>
    </>
  );
}

function DeviceEditor() {
  const [deviceType, setDeviceType] = useState<DeviceType | null>(null);
  return (
    <View>
      <View style={{ marginBottom: 120 }}>
        <Text style={styles.deviceEditorHeader}>Device Editor</Text>
        <CustomTextInput label="Name" />
        <View style={{ marginBottom: 12 }}>
          <Picker
            label="Mode"
            items={[{ name: "GSM", value: "gsm" }]}
            onChange={(val) => {
              if (isDeviceType(val)) setDeviceType(val);
            }}
          />
        </View>
        {deviceType == "gsm" && <GSMDeviceEditor />}
      </View>
      <InlineButton active title="Add" />
    </View>
  );
}

function AddDeviceButton(props: { setIsAdding?: (arg: boolean) => void }) {
  const { setIsAdding } = props;
  return (
    <TouchableHighlight>
      <View
        style={styles.addDevice}
        onTouchStart={() => {
          if (setIsAdding) setIsAdding(true);
        }}
      >
        <Text style={styles.addDeviceText}>Add device</Text>
      </View>
    </TouchableHighlight>
  );
}

function GSMDeviceEditor() {
  return (
    <View>
      <CustomTextInput label="Phone Number" />
    </View>
  );
}

function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>KustIoT</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#6062c7",
    width: "100%",
  },
  headerText: {
    color: "white",
    fontSize: 32,
  },
  deviceList: {
    flex: 1,
    display: "flex",
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 8,
    flexDirection: "column",
    backgroundColor: "#D7D7D7",
    width: "100%",
  },
  addDevice: {
    flex: 1,
    backgroundColor: "white",
    padding: 12,
    borderRadius: 12,
  },
  addDeviceText: {
    fontSize: defaultFontSize,
  },
  deviceEditorHeader: {
    fontSize: 32,
    fontWeight: "bold",
  },
});
