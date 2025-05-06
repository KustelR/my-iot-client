import AsyncStorage from "@react-native-async-storage/async-storage";
import { DeviceData } from "@/src/components/Device";

async function getDevices(): Promise<DeviceData[]> {
  const data = await AsyncStorage.getItem("devices");

  return JSON.parse(data ? data : "[]");
}

async function setDevices(projects: DeviceData[]) {
  const data = await AsyncStorage.setItem("devices", JSON.stringify(projects));
}

async function addDevice(p: DeviceData): Promise<DeviceData[]> {
  const data: DeviceData[] = await getDevices();
  data.push(p);
  await AsyncStorage.setItem("devices", JSON.stringify(data));

  return data;
}

async function deleteDevice(name: string): Promise<DeviceData[]> {
  const data: DeviceData[] = await getDevices();
  const newData = data.filter((item) => item.name !== name);
  await setDevices(newData);

  return data;
}

async function updateDevice(
  name: string,
  deviceData: DeviceData,
): Promise<DeviceData[]> {
  const data: DeviceData[] = await getDevices();
  const newData = data.filter((item) => item.name !== name);
  newData.push(deviceData);
  await setDevices(newData);

  return newData;
}

export { getDevices, setDevices, addDevice, deleteDevice, updateDevice };
