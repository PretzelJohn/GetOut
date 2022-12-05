
//Define the schema for the call log entries
const schema = {
    title: 'Whitelist',
    description: 'contains user whitelist preferences',
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
export const collection = {
    whitelist: {
        schema: schema
    }
}
