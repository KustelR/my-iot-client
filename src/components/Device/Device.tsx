import { View, Text } from "react-native";
import { DeviceProps } from ".";
import styles from "./styles";
import DeviceStatus from "./DeviceStatus";
import DeviceActions from "./DeviceActions";

export default function Device(props: DeviceProps) {
  const { data } = props;
  return (
    <View style={styles.device}>
      <Text style={styles.deviceHeader}>{props.data.name}</Text>
      <DeviceStatus data={data.status} />
      <DeviceActions data={data} />
    </View>
  );
}
