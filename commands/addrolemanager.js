const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const hasManageRoles = require('../utils/permissionCheck');
const filePath = path.join(__dirname, '../data/managers.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('addrolemanager')
    .setDescription('Assign a user as manager of a role')
    .addUserOption(opt => opt.setName('user').setDescription('Manager').setRequired(true))
    .addRoleOption(opt => opt.setName('role').setDescription('Role to manage').setRequired(true)),
  async execute(interaction) {
    if (!hasManageRoles(interaction)) return interaction.reply({ content: '🚫 You need Manage Roles.', ephemeral: true });

    const user = interaction.options.getUser('user');
    const role = interaction.options.getRole('role');
    const guildId = interaction.guild.id;

    let data = {};
    if (fs.existsSync(filePath)) data = JSON.parse(fs.readFileSync(filePath));

    if (!data[guildId]) data[guildId] = {};
    if (!data[guildId][role.id]) data[guildId][role.id] = [];

    if (!data[guildId][role.id].includes(user.id)) {
      data[guildId][role.id].push(user.id);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      return interaction.reply({ content: `✅ ${user.username} is now a manager of ${role.name}.`, ephemeral: true });
    }

    interaction.reply({ content: `⚠️ ${user.username} is already a manager of ${role.name}.`, ephemeral: true });
  }
};
