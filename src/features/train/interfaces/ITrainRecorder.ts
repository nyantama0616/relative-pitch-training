import React from "react";
import Note from "../../../Note";

export default interface ITrainRecorder {
    record: IQuestionRecord
    save(): void
}

export interface IQuestionRecord {
    note0: Note //1音目
    note1: Note //2音目
    missCount: number //正答までのミス回数
    duration: number //正答までの所要時間(ms)
}
