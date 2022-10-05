import {
    RxDocument,
    RxCollection
} from 'rxdb';

export type CallLogDocType = {
    callLogId: string;
    number: string;
    date: string;
    time: string;
    location?: string;
};

export const CallLogSchema = {
    version: 0,
    title: 'call log schema',
    description: 'represents a call received by the GetOut CallHandler service',
    primaryKey: 'callLogId',
    type: 'object',
    properties: {
        callLogId:  {type: 'string' },
        number:     {type: 'string'},
        location:   {type: 'string'},
        date:       {type: 'string'},
        time:       {type: 'string'}
    },
    required: ['callLogId, number, date'],
};

type CallLogDocMethods = {
    getNumber: () => string;
};


type CallLogCollectionMethods = {
    getLength: (query : string) => Promise<number>;
};

export type CallLogDocument = RxDocument<CallLogDocType, CallLogDocMethods>;
export type CallLogCollection = RxCollection<CallLogDocType, CallLogDocMethods, CallLogCollectionMethods>

/* CallLog Document Methods -- Methods relating to the CallLog data itself */
export const callLogDocMethods = {};

/* CallLog Collection Methods -- Methods relating to the collection of Calls that make up the CallLog */
export const callLogCollectionMethods = {
    getLength: async function(this: CallLogCollection, query: string) {
        if (query === '') {
            const allCalls = await this.find().exec();
            return allCalls.length;
        } else {
            //TODO: Implement finding length of CallLog with specific query
            return -1;
        }
    }
};