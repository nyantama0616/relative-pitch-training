import React, { useState, useEffect } from "react";
import { WebMidi, Input, Output } from "webmidi";
import IMidiIO from "../interfaces/IMidiIO";
import { IMidiMessage, MessageType } from "../interfaces/IMidiMessage";

export function useMidiIO(): IMidiIO {
    const [inputDevices, setInputDevices] = useState<string[]>([]);
    const [outputDevices, setOutputDevices] = useState<string[]>([]);
    const [inputMessage, setInputMessage] = useState<IMidiMessage | null>(null);

    let currentInput: Input | null = null; //Inputに使用中のMIDIデバイス
    let currentOutput: Output | null = null; //Outputに使用中のMIDIデバイス

    useEffect(() => {
        WebMidi
            .enable()
            .then(onEnabled)
            .catch(err => alert(err));
    }, []);

    function onEnabled() {
        console.log("midi enabled!");
        
        setInputDevices(WebMidi.inputs.map(input => input.name));
        setOutputDevices(WebMidi.outputs.map(output => output.name));
    }

    function setInput(deviceName: string) {
        currentInput?.removeListener("noteon");
        currentInput?.removeListener("noteoff");
        currentInput = WebMidi.inputs.find(input => input.name == deviceName) || null;
        if (!currentInput) return;

        currentInput.addListener("noteon", e => {
            setInputMessage({type: MessageType.On, number: e.note.number})
        });
        
        currentInput.addListener("noteoff", e => {
            setInputMessage({type: MessageType.Off, number: e.note.number})
        });
    }
    
    function setOutput(deviceName: string) {
        currentOutput?.destroy();
        currentOutput = WebMidi.outputs.find(output => output.name == deviceName) || null;
    }

    return {
        inputDevices,
        outputDevices,
        setInput,
        setOutput,
        inputMessage
    }
}
