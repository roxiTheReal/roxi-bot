const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Bot ready! Logged in as ${client.user.tag}`);

        const { REST, Routes } = require('discord.js');
        const { clientId, guildId, token } = require('../config.json');
        const fs = require('node:fs');
        const path = require('node:path');

        const commands = [];

        const foldersPath = path.join(__dirname, '../commands');
        const commandFolders = fs.readdirSync(foldersPath);

        for (const folder of commandFolders) {
            const commandsPath = path.join(foldersPath, folder);
            const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const filePath = path.join(commandsPath, file);
                const command = require(filePath);
                if ('data' in command && 'execute' in command) {
                    commands.push(command.data.toJSON());
                } else {
                    console.warn(`[WARN] Command at ${filePath} is missing a required "data" or "execute" property. Command won't work!`);
                }
            }
        }

        const rest = new REST().setToken(token);

        (async () => {
            try {
                console.log(`Refreshing ${commands.length} application (/) commands.`);
            
                const data = await rest.put(
                    Routes.applicationCommands(clientId),
                    { body: commands },
                );
            
                console.log(`Reloaded ${data.length} application (/) commands succesfully.`);
            } catch (error) {
                console.error(error);
            }
        })();
    },
};