const { Client } = require('klasa');

new Client({
    fetchAllMembers: false,
    prefix: '+',
    commandEditing: true,
    typing: true,
    preserveSettings: false,
    language: 'en-UK',
    readyMessage: (client) => `Astolfo.js has been initialized.\nBot Statistics\nAccount: ${client.user.tag}\nGuilds:: ${client.guilds.cache.size}\nUsers::: ${client.users.cache.size}`
}).login(process.env.TOKEN);