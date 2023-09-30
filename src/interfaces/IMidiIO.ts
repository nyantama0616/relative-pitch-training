import { IMidiMessage } from "./IMidiMessage";

export default interface IMidiIO {
    inputDevices: string[];
    outputDevices: string[];
    setInput(deviceName: string): void;
    setOutput(deviceName: string): void;
    // onMessage: (data: number[]) => void;
    message: IMidiMessage | null
}
