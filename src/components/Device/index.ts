import { StyleSheet } from "react-native";

import Device from "./Device";
export default Device;

export interface DeviceData {
  name: string;
  status: DeviceStatusData;
  actions: DeviceActionData[];
}

export interface DeviceStatusData {
  [key: string]: string;
}

export interface DeviceActionData {
  name: string;
  status: boolean;
}

export type DeviceProps = {
  data: DeviceData;
};

export const styles = StyleSheet.create({
  device: {
    backgroundColor: "white",
    padding: 12,
    marginBottom: 12,
    borderRadius: 12,
  },
  deviceHeader: {
    fontWeight: "bold",
    fontSize: 32,
  },
  deviceListItem: {
    paddingTop: 6,
    marginBottom: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 12,
    display: "flex",
    backgroundColor: "#D5D5D5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  deviceDataHeader: {
    fontSize: 24,
  },
  deviceListItemText: {
    fontSize: 24,
    color: "#555555",
  },
});
