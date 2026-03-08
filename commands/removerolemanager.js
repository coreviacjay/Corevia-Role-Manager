const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const hasManageRoles = require('../utils/permissionCheck');
const filePath = path.join(__dirname, '../data/managers.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('removerolemanager')
    .setDescription('Remove a user from role managers')
    .addUserOption(opt => opt.setName('user').setDescription('Manager to remove').setRequired(true))
    .addRoleOption(opt => opt.setName('role').setDescription('Role').setRequired(true)),
  async execute(interaction) {
    if (!hasManageRoles(interaction)) return interaction.reply({ content: '🚫 You need Manage Roles.', ephemeral: true });

    const user = interaction.options.getUser('user');
    const role = interaction.options.getRole('role');
    const guildId = interaction.guild.id;

    let data = {};
    if (fs.existsSync(filePath)) data = JSON.parse(fs.readFileSync(filePath));

    if (data[guildId]?.[role.id]) {
      data[guildId][role.id] = data[guildId][role.id].filter(id => id !== user.id);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      return interaction.reply({ content: `✅ Removed ${user.username} from managers of ${role.name}.`, ephemeral: true });
    }

    interaction.reply({ content: `⚠️ ${user.username} is not a manager of ${role.name}.`, ephemeral: true });
  }
};
