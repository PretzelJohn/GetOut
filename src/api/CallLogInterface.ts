import { useState, useEffect } from 'react';
import { ICardItem } from '@models/CardItem';
import { getDatabase } from '../database/Database';


//Private function that loads the call log
const _load = async function() {
    //Create/connect to the database
    const db = await getDatabase();

    //Query the documents in the collection
    let list : Array<ICardItem> = [];
    await db.callLog.find({sort: [{timestamp: 'desc'}]}).exec().then((result: any[]) => {
        if(!result) return;
        for(let i = 0; i < result.length; i++) {
            const date = new Date(result[i].timestamp);
            list.push({
                number: result[i].phone_number,
                location: result[i].location,
                date: date.toLocaleDateString(),
                time: date.toLocaleTimeString()
            });
        }
    });

    console.log('Call log: ');
    console.log(list);
    return list;
}


//Return the result of _load, since its async
export const getCallList = function () {
    const [data, setData] = useState(Array<ICardItem>);
    useEffect(() => {
      const fetchData = async () => {
        const data = await _load();
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
