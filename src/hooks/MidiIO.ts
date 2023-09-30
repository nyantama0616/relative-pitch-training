import React, { useState, useEffect } from "react";
import { WebMidi, Input, Output } from "webmidi";
import IMidiIO from "../interfaces/IMidiIO";
import { IMidiMessage, MessageType } from "../interfaces/IMidiMessage";

export function useMidiIO(): IMidiIO {
    const [inputDevices, setInputDevices] = useState<string[]>([]);
    const [outputDevices, setOutputDevices] = useState<string[]>([]);
    const [message, setMessage] = useState<IMidiMessage | null>(null);

    let currentInput: Input | null = null;
    let currentOutput: Output | null = null;

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
            setMessage({type: MessageType.On, number: e.note.number})
        });
        
        currentInput.addListener("noteoff", e => {
            setMessage({type: MessageType.Off, number: e.note.number})
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
        message
    }
}
