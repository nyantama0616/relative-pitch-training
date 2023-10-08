import { useEffect, useState } from "react";
import ITrainingManager from "../interfaces/ITrainingManager";
import useQuestionGenerator from "./useQuestionGenerator";
import { IQuestion } from "../interfaces/IQuestionGenerator";
import { useMidiIO } from "./useMidiIO";
import { useSoundPlayerWithMidi } from "./useSoundPlayerWithMidi";
import useMetronome from "./useMetronome";

interface trainStates {
    beatCount: number
    currentQuestion: IQuestion
}

export default function useTrainingManager(): ITrainingManager {
    const interval = 500; //tempo(ms)
    
    //hooks
    const questionGenerator = useQuestionGenerator();
    const midiIO = useMidiIO();
    const soundPlayer = useSoundPlayerWithMidi(midiIO);
    const metronome = useMetronome();

    //states
    const [state, setState] = useState<trainStates>({beatCount: 0, currentQuestion: questionGenerator.generate()});
    const [timer, setTimer] = useState<NodeJS.Timer>();

    useEffect(() => {
        if (midiIO.outputDevices.includes("JUNO-DS")) {
            console.log("midi ready ok!");
            midiIO.setOutput("JUNO-DS");
        }
    }, [midiIO.outputDevices]);

    function start() {
        if (timer !== undefined) {
            clearInterval(timer);
        }

        const t = setInterval(() => {
            console.log("interval!");
            
            setState(prevState => {
                const newState = { ...prevState };
                switch (newState.beatCount % 4) {
                    case 0:
                        metronome.beat(127);
                        _playNote0();
                        break;
                    case 1:
                        metronome.beat(40);
                        _playNote1();
                        break;
                    case 2:
                        metronome.beat(80);
                        console.log("回答0");
                        break;
                    case 3:
                        metronome.beat(40);
                        console.log("回答1");
                        newState.currentQuestion = questionGenerator.generate();
                        break;
                }
                ++newState.beatCount;
                return newState;
            });
        }, 500);
        setTimer(t);
    }

    function _playNote0() {
        console.log("play0");
        
        setState(s => {
            soundPlayer.playNote(s!.currentQuestion.note0, interval);
            return s;
        });
    }
    
    function _playNote1() {
        console.log("play1");
        setState(s => {
            soundPlayer.playNote(s!.currentQuestion.note1, interval);
            return s;
        });
    }

    return {
        start
    }
}
