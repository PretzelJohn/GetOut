import { IListItem } from '@shared-components/list-item/IListItem';
import { useState, useEffect } from 'react';
import { getDatabase } from "../database/Database";


//Private function that loads the whitelist
const _load = async function() {
    //Create/connect to the database
    const db = await getDatabase();

    //Query the documents in the collection
    let list : Array<any> = [];
    await db.whitelist.find().exec().then((result: any[]) => {
        if(!result) return;
        for(let i = 0; i < result.length; i++) {
            list.push({
                phone_number: result[i].phone_number
            });
        }
    });

    console.log('Whitelist: ');
    console.log(list);
    return list;
}


//Return the result of _load, since its async
export const getWhitelist = function() {
    const [data, setData] = useState(Array<IListItem>);
    useEffect(() => {
      const fetchData = async () => {
        const data = await _load();
        setData(data);
      }
      fetchData();
    }, []);

    return data;
}


//Insert a phone number (full or partial) into the whitelist
export const insert = async function(phone_number : string) {
    //Create/connect to the database
    const db = await getDatabase();

    //Insert a document into the collection
    db.whitelist.atomicUpsert({
        phone_number: phone_number
    });
}

