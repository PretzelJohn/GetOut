import { ISettingItem } from '@screens/Settings/components/ISettingItem';
import { useState, useEffect } from 'react';
import { getDatabase } from '../database/Database';

let contacts = false;
let notifications = true;
let whitelist = true;
let blacklist = true;
let block_calls = true;
let theme = "system";
let lastTheme = "system";

//Private function that loads the settings interface
export const _loadSettings = async function() : Promise<ISettingItem> {
    // Create/connect to the database
    const db = await getDatabase();

    // Query the documents in the collection
    await db.settings.find().exec().then((result : any[]) => {
        if(!result || result.length == 0) return;
        contacts = result[0].contacts;
        notifications = result[0].notifications;
        whitelist = result[0].whitelist;
        blacklist = result[0].blacklist;
        block_calls = result[0].block_calls;
        theme = result[0].theme;
    });

    let res : ISettingItem = {
        contacts: contacts,
        notifications: notifications,
        whitelist: whitelist,
        blacklist: blacklist,
        block_calls: block_calls,
        theme: theme
    };

    return res;
}


const _update = async function() : Promise<void> {
    //Create/connect to the database
    const db = await getDatabase();

    await db.settings.atomicUpsert({
        id: "0",
        contacts: contacts,
        notifications: notifications,
        whitelist: whitelist,
        blacklist: blacklist,
        block_calls: block_calls,
        theme: theme
    });
}

// ---------- Setters ----------
//Updates a setting
export const setUseContacts = async function(value: boolean) : Promise<void> {
    contacts = value;
    await _update();
}

//Updates a setting
export const setUseNotifications = async function(value: boolean) : Promise<void> {
    notifications = value;
    await _update();
}

//Updates a setting
export const setUseWhitelist = async function(value: boolean) : Promise<void> {
    whitelist = value;
    await _update();
}

//Updates a setting
export const setUseBlacklist = async function(value: boolean) : Promise<void> {
    blacklist = value;
    await _update();
}

//Updates a setting
export const setBlockCalls = async function(value: boolean) : Promise<void> {
    block_calls = value;
    await _update();
}

//Updates a setting
export const setTheme = async function(value: string) : Promise<void> {
    theme = value;
    await _update();
}


// ---------- Getters ----------
//Return the result of _load, since its async
export const getSettings = function() : ISettingItem {
    const [data, setData] = useState(Object);
    useEffect(() => {
        const fetchData = async () => {
            const data = await _loadSettings();
            setData(data);
        }
        const subscribe = async () => {
            const db = await getDatabase();
            db.settings.$.subscribe((event : any) => {
                if(theme !== lastTheme) {
                    fetchData();
                    lastTheme = theme;
                }
            });
        }
        subscribe();
        fetchData();
    }, []);

    return data;
}

export const getUseContacts = function() : boolean { return contacts; }
export const getUseNotifications = function() : boolean { return notifications; }
export const getUseWhitelist = function() : boolean { return whitelist; }
export const getUseBlacklist = function() : boolean { return blacklist; }
export const getBlockCalls = function() : boolean { return block_calls; }
export const getTheme = function() : string { return theme; }
