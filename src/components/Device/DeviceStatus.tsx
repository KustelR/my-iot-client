import { View, Text, FlatList } from "react-native";
import { DeviceStatusData } from ".";
import styles from "./styles";
import { useTranslation } from "react-i18next";

export default function DeviceStatus(props: { data: DeviceStatusData }) {
  const { t } = useTranslation();
  const { data } = props;
  return (
    <View>
      <Text style={styles.deviceDataHeader}>{t("status")}</Text>
      {Object.entries(data).length === 0 && <Text>{t("no-status")}</Text>}
      <FlatList
        data={Object.entries(data)}
        renderItem={(item) => (
          <DeviceStatusEntry key1={item.item[0]} value={item.item[1]} />
        )}
      />
    </View>
  );
}

function DeviceStatusEntry(props: { key1: string; value: string }) {
  const { key1, value } = props;
  return (
    <View style={styles.deviceListItem}>
      <Text style={styles.deviceListItemText}>{key1}:</Text>
      <Text style={styles.deviceListItemText}>{value}</Text>
    </View>
  );
}
