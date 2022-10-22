import { IListItem } from '@shared-components/list-item/IListItem';
import { useState, useEffect } from 'react';
import { RxDocument } from 'rxdb';
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

// TODO: Possibly handle more than one value, depends on how we're handling removal on the frontend
// Returns true if query and removal was successful, otherwise returns false.
const _remove = async function(phone_number : string) {
    // Create/ connect to databse
    const db = await getDatabase();

    // Initial Attempt:
    const query = db.blacklist.findOne(phone_number);
    const result = await query.exec();

    if (result != null) {
        let removeState = false;
        result.deleted$.subscribe((state : any) => removeState = state);

        await result.remove();

        return removeState;
    } else {
        return false;
    }
}

// TODO: Improve search functionality by allowing partial numbers, characters, etc.
const _search = async function(phone_number : string) {
    // Create / connect to database
    const db = await getDatabase();

    // Query database for search term
    let result_list : Array<any> = [];
    await db.blacklist.find({
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

// Edit an existing phone number in the blacklist
export const edit = function(old_value : string, new_value : string) {
    remove(old_value);
    insert(new_value);
}

// Remove a phone number (full or partial) from the blacklist
export const remove = function(phone_number : string) {
    const [data, setData] = useState(Boolean);
    useEffect(() => {
      const fetchData = async () => {
        const data = await _remove(phone_number);
        setData(data);
      }
      fetchData();
    }, []);

    return data;
}

// Returns an array of RxDocuments to be displayed on the frontend
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