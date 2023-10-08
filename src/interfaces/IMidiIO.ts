import { IMidiMessage } from "./IMidiMessage";

export default interface IMidiIO {
    inputDevices: string[]; //Input可能なMIDIデバイス一覧
    outputDevices: string[]; //Output可能なMIDIデバイス一覧
    setInput(deviceName: string): void; //Inputに使用するMIDIデバイスを決定
    setOutput(deviceName: string): void; //Outputに使用するMIDIデバイスを決定
    inputMessage: IMidiMessage | null //MIDIデバイスから受け取ったメッセージ. こいつをstateで管理する.
    sendMessage(message: IMidiMessage): void; //MIDIデバイスにメッセージ送信
}
