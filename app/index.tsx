import Device, { DeviceData } from "@/src/components/Device";
import DeviceEditor from "@/src/components/DeviceEditor";
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

const mockAction = {
  name: "Relay 111",
  status: false,
  properties: ["duration"],
};

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

  useEffect(() => {
    setDevices(mockDevices);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Header />
      <DeviceList devices={devices} setDevices={setDevices} />
    </View>
  );
}

function DeviceList(props: {
  devices: DeviceData[];
  setDevices: (d: DeviceData[]) => void;
}) {
  const { devices, setDevices } = props;
  const [isAdding, setIsAdding] = useState(false);
  return (
    <>
      <View style={styles.deviceList}>
        <FlatList
          data={[...props.devices, null]}
          renderItem={(item) => {
            return (
              <View style={{ flex: 1 }}>
                {item.index < devices.length && (
                  <Device data={devices[item.index]} />
                )}
                {item.index == devices.length && (
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
        devices={devices}
        setDevices={setDevices}
      />
    </>
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
        <View style={{ height: 60, width: 60 }}>
          <Image
            placeholder="icon"
            style={{ width: "100%", height: "100%", marginRight: 8 }}
            source={require("@/assets/images/plus.svg")}
          />
        </View>
        <Text style={styles.addDeviceText}>Add device</Text>
      </View>
    </TouchableHighlight>
  );
}

function Header() {
  return (
    <View style={styles.header}>
      <View style={{ height: 60, width: 60 }}>
        <Image
          placeholder="icon"
          style={{ width: "90%", height: "100%", marginRight: 8 }}
          source={require("@/assets/images/icon.svg")}
        />
      </View>
      <Text style={styles.headerText}>KustIoT</Text>
    </View>
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
    paddingLeft: 12,
    paddingRight: 12,
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
    marginTop: 12,
    marginBottom: 12,
    borderRadius: 12,
  },
  addDeviceText: {
    fontSize: defaultFontSize,
  },
});
