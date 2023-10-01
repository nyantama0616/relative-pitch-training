import React, {useEffect} from "react";
import { useMidiIO } from "../../hooks/MidiIO";
import Keyboard from "../organisms/Keyboard";

export default function KeyboardTestPage() {
    const midiIO = useMidiIO();

    useEffect(() => {
        console.log(midiIO.inputDevices);
        midiIO.setInput("JUNO-DS");
    }, [midiIO.inputDevices]);

    return (
        <div className="keyboard-test-page">
            <h1>Keyboard Test Page</h1>
            <Keyboard message={midiIO.inputMessage} />
        </div>
    )
}
