const {
    SlashCommandBuilder,
    CommandInteraction,
    PermissionFlagsBits,
    EmbedBuilder,
} = require("discord.js");

const { bitlykey } = require("../../config.json");
const { BitlyClient } = require("bitly");
const bitly = new BitlyClient(bitlykey, {});

module.exports = {
    data: new SlashCommandBuilder()
        .setName("short-url")
        .setDescription("Rút gọn link")
        .addStringOption((option) =>
            option.setName("url").setDescription("Link URL").setRequired(true)
        ),

    async execute(interaction) {
        const { options } = interaction;
        let longUrl = options.getString("url");

        bitly
            .shorten(longUrl)
            .then(function (result) {
                const res = new EmbedBuilder()
                    .setColor("White")
                    .setTitle(`Đã rút gọn thành công`)
                    .setDescription(`Truy cập tại đây\n${result.link}`);
                interaction.reply({ embeds: [res], ephemeral: true });
            })
            .catch(function (error) {
                const res = new EmbedBuilder()
                    .setColor("White")
                    .setDescription(`Đã có lỗi vui lòng thử lại`);
                return interaction.reply({ embeds: [res], ephemeral: true });
            });
    },
};
