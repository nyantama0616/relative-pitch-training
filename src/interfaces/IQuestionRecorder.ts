import React from "react";

export default interface IQuestionRecorder {
    push(record: IQuestionRecord): void //レコードを追加する
}

export interface IQuestionRecord {
    note0: number //1音目
    note1: number //2音目
    missCount: number //正答までのミス回数
    duration: number //正答までの所要時間(ms)
}
