
//Define the schema for the call log entries
const callLogSchema = {
    title: 'Call Log',
    description: 'contains user call history',
    version: 0,
    primaryKey: 'phone_number',
    type: 'object',
    properties: {
        phone_number: {
            type: 'string'
        },
        timestamp: {
            type: 'number'
        },
        location: {
            type: 'string'
        },
        blocked: {
            type: 'boolean'
        }
    },
    required: ['phone_number']
}

//Define the collection for storage and ORM methods
const callLogCollection = {
    callLog: {
        schema: callLogSchema
    }
}

export default callLogCollection;