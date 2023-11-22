import BasicStatus from "./BasicStatus";

export default interface IRequestManager<Request, Response> {
    get(url: string, data?: Request): void //statusを監視すればいいから、Promiseはいらないと思う
    post(url: string, data?: Request): void
    status: BasicStatus
    data: Response | null
}
