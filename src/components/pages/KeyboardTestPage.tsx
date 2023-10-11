import React, {useEffect} from "react";
import { useMidiIO } from "../../hooks/useMidiIO";
import Keyboard from "../organisms/Keyboard";

export default function KeyboardTestPage() {
    const midiIO = useMidiIO();

    useEffect(() => {
        midiIO.setInput("JUNO-DS");
    }, [midiIO.availableInputDevices]);

    return (
        <div className="keyboard-test-page">
            <h1>Keyboard Test Page</h1>
            <Keyboard message={midiIO.inputMessage} />
        </div>
    )
}
