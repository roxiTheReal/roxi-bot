const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Provides info about the server.'),
    async execute(interaction) {
        await interaction.reply(`This server's name is  ${interaction.guild.name}, and currently has ${interaction.guild.memberCount} members.`)
    },
};