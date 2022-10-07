import { useState, useEffect } from 'react';
import MockCallLogData from './mock/MockCallLogData';

const _load = async function() {
    return MockCallLogData;
}

//Temporary function that returns mock data
export const getCallList = function () {
    const [data, setData] = useState(Array);
    useEffect(() => {
      const fetchData = async () => {
        const data = await _load();
        setData(data);
      }
      fetchData();
    }, []);

    return data;
}



const insert = async function(phone_number, timestamp=Date.now(), location='', blocked=false) {
    //Create/connect to the database
    const db = await getDatabase();
    console.log('Connected to db!');

    //Insert a document ("row") into the collection ("table")
    await db.callLog.atomicUpsert({
        phone_number: phone_number,
        timestamp: timestamp,
        location: location,
        blocked: blocked
    });
}
