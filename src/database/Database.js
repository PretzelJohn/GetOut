//Install dependencies: npm install rxdb rxjs pouchdb-adapter-react-native-sqlite react-native-sqlite-2 --save

import { createRxDatabase } from 'rxdb';
import { getRxStoragePouch, addPouchPlugin } from 'rxdb/plugins/pouchdb';
import SQLite from 'react-native-sqlite-2'
import SQLiteAdapterFactory from 'pouchdb-adapter-react-native-sqlite'

import * as callLog from './models/CallLogModel';
import * as blacklist from './models/BlacklistModel';
import * as whitelist from './models/WhitelistModel';
import * as settings from './models/SettingsModel';


//Enable the SQLite plugin for PouchDB
const SQLiteAdapter = SQLiteAdapterFactory(SQLite)
addPouchPlugin(SQLiteAdapter);


//Create the database instance
let database = null;

const _create = async function() {
    //Create/connect to the database
    const db = await createRxDatabase({
        name: 'database',
        storage: getRxStoragePouch('react-native-sqlite'),
        multiInstance: false,
        ignoreDuplicate: true
    });
    
    //Add the collections to the database
    await db.addCollections(callLog.collection);
    await db.addCollections(whitelist.collection);
    await db.addCollections(blacklist.collection);
    await db.addCollections(settings.collection);

    return db;
}


//Returns the new or cached db instance
export function getDatabase() {
    if(!database) database = _create();
    return database;
}
