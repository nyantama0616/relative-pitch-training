import React, {useEffect} from "react";
import { useMidiIO } from "../../hooks/useMidiIO";
import { MessageType } from "../../interfaces/IMidiMessage";
import { useSoundPlayerWithMidi } from "../../hooks/useSoundPlayerWithMidi";
import Note from "../../enums/Note";
import { useSoundPlayerWithTone } from "../../hooks/useSoundPlayerWithTone";
import useTrainingManager from "../../hooks/useTrainingManager";

export default function TopPage() {
    // const midiIO = useMidiIO();
    // const soundPlayer = useSoundPlayerWithMidi(midiIO);
    const soundPlayer = useSoundPlayerWithTone();
    const trainingManager = useTrainingManager();

    // useEffect(() => {
    //     midiIO.setOutput("JUNO-DS");
    // }, [midiIO.outputDevices]);
    
    function play() {
        // soundPlayer.playNote(Note.C4, 500);
        trainingManager.start();
    }
    
    return (
        <div className="top-page">
            <h1>Top Page</h1>
            <button onClick={play}>play</button>
        </div>
    )
}
