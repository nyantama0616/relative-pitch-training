import React from "react";
import IMetronome from "../interfaces/IMetronome";
import useSound from "use-sound";
import tinSound from "./sounds/tin2.mp3";
import kachiSound from "./sounds/kachi2.mp3";
import kachiWeakSound from "./sounds/kachi2_weak.mp3";

export default function useMetronome(): IMetronome {
    const [playTin, {}] = useSound(tinSound);
    const [playKachi, {}] = useSound(kachiSound);
    const [playKachiWeak, {}] = useSound(kachiWeakSound);
    function beat(velocity: number) {
        if (velocity < 50) {
            playKachiWeak();
        } else if (velocity < 100) {
            playKachi();
        }
        else {
            playTin();
        }
    }

    return {
        beat
    };
}
