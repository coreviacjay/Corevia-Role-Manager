const { SlashCommandBuilder } = require('discord.js');
const canManageRole = require('../utils/permissionCheck');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('addrole')
    .setDescription('Add a role to a user')
    .addUserOption(opt => opt.setName('user').setDescription('Target user').setRequired(true))
    .addRoleOption(opt => opt.setName('role').setDescription('Role to add').setRequired(true)),

  async execute(interaction) {
    const member = interaction.options.getMember('user');
    const role = interaction.options.getRole('role');

    if (!canManageRole(interaction, role.id)) {
      return interaction.reply({ content: '🚫 You are not authorized to manage this role.', ephemeral: true });
    }

    await member.roles.add(role);
    await interaction.reply({ content: `✅ Added ${role.name} to ${member.displayName}.`, ephemeral: true });
  }
};
