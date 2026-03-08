const { SlashCommandBuilder } = require('discord.js');
const canManageRole = require('../utils/permissionCheck');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('temprole')
    .setDescription('Give a role temporarily')
    .addUserOption(opt => opt.setName('user').setDescription('Target user').setRequired(true))
    .addRoleOption(opt => opt.setName('role').setDescription('Role to give').setRequired(true))
    .addIntegerOption(opt => opt.setName('duration').setDescription('Duration in seconds').setRequired(true)),

  async execute(interaction) {
    const member = interaction.options.getMember('user');
    const role = interaction.options.getRole('role');
    const duration = interaction.options.getInteger('duration');

    if (!canManageRole(interaction, role.id)) {
      return interaction.reply({ content: '🚫 You are not authorized to manage this role.', ephemeral: true });
    }

    await member.roles.add(role);
    await interaction.reply({ content: `⏳ ${role.name} added to ${member.displayName} for ${duration}s.`, ephemeral: true });

    setTimeout(async () => {
      await member.roles.remove(role);
    }, duration * 1000);
  }
};
