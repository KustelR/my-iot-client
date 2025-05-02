import Device, { DeviceData } from "@/src/components/Device";
import { useState } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";

const mockAction = {
    name: "Relay 111",
    status: false
}

const mockDevices: DeviceData[] =
[
  {name: "POLIVALKA 3000", status: {"Power": "100%"}, actions: [mockAction]}, 
  {name: "POLIVALKA 3001", status: {"Power": "33%"}, actions: [mockAction, mockAction]}]


export default function Index() {

  const [devices, setDevices] = useState<DeviceData[]>([])

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

function DeviceList(props: {data: DeviceData[]}) {
  return <FlatList style={styles.deviceList} data={props.data} renderItem={item => <Device data={item.item} />} />

}


function Header() {
  return <View style={styles.header}>
    <Text style={styles.headerText}>KustIoT</Text>
  </View>
}


const styles = StyleSheet.create({
  header: {
    backgroundColor: "#6062c7",
    width: "100%"
  },
  headerText: {
    color: "white",
  },
  deviceList: {
    flex: 1,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 8,
    flexDirection: "column",
    backgroundColor: "#D7D7D7",
    width: "100%"
  }
})