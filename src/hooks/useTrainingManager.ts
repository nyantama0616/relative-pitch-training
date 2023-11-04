import { useEffect, useState, useRef } from "react";
import ITrainingManager from "../interfaces/ITrainingManager";
import useQuestionGenerator from "./useQuestionGenerator";
import { IQuestion } from "../interfaces/IQuestionGenerator";
import { useSoundPlayerWithMidi } from "./useSoundPlayerWithMidi";
import { useSoundPlayerWithTone } from "./useSoundPlayerWithTone";
import useMetronome from "./useMetronome";
import Note from "../enums/Note";
import { MessageType } from "../interfaces/IMidiMessage";
import IMidiIO from "../interfaces/IMidiIO";

interface TrainStates {
    beatCount: number
    currentQuestion: IQuestion
    isAnswerable: boolean //ユーザが回答できるか
    isRight: boolean //現在の問題が正解済みかどうか
    missCount: number
}

export default function useTrainingManager(midiIO: IMidiIO): ITrainingManager {
    const INTERVAL = 500; //tempo(ms)
    
    //hooks
    const questionGenerator = useQuestionGenerator();
    // const soundPlayer = useSoundPlayerWithMidi(midiIO);
    const soundPlayer = useSoundPlayerWithTone();
    const metronome = useMetronome();

    //states
    const [state, setState] = useState<TrainStates>({beatCount: 0, currentQuestion: questionGenerator.generate(), isAnswerable: false, isRight: false, missCount: 0});
    const [pushedKeys, setPushedKeys] = useState<Set<Note>>(new Set<Note>()); //TODO: こいつはIMidiIOが管理するべきじゃない？

    const timerRef = useRef<NodeJS.Timer | null>(null);

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
                        } else {
                            _miss();
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
        if (timerRef.current !== null) {
            clearInterval(timerRef.current);            
        }

        timerRef.current = setInterval(() => {
            setState(prevState => {
                const newState = { ...prevState };
                switch (newState.beatCount % 4) {
                    case 0:
                        metronome.beat(80);
                        
                        //現在の問題が正解済みだったら、問題を更新する
                        if (newState.isRight) {
                            newState.currentQuestion = questionGenerator.generate();
                            // newState.isAnswerable = false;
                            newState.isRight = false;
                            newState.missCount = 0;
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
                        metronome.beat(127);
                        break;
                }
                ++newState.beatCount;
                return newState;
            });
        }, 500);
    }

    function _playNote0() {
        setState(s => {
            soundPlayer.playNote(s!.currentQuestion.note0, INTERVAL);
            return s;
        });
    }
    
    function _playNote1() {
        setState(s => {
            soundPlayer.playNote(s!.currentQuestion.note1, INTERVAL);
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

    function _miss() {
        setState(prev => {
            const newState = { ...prev };
            ++newState.missCount;
            return newState;
        });
    }

    function _updateQuestion() {

    }

    return {
        start,
        beatCount: state.beatCount,
        isAnswerable: state.isAnswerable,
        isRight: state.isRight,
        missCount: state.missCount,
        currentQuestion: state.currentQuestion
    }
}
