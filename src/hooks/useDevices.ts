import { DeviceData } from "@/src/components/Device";
import {
  DeviceStorage,
  getDevices,
  setDevices,
  updateDevice,
} from "../storage/devices";

type Subscriber = (device: DeviceData) => void;
type GlobalSubscriber = (deviceStorage: DeviceStorage) => void;

export class DevicesHook {
  constructor() {
    const f = async () => {
      this.subscribers = {};
      this.globalSunbscribers = [];
      await this.pull();
    };
    f();
    return this;
  }
  state: DeviceStorage = {};
  subscribers: { [key: string]: Subscriber[] } = {};
  globalSunbscribers: GlobalSubscriber[] = [];

  get() {
    return { ...this.state };
  }
  getIds(): string[] {
    return Object.entries(this.state).map((device) => device[0]);
  }

  getDevice(id: string) {
    return this.state[id];
  }
  async deleteDevice(id: string) {
    delete this.state[id];
    delete this.subscribers[id];
    this.callSubscribersGlobal();
    await setDevices(this.state);
  }

  async pull() {
    const data = await getDevices();
    this.state = data;
    this.callSubscribers();
    this.callSubscribersGlobal();
  }
  async set(devices: DeviceStorage) {
    this.state = devices;
    this.callSubscribers();
    this.callSubscribersGlobal();
    await setDevices(devices);
  }
  async update(id: string, deviceData: DeviceData) {
    const data = await updateDevice(id, deviceData);
    if (!this.state[id]) console.error("Unknown device id");
    this.state[id] = data;
    this.callSubscribersById(id);
  }
  addSubscriberById(id: string, s: Subscriber) {
    if (this.subscribers[id]) {
      this.subscribers[id].push(s);
    } else {
      this.subscribers[id] = [s];
    }
  }
  addSubscriberGlobal(s: GlobalSubscriber) {
    if (this.subscribers) {
      this.globalSunbscribers.push(s);
    }
  }
  callSubscribersById(id: string) {
    this.subscribers[id].forEach((s) => {
      s(this.state[id]);
    });
  }
  callSubscribersGlobal() {
    this.globalSunbscribers.forEach((s) => {
      s(this.state);
    });
  }
  callSubscribers() {
    Object.entries(this.subscribers).forEach((entry) => {
      entry[1].forEach((subscriber) => {
        subscriber(this.state[entry[0]]);
      });
    });
  }
}

let deviceHookGlobal: DevicesHook = new DevicesHook();

export function useDevices(): DevicesHook {
  return deviceHookGlobal;
}
