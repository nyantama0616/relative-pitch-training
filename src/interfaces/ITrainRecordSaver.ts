import { IQuestionRecord } from "./ITrainRecorder"

/* TrainRecordをセーブするためだけのhook
    正直わざわざセーブ用のhookに分ける必要があるかよく分かってない
*/
export default interface ITrainRecordSaver {
    save(record: IQuestionRecord[]): void
    status: BasicStatus
}

export enum BasicStatus {
    None,
    Doing,
    Success,
    Failed
}
