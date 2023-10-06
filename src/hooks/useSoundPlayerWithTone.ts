import React from "react";
import ISoundPlayer from "../interfaces/ISoundPlayer";
import * as Tone from 'tone';
import Note from "../enums/Note";

export function useSoundPlayerWithTone(): ISoundPlayer {
    const synth = new Tone.Synth().toDestination();

    function playNote(note: Note, duration: number) {
        console.log(`play note with tone ${note}`);
        const freq = Tone.Midi(note).toFrequency();
        const now = Tone.now();
        const ms = duration / 1000.0;
        synth.triggerAttack(freq, now);
        synth.triggerRelease(now + ms);
    }

    return {
        playNote
    };
}
