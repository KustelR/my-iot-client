import { DeviceData } from "@/src/components/Device";
import { addDevice, getDevices, setDevices } from "../storage/deviceSlice";
import { useEffect, useState } from "react";

type Subscriber = (devices: DeviceData[]) => void;

class DevicesHook {
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
  addSubscriber(s: Subscriber) {
    this.subscribers.push(s);
  }
  callSubscribers() {
    this.subscribers.forEach((s) => {
      s(this.state);
    });
  }
}

export function useDevices() {
  const [d, setD] = useState<DevicesHook | null>(null);
  useEffect(() => {
    setD(new DevicesHook());
  }, []);
  return d;
}
