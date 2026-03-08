const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Show all available commands and what they do'),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('🛠 CJay Role Manager Help')
      .setColor(0x6c0b0b)
      .setDescription('Manage roles and permissions across your server with cinematic precision.')
      .addFields(
        {
          name: '/addrole',
          value: 'Add a role to a user. Requires you to be a manager of that role.',
          inline: false
        },
        {
          name: '/removerole',
          value: 'Remove a role from a user. Requires you to be a manager of that role.',
          inline: false
        },
        {
          name: '/temprole',
          value: 'Give a role temporarily. Requires you to be a manager of that role.',
          inline: false
        },
        {
          name: '/viewrole',
          value: 'View role details and its managers. Requires you to be a manager of that role.',
          inline: false
        },
        {
          name: '/addrolemanager',
          value: 'Assign a user as manager of a role. Requires Manage Roles permission.',
          inline: false
        },
        {
          name: '/removerolemanager',
          value: 'Remove a user from role managers. Requires Manage Roles permission.',
          inline: false
        },
        {
          name: '/help',
          value: 'Show this help message.',
          inline: false
        }
      )
      .setFooter({ text: 'Corevia Global • Modular Role Control' });

    await interaction.reply({ embeds: [embed], ephemeral: true });
  }
};
