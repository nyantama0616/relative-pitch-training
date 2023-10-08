import React from "react";
import IQuestionRecorder, { IQuestionRecord } from "../interfaces/IQuestionRecorder";

export default function useQuestionRecorder(): IQuestionRecorder {
    function push(record: IQuestionRecord) {
        console.log("push!");
    }

    return {
        push
    };
}
