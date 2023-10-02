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

        setCurrentInput(repv => {
            const newInput = WebMidi.inputs.find(input => input.name == deviceName) || null;
            
            if (newInput) {
                newInput.addListener("noteon", e => {
                    setInputMessage({ type: MessageType.On, note: e.note.number })
                });

                newInput.addListener("noteoff", e => {
                    setInputMessage({ type: MessageType.Off, note: e.note.number })
                });
            }

            return newInput;
        });
    }
    
    function setOutput(deviceName: string) {
        currentOutput?.destroy();
        setCurrentOutput(repv => {
            const newOutput = WebMidi.outputs.find(output => output.name == deviceName) || null;
            newOutput?.open();
            return newOutput;
        });
        
    }

    function sendMessage(message: IMidiMessage) {
        if (message.type == MessageType.On) {
            // currentOutput?.playNote(message.number, { duration: 200 }); //こうするとドラムなどの変な音が一緒に鳴る
            const duration = message.options?.duration;
            currentOutput?.channels[1].playNote(message.note, { duration: duration }); //これでピアノの音だけ鳴らせる
        } else {
            currentOutput?.channels[1].stopNote(message.note); //なぜかこれでNoteOffできない -> なぜかできるようになった
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
