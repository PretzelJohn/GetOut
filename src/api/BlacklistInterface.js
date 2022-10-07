import { useState, useEffect } from 'react';
import { getDatabase } from "../database/Database";


//Private function that loads the blacklist
const _load = async function() {
    //Create/connect to the database
    const db = await getDatabase();

    //Query the documents in the collection
    let list = [];
    await db.blacklist.find().exec().then(result => {
        if(!result) return;
        for(let i = 0; i < result.length; i++) {
            list.push({
                phone_number: result[i].phone_number
            });
        }
    });

    console.log('Blacklist: ');
    console.log(list);
    return list;
}


//Return the result of _load, since its async
export const getBlacklist = function() {
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


//Insert a phone number (full or partial) into the blacklist
export const insert = async function(phone_number) {
    //Create/connect to the database
    const db = await getDatabase();

    //Insert a document into the collection
    await db.blacklist.atomicUpsert({
        phone_number: phone_number
    });
}