import { getDatabase } from '../database/Database';


//Tests the call log, whitelist, and blacklist schemas
const test = async function () {
    //Create/connect to the database
    const db = await getDatabase();
    console.log('Connected to db!');

    //Insert a document ("row") into the collection ("table")
    await db.callLog.atomicUpsert({
        phone_number: '6784218760',
        timestamp: 1665011680,
        location: 'Test2',
        blocked: false
    });

    //Query the documents ("rows") in the collection ("table")
    db.callLog.find().exec().then(result => {
        if(!result) return;
        console.log('Call log: '+result[0].phone_number);
    });


    //Insert a document into the collection
    await db.whitelist.atomicUpsert({
        phone_number: '678421*'
    });

    //Query the documents in the collection
    db.whitelist.find().exec().then(result => {
        if(!result) return;
        console.log('Whitelist: '+result[0].phone_number);
    });


    //Insert a document into the collection
    await db.blacklist.atomicUpsert({
        phone_number: '678*'
    });

    //Query the documents in the collection
    db.blacklist.find().exec().then(result => {
        if(!result) return;
        console.log('Blacklist: '+result[0].phone_number);
    });
}

export default test;
