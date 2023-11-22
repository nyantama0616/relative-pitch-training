import { useEffect, useState, useRef } from "react";
import ITrainingManager from "../interfaces/ITrainingManager";
import useQuestionGenerator from "./useQuestionGenerator";
import { IQuestion } from "../interfaces/IQuestionGenerator";
import { useSoundPlayerWithTone } from "./useSoundPlayerWithTone";
import Note from "../Note";
import { MessageType } from "../interfaces/IMidiMessage";
import IMidiIO from "../interfaces/IMidiIO";

interface TrainStates {
    beatCount: number
    currentQuestion: IQuestion
    isAnswerable: boolean //ユーザが回答できるか
    isRight: boolean //現在の問題が正解済みかどうか
    missCount: number
}

const initialTrainState: TrainStates = {
    beatCount: 0,
    currentQuestion: {note0: Note.C4, note1: Note.C4},
    isAnswerable: false,
    isRight: true,
    missCount: 0,
}

export default function useTrainingManager(midiIO: IMidiIO): ITrainingManager {
    const INTERVAL = 500; //tempo(ms)
    
    //hooks
    const questionGenerator = useQuestionGenerator();
    const soundPlayer = useSoundPlayerWithTone();

    //states
    const [state, setState] = useState<TrainStates>(initialTrainState);
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

    //鍵盤押すと音が鳴るってのをここでやってる TODO: 別の場所でやるべきだと思う
    useEffect(() => {
        if (midiIO.inputMessage) {
            soundPlayer.sendMessage(midiIO.inputMessage);
        }
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
                        //現在の問題が正解済みだったら、問題を更新する
                        if (newState.isRight) {
                            _updateQuestion(newState);
                        }

                        _playNote0(newState);
                        break;
                    case 1:
                        _playNote1(newState);
                        if (!newState.isRight) {
                            newState.isAnswerable = true;
                        }
                        
                        break;
                    case 2:
                        break;
                    case 3:
                        break;
                }
                ++newState.beatCount;
                return newState;
            });
        }, INTERVAL);
    }

    function stop() {
        if (timerRef.current !== null) {
            clearInterval(timerRef.current);
        }
        timerRef.current = null;
    }

    function _playNote0(_state: TrainStates) {
        soundPlayer.playNote(_state.currentQuestion.note0, INTERVAL);
    }
    
    function _playNote1(_state: TrainStates) {
        soundPlayer.playNote(_state.currentQuestion.note1, INTERVAL);
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

    function _updateQuestion(_state: TrainStates) {
        _state.currentQuestion = questionGenerator.generate();
        _state.isRight = false;
        _state.missCount = 0;
    }

    return {
        start,
        stop,
        beatCount: state.beatCount,
        isAnswerable: state.isAnswerable,
        isRight: state.isRight,
        missCount: state.missCount,
        currentQuestion: state.currentQuestion
    }
}
