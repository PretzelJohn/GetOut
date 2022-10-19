import { IListItem } from '@shared-components/list-item/IListItem';
import { useState, useEffect } from 'react';
import { getDatabase } from "../database/Database";


//Private function that loads the blacklist
const _load = async function() {
    //Create/connect to the database
    const db = await getDatabase();

    //Query the documents in the collection
    let list : Array<any> = [];
    await db.blacklist.find().exec().then((result : any[]) => {
        if(!result) return;
        for(let i = 0; i < result.length; i++) {
            list.push({
                phone_number: result[i].phone_number
            });
        }
    });

    return list;
}

const _search = async function(phone_number : string) {
    // Create / connect to database
    const db = await getDatabase();

    // Query database for search term
    let result_list : Array<any> = [];
    await db.whitelist.find({
        selector : {
            phone_number : phone_number
        }
    }).exec().then((result: any[]) => {
        if (!result) {
            console.log('Search query not found');
            return;
        } else {
            for (let i = 0; i < result.length; i++) {
                result_list.push({
                    phone_number: result[i].phone_number
                });
            }
        }
    });
    console.log(result_list);
    return result_list;
}

//Return the result of _load, since its async
export const getBlacklist = function() {
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


//Insert a phone number (full or partial) into the blacklist
export const insert = async function(phone_number : string) {
    //Create/connect to the database
    const db = await getDatabase();

    //Insert a document into the collection
    db.blacklist.atomicUpsert({
        phone_number: phone_number
    });
}

export const search = function(phone_number : string) {
    const [data, setData] = useState(Array<IListItem>);
    useEffect(() => {
      const fetchData = async () => {
        const data = await _search(phone_number);
        setData(data);
      }
      fetchData();
    }, []);

    return data;
}