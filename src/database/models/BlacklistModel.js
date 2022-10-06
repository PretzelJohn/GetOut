
//Define the schema for the call log entries
const blacklistSchema = {
    title: 'Blacklist',
    description: 'contains user blacklist preferences',
    version: 0,
    primaryKey: 'phone_number',
    type: 'object',
    properties: {
        phone_number: {
            type: 'string'
        }
    },
    required: ['phone_number']
}

//Define the collection for storage and ORM methods
const blacklistCollection = {
    blacklist: {
        schema: blacklistSchema
    }
}

export default blacklistCollection;
