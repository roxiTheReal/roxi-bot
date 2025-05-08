const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kicks a member from the server.')
        .addStringOption(option =>
            option.setName('user')
                .setDescription('The user to kick')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for the kick')
                .setRequired(false)),
    async execute(interaction) {
        const user = interaction.options.getString('user');
        const reason = interaction.options.getString('reason') || 'No reason provided';

        const member = interaction.guild.members.cache.find(member => member.user.username === user);

        if (!member) {
            return interaction.reply({ content: `User ${user} not found.`, ephemeral: true });
        }

        try {
            await member.kick(reason);
            return interaction.reply({ content: `Successfully kicked ${user} for: ${reason}`, ephemeral: true });
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: `Failed to kick ${user}.`, ephemeral: true });
        }
    }
}