const {
    SlashCommandBuilder,
    CommandInteraction,
    PermissionFlagsBits,
    EmbedBuilder,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Speed test"),
    execute(interaction, client) {
        const res = new EmbedBuilder()
            .setColor("White")
            .setDescription(`${client.ws.ping}ms`);
        interaction.reply({ embeds: [res], ephemeral: true });
    },
};
