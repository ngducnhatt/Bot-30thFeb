const { MessageCollector } = require("discord.js");
const {
    Guild,
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
    name: "guildCreate",
    execute(guild, client) {
        const { name, members, channels } = guild;

        let channelToSend;

        channels.cache.forEach((channel) => {
            if (
                channel.type === 0 &&
                !channelToSend &&
                channel.permissionsFor(members.me).has("SendMessages")
            )
                channelToSend = channel;
        });

        if (!channelToSend) return;

        const add_embed = new EmbedBuilder().setColor("White").setAuthor({
            name: "Bot-Ducnhat",
            iconURL: "https://i.imgur.com/g2R1uQt.gif",
            url: "https://bit.ly/m/ducnhatnee",
        }).setDescription(`
                Thanks for using me 🤍 Have a nice day
                </help:1026073187840172113> show all commands
            `);
        const add_row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setLabel(`Up vote`)
                .setStyle(ButtonStyle.Link)
                .setEmoji("🤍")
                .setURL("https://top.gg/bot/985549787946426368")
        );
        channelToSend.send({ embeds: [add_embed], components: [add_row] });
    },
};
