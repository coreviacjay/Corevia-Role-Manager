const fs = require('fs');
const path = require('path');
const managersPath = path.join(__dirname, '../data/managers.json');

module.exports = function canManageRole(interaction, roleId) {
  const hasDiscordPermission = interaction.member.permissions.has('ManageRoles');
  if (hasDiscordPermission) return true;

  if (!fs.existsSync(managersPath)) return false;
  const data = JSON.parse(fs.readFileSync(managersPath));
  const managers = data[interaction.guild.id]?.[roleId] || [];

  return managers.includes(interaction.user.id);
};
