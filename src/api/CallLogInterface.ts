import { useState, useEffect } from 'react';
import { ICallLogItem } from '@screens/CallLog/components/card-item/ICallLogItem';
import { getDatabase } from '../database/Database';


//Private function that loads the call log
const _load = async function(showAll : boolean) {
    //Create/connect to the database
    const db = await getDatabase();

    //Query the documents in the collection
    const query = {selector: {}, sort: [{timestamp: 'desc'}], limit: 100};
    if(!showAll) query["selector"] = ({blocked: true});
    return await db.callLog.find(query).exec();
}


//Return the result of _load, since its async
export const getCallList = function (showAll : boolean) {
    const [data, setData] = useState(Array<ICallLogItem>);
    useEffect(() => {
      const fetchData = async () => {
        const data = await _load(showAll);
        setData(data);
      }
      fetchData();
    }, []);

    return data;
}


//Inserts or updates a call log entry
export const insert = async function(phone_number : string, timestamp=Date.now(), location='', blocked=false) {
    //Create/connect to the database
    const db = await getDatabase();

    //Insert a document ("row") into the collection ("table")
    await db.callLog.atomicUpsert({
        phone_number: phone_number,
        timestamp: timestamp,
        location: location,
        blocked: blocked
    });
}
