import { IQuestionRecord } from "./ITrainRecorder"
import BasicStatus from "../../others/interfaces/BasicStatus"

/* TrainRecordをセーブするためだけのhook
    正直わざわざセーブ用のhookに分ける必要があるかよく分かってない
*/
export default interface ITrainRecordSaver {
    save(record: IQuestionRecord[]): void
    status: BasicStatus
    message: string
}
