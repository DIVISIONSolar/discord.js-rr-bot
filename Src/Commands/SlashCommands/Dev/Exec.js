const { exec } = require("child_process")
module.exports = {
    name: 'exec',
    ownerOnly: true,
    options: [{
        name: 'command',
        description: 'The command to execute',
        required: true,
        type: 'STRING'
    }],
    run: async (client, interaction, container) => {
        const row = new container.Discord.MessageActionRow()
        .addComponents(
            new container.Discord.MessageButton()
            .setCustomId('evalbtn')
            .setLabel('Delete Output')
            .setStyle('DANGER')
            )
            let lola = interaction.options.getString('command')
            if (!lola) return interaction.reply("Please provide what to execute in the terminal!")
            exec(`${lola}`, (error, stdout) => {
                let response = (error || stdout)
                if (error) {
                    interaction.reply({
                        content:`\`\`\`js\n${error.message}\n\`\`\``,
                        components: [row]
                    })
                } else {
                    interaction.reply({
                        content:`\`\`\`js\n${response}\n\`\`\``,
                        components: [row]
                    })
                }
            })
        }
    }