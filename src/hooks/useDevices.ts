import { DeviceData } from "@/src/components/Device";
import { getDevices, setDevices, updateDevice } from "../storage/deviceSlice";
import { useEffect, useState } from "react";

type Subscriber = (devices: DeviceData[]) => void;

export class DevicesHook {
  constructor() {
    const f = async () => {
      this.subscribers = [];
      await this.read();
    };
    f();
    return this;
  }
  state: DeviceData[] = [];
  subscribers: Subscriber[] = [];

  get() {
    return this.state;
  }
  async read() {
    const data = await getDevices();
    this.state = data;
    this.callSubscribers();
  }
  async set(devices: DeviceData[]) {
    this.state = devices;
    this.callSubscribers();
    await setDevices(devices);
  }
  async update(name: string, deviceData: DeviceData) {
    const data = await updateDevice(name, deviceData);
    this.state = data;
    this.callSubscribers();
  }
  addSubscriber(s: Subscriber) {
    this.subscribers.push(s);
  }
  callSubscribers() {
    this.subscribers.forEach((s) => {
      s(this.state);
    });
  }
}

let deviceHookGlobal: DevicesHook | undefined;

export function useDevices() {
  const [d, setD] = useState<DevicesHook | undefined>();
  useEffect(() => {
    if (!deviceHookGlobal) {
      deviceHookGlobal = new DevicesHook();
    }
    setD(deviceHookGlobal);
  }, []);

  return d;
}
