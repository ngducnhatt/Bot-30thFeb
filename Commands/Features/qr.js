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
        .setName("qr")
        .setDescription("Tạo QR code")
        .addStringOption((option) =>
            option
                .setName("text")
                .setDescription("Đoạn văn bản hoặc URL")
                .setRequired(true)
        ),
    async execute(interaction) {
        const text = interaction.options.getString("text");
        const QR_res = new EmbedBuilder()
            .setColor("White")
            .setDescription(`Mã QR code của **${text}**`)
            .setImage(
                `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(
                    text
                )}`
            );
        interaction.reply({ embeds: [QR_res], ephemeral: true });
    },
};
