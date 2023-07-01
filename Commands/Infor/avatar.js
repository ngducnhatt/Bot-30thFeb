const {
    SlashCommandBuilder,
    CommandInteraction,
    PermissionFlagsBits,
    EmbedBuilder,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("avatar")
        .setDescription("Lấy avatar")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("Chọn người dùng")
                .setRequired(true)
        ),

    async execute(interaction) {
        const { options } = interaction;
        const user = options.getUser("user");

        const res = new EmbedBuilder()
            .setColor("White")
            .setTitle(`Avatar của ${user.username}`)
            .setImage(user.displayAvatarURL({ format: "png", size: 1024 }))
            .setDescription(
                `Tải Avatar [tại đây](${user.displayAvatarURL({
                    format: "png",
                    size: 1024,
                })})`
            );
        await interaction.reply({ embeds: [res], ephemeral: true });
    },
};
