const { MessageCollector } = require("discord.js");
const {
    EmbedBuilder,
    ButtonStyle,
    ActionRowBuilder,
    ButtonBuilder,
    SlashCommandBuilder,
    CommandInteraction,
    PermissionFlagsBits,
    messageLink,
} = require("discord.js");
module.exports = {
    name: "messageCreate",

    execute(message, client) {
        if (!message.mentions.users.first()) return;
        if (message.mentions.users.first().id == "985549787946426368") {
            const tag_embed = new EmbedBuilder().setColor("White").setAuthor({
                name: "Bot-Ducnhat",
                iconURL: "https://i.imgur.com/g2R1uQt.gif",
                url: "https://bit.ly/m/ducnhatnee",
            }).setDescription(`
                    </help:1026073187840172113> show all commands
                `);
            const tag_row = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setLabel(`Up vote`)
                    .setStyle(ButtonStyle.Link)
                    .setEmoji("🤍")
                    .setURL("https://top.gg/bot/985549787946426368")
            );
            message.reply({ embeds: [tag_embed], components: [tag_row] });
        }
    },
};
