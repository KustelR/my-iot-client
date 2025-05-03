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
  properties: string[];
}

export type DeviceProps = {
  data: DeviceData;
};
