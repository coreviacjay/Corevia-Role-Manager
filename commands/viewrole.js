const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const managersPath = path.join(__dirname, '../data/managers.json');
const canManageRole = require('../utils/permissionCheck');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('viewrole')
    .setDescription('View details about a role')
    .addRoleOption(opt => opt.setName('role').setDescription('Role to inspect').setRequired(true)),

  async execute(interaction) {
    const role = interaction.options.getRole('role');

    if (!canManageRole(interaction, role.id)) {
      return interaction.reply({ content: '🚫 You are not authorized to view this role.', ephemeral: true });
    }

    const guild = interaction.guild;
    const membersWithRole = guild.members.cache.filter(member => member.roles.cache.has(role.id));
    const userCount = membersWithRole.size;

    let managers = [];
    if (fs.existsSync(managersPath)) {
      const data = JSON.parse(fs.readFileSync(managersPath));
      managers = data[guild.id]?.[role.id] || [];
    }

    const managerMentions = managers.length
      ? managers.map(id => `<@${id}>`).join(', ')
      : 'None assigned';

    const embed = new EmbedBuilder()
      .setTitle(`Role Information: ${role.name}`)
      .setColor(role.color || 0x6c0b0b)
      .addFields(
        { name: 'Name', value: `<@&${role.id}>`, inline: true },
        { name: 'Users', value: `${userCount}`, inline: true },
        { name: 'Color', value: `#${role.color.toString(16).padStart(6, '0')}`, inline: true },
        { name: 'Role ID', value: `${role.id}`, inline: false },
        { name: 'Managers', value: managerMentions, inline: false }
      )
      .setFooter({ text: 'Managers can add & remove this role from other members.' });

    await interaction.reply({ embeds: [embed], ephemeral: true });
  }
};
