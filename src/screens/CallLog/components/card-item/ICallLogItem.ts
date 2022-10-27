// TODO: Possibly change for input sanitization
export interface ICallLogItem {
    number: string;
    location: string;
    timestamp: number;
    blocked: boolean;
}