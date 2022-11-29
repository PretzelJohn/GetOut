

// Define the schema for the settings entries
const schema = {
    title: 'Settings',
    description: 'contains user preferences',
    version: 0,
    primaryKey: 'id',
    type: 'object',
    properties: {
        id: {
            type: 'string',
            maxLength: 1
        },
        contacts: {
            type: 'boolean',
            default: false
        },
        notifications: {
            type: 'boolean',
            default: true
        },
        whitelist: {
            type: 'boolean',
            default: true
        },
        blacklist: {
            type: 'boolean',
            default: true
        },
        block_calls: {
            type: 'boolean',
            default: true
        },
        theme: {
            type: 'string',
            default: 'system'
        }
    },
    required: ['id']
}

// Define the collection for storage and ORM
export const collection = {
    settings: {
        schema: schema
    }
}
