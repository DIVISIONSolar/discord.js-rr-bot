(async () => {
const Discord = require("discord.js");
const config = require("./Config");
const path = __dirname;
const react = require("./Src/Functions/mongodb-reaction-role/index");
const client = new Discord.Client({
    intents: 32767,
    partials: ["MESSAGE", "CHANNEL", "GUILD_MEMBER", "REACTION", "MESSAGE", "USER"]
});
exports.client = client;
exports.path = path;
exports.config = config;
client.commands = {};
client.events = new Discord.Collection();
client.commands.messageCommands = new Discord.Collection();
client.commands.messageCommands.aliases = new Discord.Collection();
client.commands.contextMenus = new Discord.Collection();
client.commands.slashCommands = new Discord.Collection();
client.commands.buttonCommands = new Discord.Collection();
client.commands.selectMenus = new Discord.Collection();

// The maps of the reactions. uh idk what to call it

client.react = new Map();  // do not rename here something, or else ded // save all msg id, role id
client.fetchforguild = new Map()
// end of that shit
    
const Handler = require(`${path}/Src/Structures/Handlers/Handler`);
await Handler.loadMessageCommands(client, path);
await Handler.loadEvents(client);
await client.login(config.token);
await Handler.loadSlashCommands(client, path);
await Handler.loadContextMenus(client, path);
await Handler.loadButtonCommands(client, path);
await Handler.loadSelectMenus(client, path);

react.setURL(config.mongo);

})()