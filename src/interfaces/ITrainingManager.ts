import React from "react";
import { IQuestion } from "./IQuestionGenerator";

export default interface ITrainingManager {
    start(): void
    stop(): void
    beatCount: number
    isAnswerable: boolean //ユーザが回答できるか
    isRight: boolean //現在の問題が正解済みかどうか
    missCount: number //現在の問題のミス数
    currentQuestion: IQuestion
}
