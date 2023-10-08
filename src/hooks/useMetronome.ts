import React from "react";
import IMetronome from "../interfaces/IMetronome";
import useSound from "use-sound";
import tinSound from "./sounds/tin2.mp3";
import kachiSound from "./sounds/kachi2.mp3";

export default function useMetronome(): IMetronome {
    const [playTin, { stop: stopTin, pause: pauseTin }] = useSound(tinSound);
    const [playKachi, { stop, pause }] = useSound(kachiSound);
    function beat(velocity: number) {
        if (velocity < 50) {
            playKachi();
        } else {
            playTin();
        }
    }

    return {
        beat
    };
}
