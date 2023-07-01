const {
    EmbedBuilder,
    ButtonStyle,
    ActionRowBuilder,
    ButtonBuilder,
    SlashCommandBuilder,
    CommandInteraction,
    PermissionFlagsBits,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("random")
        .setDescription("Random number")
        .addIntegerOption((option) =>
            option
                .setName("min")
                .setDescription("Số đầu")
                .setRequired(true)
                .setMinValue(0)
        )
        .addIntegerOption((option) =>
            option
                .setName("max")
                .setDescription("Số cuối")
                .setRequired(true)
                .setMaxValue(1000000)
        ),
    async execute(interaction) {
        const min = interaction.options.getInteger("min");
        const max = interaction.options.getInteger("max");
        let random = Math.floor(Math.random() * (max - min + 1)) + min;
        const Random_res = new EmbedBuilder()
            .setColor("White")
            .setDescription(`Số random được là : \`${random}\``);
        await interaction.reply({ embeds: [Random_res], ephemeral: true });
    },
};
