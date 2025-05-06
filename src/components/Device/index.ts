import Device from "./Device";
export default Device;

export interface DeviceData {
  name: string;
  status: DeviceStatusData;
  pulledAt?: number;
  actions: DeviceActionData[];
  deviceType?: DeviceType;
}

export interface DeviceDataGSM extends DeviceData {
  deviceType: "gsm";
  phoneNumber: string;
}

export interface DeviceStatusData {
  [key: string]: string;
}

export interface DeviceActionData {
  name: string;
  startedAt?: number;
  duration?: number;
  properties: string[];
}

export type DeviceProps = {
  data: DeviceData;
};

export type DeviceType = "gsm";

export function isDeviceType(data: string): data is DeviceType {
  const deviceTypes = ["gsm"];
  if (deviceTypes.includes(data)) return true;
  return false;
}
