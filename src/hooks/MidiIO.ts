import React, { useState, useEffect } from "react";
import { WebMidi, Input, Output } from "webmidi";
import IMidiIO from "../interfaces/IMidiIO";
import { IMidiMessage, MessageType } from "../interfaces/IMidiMessage";

export function useMidiIO(): IMidiIO {
    const [inputDevices, setInputDevices] = useState<string[]>([]);
    const [outputDevices, setOutputDevices] = useState<string[]>([]);
    const [inputMessage, setInputMessage] = useState<IMidiMessage | null>(null);

    const [currentInput, setCurrentInput] = useState<Input | null>(null); 
    const [currentOutput, setCurrentOutput] = useState<Output | null>(null); // letじゃなくてstateにしないと、途中でnullになる。なんで？

    useEffect(() => {
        WebMidi
            .enable()
            .then(onEnabled)
            .catch(err => alert(err));
    }, []);

    function onEnabled() {
        setInputDevices(WebMidi.inputs.map(input => input.name));
        setOutputDevices(WebMidi.outputs.map(output => output.name));
    }

    function setInput(deviceName: string) {
        currentInput?.removeListener("noteon");
        currentInput?.removeListener("noteoff");
        setCurrentInput(WebMidi.inputs.find(input => input.name == deviceName) || null);
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
        setCurrentOutput(WebMidi.outputs.find(output => output.name == deviceName) || null);
        currentOutput?.open();
    }

    function sendMessage(message: IMidiMessage) {
        if (message.type == MessageType.On) {
            // currentOutput?.playNote(message.number, { duration: 200 }); //こうするとドラムなどの変な音が一緒に鳴る
            currentOutput?.channels[1].playNote(message.number); //これでピアノの音だけ鳴らせる
            console.log(`on ${message.number}`);
            
        } else {
            console.log(`off ${message.number}`);
            currentOutput?.channels[1].stopNote(message.number); //TODO: なぜかこれでNoteOffできない
        }
    }

    return {
        inputDevices,
        outputDevices,
        setInput,
        setOutput,
        inputMessage,
        sendMessage
    }
}
