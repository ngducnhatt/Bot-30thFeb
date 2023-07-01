const { Client } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        console.log(`${client.user.username} is now online.`);
        setInterval(() => {
            const activities = [
                {
                    name: "chilling music",
                    type: 1,
                },
                {
                    name: "/profile",
                    type: 3,
                },
                {
                    name: "/help",
                    type: 0,
                },
                {
                    name: "Vietnamese bot",
                    type: 3,
                },
            ];
            const customActi = Math.floor(Math.random() * activities.length);

            client.user.setActivity(`${activities[customActi].name}`, {
                type: activities[customActi].type,
                status: "online",
            });
        }, 5000);

        // | ${client.guilds.cache.size} servers
    },
};
