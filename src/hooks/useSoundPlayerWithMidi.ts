import React, { useEffect } from "react";
import ISoundPlayer from "../interfaces/ISoundPlayer";
import { MessageType } from "../interfaces/IMidiMessage";
import IMidiIO from "../interfaces/IMidiIO";

export function useSoundPlayerWithMidi(midiIO: IMidiIO): ISoundPlayer {
    function playNote(note: number, duration: number) {
        midiIO.sendMessage({ type: MessageType.On, note: note, options: { duration: duration } });
    }

    return {
        playNote
    }
}
