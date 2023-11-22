import React, { useState, useEffect } from "react";
import { WebMidi, Input, Output } from "webmidi";
import Note from "../../enums/Note";
import IKeyPressManager from "../../interfaces/IKeyPressManager";
import IMidiIO from "../../interfaces/IMidiIO";
import { IMidiMessage, MessageType } from "../../interfaces/IMidiMessage";

export default function useMidiIOMock(keyPressManager: IKeyPressManager): IMidiIO {
    const mockMidiDevice = "Mock MIDI Device";
    const [inputMessage, setInputMessage] = useState<IMidiMessage | null>(null);

    useEffect(() => {
        switch (keyPressManager.keyDownInfo.key) {
            case "c":
                setInputMessage({ type: MessageType.On, note: Note.C4 });
                break;
            case "d":
                setInputMessage({ type: MessageType.On, note: Note.D4 });
                break;
            case "b":
                setInputMessage({ type: MessageType.On, note: Note.B3 });
                break;
        }
    }, [keyPressManager.keyDownInfo]);
    
    useEffect(() => {
        switch (keyPressManager.keyUpInfo.key) {
            case "c":
                setInputMessage({ type: MessageType.Off, note: Note.C4 });
                break;
            case "d":
                setInputMessage({ type: MessageType.Off, note: Note.D4 });
                break;
            case "b":
                setInputMessage({ type: MessageType.Off, note: Note.B3 });
                break;
        }
    }, [keyPressManager.keyUpInfo]);

    function setInput(deviceName: string) {
        
    }

    function setOutput(deviceName: string) {

    }

    function sendMessage(message: IMidiMessage) {
        
    }

    function updateAvailableDevices() {

    }

    return {
        availableInputDevices: [mockMidiDevice],
        availableOutputDevices: [mockMidiDevice],
        currentInputDevice: mockMidiDevice,
        currentOutputDevice: mockMidiDevice,
        setInput,
        setOutput,
        inputMessage,
        sendMessage,
        updateAvailableDevices
    }
}
