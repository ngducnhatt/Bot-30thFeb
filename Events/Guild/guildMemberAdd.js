const { EmbedBuilder } = require("@discordjs/builders");

module.exports = {
    name: "guildMemberAdd",
    async execute(member) {
        const { guild } = member;
        const welcomeChannel = member.guild.channels.cache.get(channel);
        const welcomeEmbed = new EmbedBuilder()
            .setAuthor({
                name: `${member.user.username}`,
                iconURL: `${member.user.displayAvatarURL()}`,
            })
            .setDescription(
                Msg +
                    `Chào mừng bạn đến với máy chủ` +
                    `\n\n>Thành viên: \`${guild.memberCount}\``
            )
            .setThumbnail(member.user.displayAvatarURL())
            .setColor("White")
            .setTimestamp();

        welcomeChannel.send({ embeds: [welcomeEmbed] });
        member.roles.add(Role);
    },
};
