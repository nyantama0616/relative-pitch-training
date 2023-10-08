import { useEffect, useState } from "react";
import ITrainingManager from "../interfaces/ITrainingManager";
import useQuestionGenerator from "./useQuestionGenerator";
import { IQuestion } from "../interfaces/IQuestionGenerator";
import { useMidiIO } from "./useMidiIO";
import { useSoundPlayerWithMidi } from "./useSoundPlayerWithMidi";
import useMetronome from "./useMetronome";
import Note from "../enums/Note";
import { MessageType } from "../interfaces/IMidiMessage";

interface trainStates {
    beatCount: number
    currentQuestion: IQuestion
    isAnswerable: boolean //ユーザが回答できるか
    isRight: boolean //現在の問題が正解済みかどうか
}

export default function useTrainingManager(): ITrainingManager {
    const interval = 500; //tempo(ms)
    
    //hooks
    const questionGenerator = useQuestionGenerator();
    const midiIO = useMidiIO();
    const soundPlayer = useSoundPlayerWithMidi(midiIO);
    const metronome = useMetronome();

    //states
    const [state, setState] = useState<trainStates>({beatCount: 0, currentQuestion: questionGenerator.generate(), isAnswerable: false, isRight: false});
    const [timer, setTimer] = useState<NodeJS.Timer>();
    const [pushedKeys, setPushedKeys] = useState<Set<Note>>(new Set<Note>()); //TODO: こいつはIMidiIOが管理するべきじゃない？

    useEffect(() => {
        if (midiIO.inputDevices.includes("JUNO-DS")) {
            console.log("midi input ready ok!");
            midiIO.setInput("JUNO-DS");
        }
    }, [midiIO.inputDevices]);

    useEffect(() => {
        if (midiIO.outputDevices.includes("JUNO-DS")) {
            console.log("midi output ready ok!");
            midiIO.setOutput("JUNO-DS");
        }
    }, [midiIO.outputDevices]);

    useEffect(() => {
        const msg = midiIO.inputMessage;
        if (msg === null) return;

        setPushedKeys(prevKeys => {
            const newKeys = new Set(prevKeys);
            if (msg.type === MessageType.On) {
                newKeys.add(msg.note);
                if (newKeys.size == 2) {
                    setState(s => {
                        //pushedKeysのサイズが2で、1音目と2音目が同時に押されてたら正解とみなす!
                        if (s.isAnswerable && newKeys.has(s.currentQuestion.note0) && newKeys.has(s.currentQuestion.note1)) {
                            _right();
                        }
                        return s;
                    })
                }
            } else {
                newKeys.delete(msg.note);
            }
            
            return newKeys;
        });
    }, [midiIO.inputMessage]);

    function start() {
        if (timer !== undefined) {
            clearInterval(timer);
        }

        const t = setInterval(() => {
            setState(prevState => {
                const newState = { ...prevState };
                switch (newState.beatCount % 4) {
                    case 0:
                        metronome.beat(127);
                        
                        //現在の問題が正解済みだったら、問題を更新する
                        if (newState.isRight) {
                            newState.currentQuestion = questionGenerator.generate();
                            newState.isAnswerable = false;
                            newState.isRight = false;
                        }

                        _playNote0();
                        break;
                    case 1:
                        metronome.beat(40);
                        _playNote1();
                        newState.isAnswerable = true;
                        break;
                    case 2:
                        metronome.beat(80);
                        break;
                    case 3:
                        metronome.beat(40);
                        break;
                }
                ++newState.beatCount;
                return newState;
            });
        }, 500);
        setTimer(t);
    }

    function _playNote0() {
        setState(s => {
            soundPlayer.playNote(s!.currentQuestion.note0, interval);
            return s;
        });
    }
    
    function _playNote1() {
        setState(s => {
            soundPlayer.playNote(s!.currentQuestion.note1, interval);
            return s;
        });
    }

    function _right() {
        setState(prev => {
            const newState = { ...prev };
            newState.isAnswerable = false;
            newState.isRight = true;
            return newState;
        });
    }

    return {
        start
    }
}
