import React, { useEffect, useState } from "react";
import { IMidiMessage, MessageType } from "../../interfaces/IMidiMessage";
import "./Keyboard.css";

// キーボードを描画するコンポーネント
interface KeyboardProps {
    message: IMidiMessage | null
}
export default function Keyboard({ message }: KeyboardProps) {
    const scale = [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0]; //Aから始まる。 白鍵は1、 黒鍵は0
    const [keyStates, setKeyStates] = useState(Array.from(new Array(88).map(_ => KeyState.Normal)));

    let offset = 23; //鍵盤のｘ座標

    const keys = Array.from(new Array(88)).map((_, i) => {
        const isWhite = scale[i % 12] == 1;
        const key = <Key key={i} isWhite={isWhite} left={offset} state={keyStates[i]} />
        
        //現在の鍵盤色と次の鍵盤の色の組み合わせによって、offsetに加算する値を決定
        const bit = scale[i % 12] + 2 * scale[(i + 1) % 12]; //この式は正しいけど、なぜ導けたのか不明
        switch (bit) {
            case 1: //白 -> 黒
                offset += 28.6;
                break;
            case 2: //黒 -> 白
                offset += 5.72;
                break;
            case 3: //白 -> 白
                offset += 34.32;
                break;
        }
        return key;
    });

    useEffect(() => {
        //midiMessageが変更されたら、鍵盤の状態を変える
        if (message) {
            setKeyStates(prev => {
                const newKeyStates = [...prev];
                if (message.type == MessageType.On) {
                    newKeyStates[message.number - 21] = KeyState.Hit;
                } else {
                    newKeyStates[message.number - 21] = KeyState.Normal;
                }
                return newKeyStates;
            });
        }
    }, [message]);

    return (
        <div className="keyboard">
            {keys}
        </div>
    )
}

// キーボード上の各鍵盤を描画するコンポーネント
interface KeyProps {
    isWhite: boolean //白鍵か？
    left: number //どの位置に描画するか
    state: KeyState //鍵盤が押されてるかなどの状態によって、色を変えたりする
}
function Key({ isWhite, left, state }: KeyProps) {
    const color = isWhite ? "white" : "black";
    const className = `key key-${color}`;
    const imgPath = `images/key_${color}.png`;
    const filterClassName = state == KeyState.Hit ? `filter hit` : "filter";

    return (
        <div className={className} style={{ left: left }} >
            <img src={imgPath} alt="" />
            <div className={filterClassName}></div>
        </div>
    )
}

//この値によって、鍵盤の色を変える
enum KeyState {
    Normal,
    Hit,
    Right,
    Miss,
}
