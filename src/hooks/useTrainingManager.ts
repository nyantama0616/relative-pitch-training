import { useEffect, useState } from "react";
import ITrainingManager from "../interfaces/ITrainingManager";
import useQuestionGenerator from "./useQuestionGenerator";
import { IQuestion } from "../interfaces/IQuestionGenerator";
import { useMidiIO } from "./useMidiIO";
import { useSoundPlayerWithMidi } from "./useSoundPlayerWithMidi";

export default function useTrainingManager(): ITrainingManager {
    const interval = 500;
    const questionGenerator = useQuestionGenerator();
    const midiIO = useMidiIO();
    const soundPlayer = useSoundPlayerWithMidi(midiIO);
    const [currentQuestion, setCurrentQuestion] = useState<IQuestion>();
    const [beatCount, setBeatCount] = useState<number>(0);
    const [timer, setTimer] = useState<NodeJS.Timer>();

    useEffect(() => {
        setCurrentQuestion(questionGenerator.generate());
    }, []);

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
            setBeatCount(prevBeatCount => {
                switch (prevBeatCount % 4) {
                    case 0:
                        _playNote0();
                        break;
                    case 1:
                        _playNote1();
                        break;
                    case 2:
                        console.log("回答0");
                        break;
                    case 3:
                        console.log("回答1");
                        setCurrentQuestion(prev => questionGenerator.generate());
                        break;
                }
                return prevBeatCount + 1;
            });
        }, 500);
        setTimer(t);
    }

    function _playNote0() {
        soundPlayer.playNote(currentQuestion!.note0, interval);
    }
    
    function _playNote1() {
        soundPlayer.playNote(currentQuestion!.note1, interval);
    }

    return {
        start
    }
}
