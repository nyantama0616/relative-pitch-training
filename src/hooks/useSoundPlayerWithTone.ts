import React from "react";
import ISoundPlayer from "../interfaces/ISoundPlayer";
import * as Tone from 'tone'
import Note from "../enums/Note";

export function useSoundPlayerWithTone(): ISoundPlayer {
    // const synth = new Tone.Synth().toDestination();
    const synth = new Tone.Sampler({
        urls: {
            A1: "A1.mp3",
            A2: "A2.mp3",
        },
        baseUrl: "https://tonejs.github.io/audio/casio/",
    }).toDestination();

    function playNote(note: Note, duration: number) {
        console.log(`play note with tone ${note}`);
        const freq = Tone.Midi(note).toFrequency();
        const time = Tone.Time("8n");
        synth.triggerAttackRelease(freq, "8n");
    }

    return {
        playNote
    };
}
