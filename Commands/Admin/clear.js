const {
    SlashCommandBuilder,
    CommandInteraction,
    PermissionFlagsBits,
    EmbedBuilder,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Xóa tin nhắn")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addIntegerOption((option) =>
            option
                .setName("amount")
                .setDescription("Số lượng cần xóa")
                .setRequired(true)
                .setMaxValue(99)
        )
        .addUserOption((option) =>
            option
                .setName("target")
                .setDescription("Tin nhắn của")
                .setRequired(false)
        ),

    async execute(interaction) {
        const { channel, options } = interaction;

        const amount = options.getInteger("amount");
        const target = options.getUser("target");

        const messages = await channel.messages.fetch({
            limit: amount + 1,
        });

        const res = new EmbedBuilder().setColor("White");

        if (target) {
            let i = 0;
            const filtered = [];

            (await messages).filter((msg) => {
                if (msg.author.id === target.id && amount > i) {
                    filtered.push(msg);
                    i++;
                }
            });

            await channel.bulkDelete(filtered).then((messages) => {
                res.setDescription(
                    `Đã xóa ${messages.size} tin nhắn từ ${target}`
                );
                interaction.reply({ embeds: [res], ephemeral: true });
            });
        } else {
            await channel.bulkDelete(amount, true).then((messages) => {
                res.setDescription(`Đã xóa ${messages.size} tin nhắn`);
                interaction.reply({ embeds: [res], ephemeral: true });
            });
        }
    },
};
