export enum Status {
    NonStarted,
    Loading,
    Success,
    Failed
}

export interface IMessage {
    status: Status,
    message?: string
}