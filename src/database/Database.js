//Install dependencies: npm install rxdb rxjs pouchdb-adapter-react-native-sqlite react-native-sqlite-2 --save

import { createRxDatabase } from 'rxdb';
import { getRxStoragePouch, addPouchPlugin } from 'rxdb/plugins/pouchdb';
import SQLite from 'react-native-sqlite-2'
import SQLiteAdapterFactory from 'pouchdb-adapter-react-native-sqlite'

import callLogCollection from './models/CallLogModel';
import blacklistCollection from './models/BlacklistModel';
import whitelistCollection from './models/WhitelistModel';


//Enable the SQLite plugin for PouchDB
const SQLiteAdapter = SQLiteAdapterFactory(SQLite)
addPouchPlugin(SQLiteAdapter);


//Create the database instance
let dbCache = null;

const _create = async function() {
    //Create/connect to the database
    const db = await createRxDatabase({
        name: 'database',
        storage: getRxStoragePouch('react-native-sqlite'),
        ignoreDuplicate: true
    });
    
    //Add the collections to the database
    await db.addCollections(callLogCollection);
    await db.addCollections(whitelistCollection);
    await db.addCollections(blacklistCollection);

    return db;
}


//Returns the new or cached db instance
export function getDatabase() {
    if(!dbCache) {
        dbCache = _create();
    }
    return dbCache;
}
