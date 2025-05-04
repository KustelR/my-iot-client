import { View, Text } from "react-native";
import { Image } from "expo-image";
import { DeviceProps } from ".";
import styles from "./styles";
import DeviceStatus from "./DeviceStatus";
import DeviceActions from "./DeviceActions";
import DeviceHeader from "./DeviceHeader";

export default function Device(props: DeviceProps) {
  const { data } = props;
  return (
    <View style={styles.device}>
      <DeviceHeader name={data.name} />
      <DeviceStatus data={data.status} />
      <DeviceActions data={data} />
    </View>
  );
}
