import { createRxDatabase, RxDatabase } from 'rxdb';
import { getRxStorageMemory } from 'rxdb/plugins/memory';

import { CallLogSchema, CallLogDocument, CallLogCollection,
         callLogCollectionMethods, callLogDocMethods, CallLogDocType } from './CallLogModel';

type GODB_Collections = {
    callLogs: CallLogCollection
}

type GODB = RxDatabase<GODB_Collections>;

/* Initialize -- Databse and Collections */
const db: GODB = await createRxDatabase<GODB_Collections>({
    name: 'GetOutDB',
    storage: getRxStorageMemory()
});

await db.addCollections({
    callLogs: {
        schema:  CallLogSchema,
        methods: callLogDocMethods,
        statics: callLogCollectionMethods
    }
})

/** Testing -- will be moved **/

/* Hooks */
// post-insert hook - what happens after data is inserted into the db
db.callLogs.postInsert(
    function postInsertHook(
        this: CallLogCollection,
        docData: CallLogDocType,
        doc: CallLogDocument
    ) { // Our post-insert function:
        console.log('Insert into ' + this.name, '-collection: ', + doc.number);
    },
    false
);

/* finally using the database *-_- */
const callDocument : CallLogDocument = await db.callLogs.insert({
    callLogId: 'kljrweiopurndsfvdf',
    number: '678-822-3861',
    location: 'Atlanta, GA',
    date: '10/5/2022',
    time: '4:31PM'
});

console.log('Call From: ' + callDocument.location);

const callLogLength: number = await db.callLogs.getLength('');
console.log(callLogLength);

/* Clean Up */
console.log('Shutting down db...');
db.destroy();