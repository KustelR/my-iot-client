import AsyncStorage from "@react-native-async-storage/async-storage";
import { DeviceData, isDeviceData } from "@/src/components/Device";

export type DeviceStorage = {
  [key: string]: DeviceData;
};

class StorageError extends Error {
  constructor(message: string, underlyingError?: unknown, cause?: unknown) {
    super(message);
    super.cause = cause;
    this.underlyingError = underlyingError;
  }
  underlyingError: unknown;
}

function isDeviceStorage(data: any): data is DeviceStorage {
  let result: boolean = true;
  try {
    Object.entries(data).forEach((item) => {
      if (!isDeviceData(item[1])) result = false;
    });
    return result;
  } catch {
    return false;
  }
}

async function getDevices(): Promise<DeviceStorage> {
  const data = await AsyncStorage.getItem("devices");

  if (!data) return {};
  let devicesUnknown: any;
  try {
    devicesUnknown = JSON.parse(data);
  } catch (e) {
    throw new StorageError("error occured while parsing storage", e, data);
  }
  if (!isDeviceStorage(devicesUnknown)) {
    throw new StorageError(
      "malformed device storage",
      undefined,
      devicesUnknown,
    );
  }

  return devicesUnknown;
}

async function getDeviceIds(): Promise<string[]> {
  const data = await getDevices();

  return Object.entries(data).map((item) => item[0]);
}

async function getDevice(id: string): Promise<DeviceData | undefined> {
  const devices = await getDevices();

  return devices[id];
}

async function setDevices(projects: DeviceStorage) {
  const data = await AsyncStorage.setItem("devices", JSON.stringify(projects));
}

async function addDevice(p: DeviceData): Promise<DeviceStorage> {
  const data: DeviceStorage = await getDevices();
  data[p.id] = p;
  await AsyncStorage.setItem("devices", JSON.stringify(data));

  return data;
}

async function deleteDevice(id: string) {
  const data: DeviceStorage = await getDevices();
  delete data[id];
  await setDevices(data);
}

async function updateDevice(id: string, deviceData: DeviceData) {
  const data = await getDevices();
  data[id] = deviceData;
  await setDevices(data);

  return deviceData;
}

export {
  getDevices,
  setDevices,
  addDevice,
  deleteDevice,
  updateDevice,
  getDevice,
};
