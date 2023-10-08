import React from "react";
import Note from "../enums/Note";

//問題を生成する役割
export default interface IQuestionGenerator {
    generate(): IQuestion //次の問題を生成する
}

export interface IQuestion {
    note0: Note //1音目
    note1: Note //2音目
}
