import { useState, useEffect } from 'react';
import { ICallLogItem } from '@screens/CallLog/components/card-item/ICallLogItem';
import { getDatabase } from '../database/Database';


//Private function that loads the call log
const _load = async function(showAll : boolean) {
    //Create/connect to the database
    const db = await getDatabase();

    //Query the documents in the collection
    let list : Array<ICallLogItem> = [];
    await db.callLog.find({sort: [{timestamp: 'desc'}]}).exec().then((result: any[]) => {
        if(!result) return;
        for(let i = 0; i < result.length; i++) {
            if(!showAll && !result[i].blocked) continue;
            list.push({
                number: result[i].phone_number,
                location: result[i].location,
                timestamp: result[i].timestamp,
                blocked: result[i].blocked
            });
        }
    });

    return list;
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
