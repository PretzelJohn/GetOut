import { IListItem } from '@shared-components/list-item/IListItem';
import { useState, useEffect } from 'react';
import { getDatabase } from "../database/Database";


//Private function that loads the whitelist
export const _loadWhitelist = async function(searchText : string) : Promise<IListItem[]> {
    //Create/connect to the database
    const db = await getDatabase();

    //Initialize empty list and search regex
    let list : Array<IListItem> = [];
    searchText = searchText.replace(/[^0-9]/gim,"");
    let regex = new RegExp(searchText.trim());

    //Find all matching documents in the database
    await db.whitelist.find({
        selector: {
            phone_number: {$regex: regex}
        }
    }).exec().then((result: any[]) => {
        if(!result) return;
        for(let i = 0; i < result.length; i++) {
            list.push({
                phone_number: result[i].phone_number
            });
        }
    });

    return list;
}


//Return the result of _load, since its async
export const getWhitelist = function(searchText : string) : IListItem[] {
    const [data, setData] = useState(Array<IListItem>);

    useEffect(() => {
      const fetchData = async () => {
        const data = await _loadWhitelist(searchText);
        setData(data);
      }
      fetchData();
    }, []);

    return data;
}


// Remove a phone number (full or partial) from the list
export const remove = async function(phone_number : string) : Promise<void> {
    // Create/ connect to databse
    const db = await getDatabase();

    // Initial Attempt:
    const result = await db.whitelist.findOne(phone_number).exec();
    if(!result) return;
    await result.remove();
}


//Insert a phone number (full or partial) into the list
export const insert = async function(phone_number : string) : Promise<void> {
    //Create/connect to the database
    const db = await getDatabase();

    //Insert a document into the collection
    await db.whitelist.atomicUpsert({
        phone_number: phone_number
    });
}


// Edit an existing phone number in the list
export const edit = async function(old_value : string, new_value : string) : Promise<void> {
    await remove(old_value);
    await insert(new_value);
}
