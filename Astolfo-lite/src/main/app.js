const { Client } = require('klasa');
const config = require("./config.json");

new Client({
    fetchAllMembers: false,
    prefix: '+',
    commandEditing: true,
    typing: true,
    preserveSettings: false,
    language: 'en-UK',
    readyMessage: (client) => `${config.bot.identity.name} has been initialized.\nBot Information\nAccount : ${client.user.tag}\nGuilds  : ${client.guilds.cache.size}\nUsers   : ${client.users.cache.size}`
}).login(process.env.TOKEN);