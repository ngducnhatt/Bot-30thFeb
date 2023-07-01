const {
    SlashCommandBuilder,
    CommandInteraction,
    PermissionFlagsBits,
    EmbedBuilder,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("contact")
        .setDescription("Nguyen Duc Nhat"),
    execute(interaction, client) {
        const res = new EmbedBuilder()
            .setColor("White")
            .setTitle(`Nguyen Duc Nhat`).setDescription(`
                Made by [@ducnhatnee#5811](https://bit.ly/m/ducnhatnee) :flag_vn:
                Thank you so much for using my bot.

                Contact me:
                Discord : @ducnhatnee#5811
                [Facebook](https://bit.ly/3ykbdSS?r=lp)
                Email : nhaatjisme@gmail.com

                Donate:
                [Paypal](https://www.paypal.com/paypalme/ngnducnhat)
                [Upvote](https://top.gg/bot/985549787946426368)
            `);
        interaction.reply({ embeds: [res], ephemeral: true });
    },
};
