const { SlashCommandBuilder } = require('discord.js');
const canManageRole = require('../utils/permissionCheck');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('removerole')
    .setDescription('Remove a role from a user')
    .addUserOption(opt => opt.setName('user').setDescription('Target user').setRequired(true))
    .addRoleOption(opt => opt.setName('role').setDescription('Role to remove').setRequired(true)),

  async execute(interaction) {
    const member = interaction.options.getMember('user');
    const role = interaction.options.getRole('role');

    if (!canManageRole(interaction, role.id)) {
      return interaction.reply({ content: '🚫 You are not authorized to manage this role.', ephemeral: true });
    }

    await member.roles.remove(role);
    await interaction.reply({ content: `✅ Removed ${role.name} from ${member.displayName}.`, ephemeral: true });
  }
};
