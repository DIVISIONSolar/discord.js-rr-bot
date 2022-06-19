const react = require('../../../Functions/mongodb-reaction-role')

module.exports = {
    name: 'reaction',
    description: 'Create/Delete/Edit reaction roles',
    ownerOnly: true,
    options: [{
            name: 'create',
            description: 'Create a reaction role',
            type: 'SUB_COMMAND',
            options: [{
                    name: 'message',
                    description: 'The message ID',
                    required: true,
                    type: 'STRING'
                },
                {
                    name: 'role',
                    description: 'The role ID',
                    required: true,
                    type: 'ROLE'
                },
                {
                    name: 'emoji',
                    description: 'The emoji',
                    required: true,
                    type: 'STRING'
                },
                {
                    name: 'channel',
                    description: 'The channel',
                    required: true,
                    type: 'CHANNEL',
                    channel_type: 'GUILD_TEXT'
                },
            ]
        },
        {
            name: 'delete',
            description: 'Delete a reaction role',
            type: 'SUB_COMMAND',
            options: [{
                    name: 'message',
                    description: 'The message ID',
                    required: true,
                    type: 'STRING'
                },
                {
                    name: 'emoji',
                    description: 'The emoji',
                    required: true,
                    type: 'STRING'
                },
            ]
        }
    ],
    run: async (client, interaction, container) => {

        try {

            if (interaction.options.getSubcommand() === 'create') {

                const message = interaction.options.getString('message');
                const role = interaction.options.getRole('role').id;
                const emoji = interaction.options.getString('emoji');
                const channel = interaction.options.getChannel('channel').id;

                await react.createrr(client, interaction.guild.id, message, role, emoji, false); //the last field is : if the person should be dm

                //find the given message
                const msg = await interaction.guild.channels.cache.find(c => c.id === channel).messages.fetch(message);
                await msg.react(emoji);
                
                interaction.reply("Successfully created the reaction role!")

            } else if (interaction.options.getSubcommand() === 'delete') {

                const message = interaction.options.getString('message');
                const emoji = interaction.options.getString('emoji');

                /// await react.deleterr(client, message.guild.id ,"message.id" , "emoji");
                /// !deleterr <message.id> <emoji> 
                await react.deleterr(client, interaction.guild.id, message, emoji);
                interaction.reply("Successfully deleted the reaction role!")

            }

        } catch (error) {

            console.log(error)
            await interaction.reply("Something went wrong.\n", error);

        }

    }
}