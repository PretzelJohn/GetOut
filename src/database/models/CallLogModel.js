
//Define the schema for the call log entries
const schema = {
    title: 'Call Log',
    description: 'contains user call history',
    version: 0,
    primaryKey: {
        key: 'id',
        fields: ['phone_number', 'timestamp'],
        separator: '|'
    },
    type: 'object',
    properties: {
        id: {
            type: 'string',
            maxLength: 100
        },
        phone_number: {
            type: 'string'
        },
        timestamp: {
            type: 'number'
        },
        blocked: {
            type: 'boolean'
        }
    },
    required: ['id', 'phone_number', 'timestamp'],
    indexes: ['timestamp']
}

//Define the collection for storage and ORM methods
export const collection = {
    callLog: {
        schema: schema
    }
}
