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
        .setName("notification")
        .setDescription("Tạo thông báo (gửi tin nhắn)")
        .addChannelOption((option) =>
            option
                .setName("channel")
                .setDescription("Chọn kênh cần gửi")
                .setRequired(true)
                .addChannelTypes(0, 5)
        )
        .addStringOption((option) =>
            option.setName("title").setDescription("Tiêu đề").setRequired(false)
        )
        .addStringOption((option) =>
            option
                .setName("description")
                .setDescription("Nội dung")
                .setRequired(false)
        )
        .addAttachmentOption((option) =>
            option.setName("image").setDescription("Ảnh").setRequired(false)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const channel = interaction.options.getChannel("channel");
        const title = interaction.options.getString("title");
        const description = interaction.options.getString("description");
        const file = interaction.options.getAttachment("image");

        const notiEmbed = new EmbedBuilder().setColor("White");
        if (interaction.user.id != "622654577128505344") {
            return interaction.reply({
                embeds: [
                    notiEmbed
                        .setDescription(
                            "Chỉ Nguyen Duc Nhat mới dùng được lệnh này"
                        )
                        .setColor("Red"),
                ],
                ephemeral: true,
            });
        }
        if (title) notiEmbed.setTitle(title);
        if (description) notiEmbed.setDescription(description);
        if (file) notiEmbed.setImage(file.url);

        if (!title && !description && !file)
            return interaction.reply({
                content: `Đã có lỗi vui lòng thử lại`,
                ephemeral: true,
            });

        let sendChannel = channel.send({
            embeds: [notiEmbed],
        });
        if (!sendChannel) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`Đã có lỗi vui lòng thử lại`)
                        .setColor("Red"),
                ],
                ephemeral: true,
            });
        } else {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(
                            `Đã gửi tin nhắn thông báo tại ${channel}`
                        )
                        .setColor("Blue"),
                ],
                ephemeral: true,
            });
        }
    },
};
