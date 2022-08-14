```ts
export const ProductionEnvironment = {
    BOT_TOKEN: '',
    BOT_ID: ``,
    BOT_VERSION: '1.0.0',

    GOOGLE_CLOUD_PROJECT_ID: '',
    GOOGLE_CLOUD_API_KEY: '',
    GOOGLE_CLOUD_API_CLIENT_ID: '',

    MONGO_DB_CONNECTION_URL: '',
    MONGODB_DATABASE_NAME: '',
    MONGODB_CLUSTER_NAME: '',

    MONGODB_CONNECTION_USERNAME: '',
    MONGODB_CONNECTION_PASSWORD: '',
    MONGODB_DATA_API_KEY: '',

    REDIS_URL: '',

    REGISTER_GUILD_COMMANDS: true,
    CLEAR_GUILD_APPLICATION_COMMANDS_ONREADY: false,
    UPDATE_GUILD_APPLICATION_COMMANDS_ONREADY: true,

    REGISTER_GLOBAL_COMMANDS: false,
    CLEAR_GLOBAL_APPLICATION_COMMANDS_ONREADY: false,
    UPDATE_GLOBAL_APPLICATION_COMMANDS_ONREADY: false,

    GUILDS_TO_REGISTER: [''],
    DEBUG_MODE: true,
    REGISTER_SUPER_USERS: [],

    LINKS: {
        DOCUMENTATION: ``,
        DISCORD_BOT_INVITE_LINK: ``,
        SUPPORT_SERVER_INVITE: `https://discord.com/invite/waxQWUH9z3`,
    },

    // Manage which events are enabled or disabled
    EVENTS: {
        ON_READY: true,
        ON_GUILD_CREATE: true,
        ON_GUILD_DELETE: true,
        ON_MESSAGE_MENTION: true,
        ON_TRANSLATION_MODULE: true,
        ON_DEBUG: true,
        ON_INTERACTION_CREATE: true,
        ON_MESSAGE_CREATE: true,
    },

    LOGS: {
        error: {
            enabled: true,
            channelId: ``
        },
        info: {
            enabled: true,
            channelId: ``
        },
        debug: {
            enabled: true,
            channelId: ``
        },
        warn: {
            enabled: true,
            channelId: ``
        },
    }
}

export const LocalEnvironment = {
    BOT_TOKEN: '',
    BOT_ID: ``,
    BOT_VERSION: '1.0.0',

    GOOGLE_CLOUD_PROJECT_ID: '',
    GOOGLE_CLOUD_API_KEY: '',
    GOOGLE_CLOUD_API_CLIENT_ID: '',

    MONGO_DB_CONNECTION_URL: '',
    MONGODB_DATABASE_NAME: '',
    MONGODB_CLUSTER_NAME: '',

    MONGODB_CONNECTION_USERNAME: '',
    MONGODB_CONNECTION_PASSWORD: '',
    MONGODB_DATA_API_KEY: '',

    REDIS_URL: '',

    REGISTER_GUILD_COMMANDS: true,
    CLEAR_GUILD_APPLICATION_COMMANDS_ONREADY: false,
    UPDATE_GUILD_APPLICATION_COMMANDS_ONREADY: true,

    REGISTER_GLOBAL_COMMANDS: false,
    CLEAR_GLOBAL_APPLICATION_COMMANDS_ONREADY: false,
    UPDATE_GLOBAL_APPLICATION_COMMANDS_ONREADY: false,

    GUILDS_TO_REGISTER: [''],
    DEBUG_MODE: true,
    REGISTER_SUPER_USERS: [],

    LINKS: {
        DOCUMENTATION: ``,
        DISCORD_BOT_INVITE_LINK: ``,
        SUPPORT_SERVER_INVITE: `https://discord.com/invite/waxQWUH9z3`,
    },

    // Manage which events are enabled or disabled
    EVENTS: {
        ON_READY: true,
        ON_GUILD_CREATE: true,
        ON_GUILD_DELETE: true,
        ON_MESSAGE_MENTION: true,
        ON_TRANSLATION_MODULE: true,
        ON_DEBUG: true,
        ON_INTERACTION_CREATE: true,
        ON_MESSAGE_CREATE: true,
    },

    LOGS: {
        error: {
            enabled: true,
            channelId: ``
        },
        info: {
            enabled: true,
            channelId: ``
        },
        debug: {
            enabled: true,
            channelId: ``
        },
        warn: {
            enabled: true,
            channelId: ``
        },
    }
}
```