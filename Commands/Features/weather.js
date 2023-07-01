const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
} = require("discord.js");
var weather = require("weather-js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("weather")
        .setDescription("Thời tiết")
        .addStringOption((option) =>
            option.setName("city").setDescription("Thành phố").setRequired(true)
        ),
    async execute(interaction) {
        const { options } = interaction;
        let city = options.getString("city");

        weather.find({ search: city, degreeType: "C" }, function (err, result) {
            const res = new EmbedBuilder().setColor("White");
            const nextdayrow = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId("next-day")
                    .setLabel(`Ngày tiếp theo`)
                    .setStyle(ButtonStyle.Primary)
            );
            const predayrow = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId("pre-day")
                    .setLabel(`Ngày hôm nay`)
                    .setStyle(ButtonStyle.Primary)
            );

            if (err) {
                res.setDescription(`Đã có lỗi vui lòng thử lại`).setColor(
                    "Red"
                );
                return interaction.reply({ embeds: [res], ephemeral: true });
            } else if (result.length === 0) {
                res.setDescription(`Không tìm thấy thành phố của bạn`).setColor(
                    "Red"
                );
                return interaction.reply({ embeds: [res], ephemeral: true });
            }
            const data = result[0];
            res.setAuthor({
                name: `Thời tiết tại ${data.location.name}`,
                iconURL: data.current.imageUrl,
            })
                .setThumbnail(`${data.current.imageUrl}`)
                .addFields(
                    {
                        name: `Thành phố`,
                        value: data.location.name,
                        inline: false,
                    },
                    {
                        name: `Thứ`,
                        value: data.current.day,
                        inline: true,
                    },
                    {
                        name: `Ngày`,
                        value: data.current.date,
                        inline: true,
                    },
                    {
                        name: `Giờ`,
                        value: data.current.observationtime,
                        inline: false,
                    },
                    {
                        name: `Mây`,
                        value: data.current.skytext,
                        inline: true,
                    },
                    {
                        name: `Nhiệt độ`,
                        value: `${data.current.temperature}°C`,
                        inline: true,
                    },
                    {
                        name: `Tốc độ gió`,
                        value: data.current.windspeed,
                        inline: true,
                    },
                    {
                        name: `Timezone`,
                        value: `GMT ${data.location.timezone}`,
                        inline: true,
                    }
                );
            interaction.reply({
                embeds: [res],
                ephemeral: false,
                // components: [nextdayrow],
            });

            const filter = (interaction) =>
                interaction.user.id === interaction.member.id;
            const collector =
                interaction.channel.createMessageComponentCollector({
                    filter,
                    time: 15000,
                });
            const nextdayEmbed = new EmbedBuilder()
                .setColor("White")
                .setAuthor({
                    name: `Thời tiết tại ${result[1].location.name}`,
                })
                .addFields(
                    {
                        name: `Thành phố`,
                        value: data.location.name,
                        inline: false,
                    },
                    {
                        name: `Thứ`,
                        value: result[0].forecast[1].day,
                        inline: true,
                    },
                    {
                        name: `Ngày`,
                        value: result[0].forecast[1].date,
                        inline: true,
                    },
                    {
                        name: `Mây`,
                        value: result[0].forecast[1].skytextday,
                        inline: false,
                    },
                    {
                        name: `Nhiệt độ`,
                        value: `${result[0].forecast[1].low}°C => ${result[0].forecast[1].high}°C`,
                        inline: true,
                    }
                );
            collector.on("collect", (interaction) => {
                if (interaction.customId === "next-day") {
                    interaction.update({
                        embeds: [nextdayEmbed],
                        ephemeral: false,
                        components: [predayrow],
                    });
                }
                if (interaction.customId === "pre-day") {
                    interaction.update({
                        embeds: [res],
                        ephemeral: false,
                        // components: [nextdayrow],
                    });
                }
            });
        });
    },
};
