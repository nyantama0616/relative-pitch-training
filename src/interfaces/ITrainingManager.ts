import React from "react";

export default interface ITrainingManager {
    start(): void
    beatCount: number
    isAnswerable: boolean //ユーザが回答できるか
    isRight: boolean //現在の問題が正解済みかどうか
}
