export interface IMidiMessage {
    type: MessageType
    number: number
}

export enum MessageType {
    On = "On",
    Off = "Off"
}
