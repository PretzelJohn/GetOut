// TODO: Possibly change for input sanitization
export interface ICallLogItem {
    phone_number: string;
    location: string;
    timestamp: number;
    blocked: boolean;
}