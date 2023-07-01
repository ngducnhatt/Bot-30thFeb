const { Client, GatewayIntentBits, Partials, Collection, EmbedBuilder } = require('discord.js');
const { DiscordTogether } = require('discord-together');
const {Guilds, GuildMembers, GuildMessages} = GatewayIntentBits;
const {User, Message, GuildMember, ThreadMember, Channel} = Partials;

const {loadEvents} = require('./Handlers/eventHandler');
const {loadCommands} = require('./Handlers/commandHandler');

const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages],
    partials: [User, Message, GuildMember, ThreadMember],
});

client.commands = new Collection();
client.discordTogether = new DiscordTogether(client);
client.config = require('./config.json');

client.login(client.config.token).then(() => {
    loadEvents(client);
    loadCommands(client);
});