const react = require("../../Functions/mongodb-reaction-role");

module.exports = {
    name: "messageReactionRemove",
    run: async (reaction, user, client, container) => {

        if (user.partial) await user.fetch();
        if (reaction.partial) await reaction.fetch();
        if (reaction.message.partial) await reaction.message.fetch();

        let rolefetch = await react.fetchrr(client, reaction.message.guild.id, reaction.message.id, reaction.emoji.name);
        if (!rolefetch) return;
        let member = await reaction.message.guild.members.cache.get(user.id)
        if (member.roles.cache.has(rolefetch.roleid)) {
            await member.roles.remove(rolefetch.roleid)
            console.log(`Role on ${reaction.emoji.name} has been given`)
        }
    }
}