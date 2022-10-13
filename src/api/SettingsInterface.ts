import { ISettingItem } from '@screens/Settings/components/ISettingItem';
import { useState, useEffect } from 'react';
import { getDatabase } from '../database/Database';

let contacts = false;
let notifications = false;
let whitelist = true;
let blacklist = true;
let block_calls = true;
let theme = "system";

//Private function that loads the settings interface
const _load = async function() {
    // Create/connect to the database
    const db = await getDatabase();

    // Query the documents in the collection
    await db.settings.find().exec().then((result : any[]) => {
        if(!result) return;
        for(let i = 0; i < result.length; i++) {
            contacts = result[0].contacts;
            notifications = result[0].notifications;
            whitelist = result[0].whitelist;
            blacklist = result[0].blacklist;
            block_calls = result[0].block_calls;
            theme = result[0].theme;
        }
    });

    let res : ISettingItem = {
        contacts: contacts,
        notifications: notifications,
        whitelist: whitelist,
        blacklist: blacklist,
        block_calls: block_calls,
        theme: theme
    };

    console.log('Settings:');
    console.log(res);
    return res;
}


const _update = async function() {
    //Create/connect to the database
    const db = await getDatabase();

    db.settings.atomicUpsert({
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
export const setContacts = async function(value: boolean) {
    contacts = value;
    _update();
}

//Updates a setting
export const setNotifications = async function(value: boolean) {
    notifications = value;
    _update();
}

//Updates a setting
export const setWhitelist = async function(value: boolean) {
    whitelist = value;
    _update();
}

//Updates a setting
export const setBlacklist = async function(value: boolean) {
    blacklist = value;
    _update();
}

//Updates a setting
export const setBlockCalls = async function(value: boolean) {
    block_calls = value;
    _update();
}

//Updates a setting
export const setTheme = async function(value: string) {
    theme = value;
    _update();
}


// ---------- Getters ----------
//Return the result of _load, since its async
export const getSettings = function() {
    const [data, setData] = useState(Object);
    useEffect(() => {
      const fetchData = async () => {
        const data = await _load();
        setData(data);
      }
      fetchData();
    }, []);

    return data;
}

export const getContacts = function() { return contacts; }
export const getNotifications = function() { return notifications; }
export const getWhitelist = function() { return whitelist; }
export const getBlacklist = function() { return blacklist; }
export const getBlockCalls = function() { return block_calls; }
export const getTheme = function() { return theme; }