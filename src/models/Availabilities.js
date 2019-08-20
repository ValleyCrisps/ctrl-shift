const Sequelize = require('sequelize');
const sequelize = require('../config/database.js');
const Model = Sequelize.Model;

class Availabilities extends Model {}

Availabilities.init(
  {
    av_id: {
      type: Sequelize.INTEGER(12),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    assigned: {
      type: Sequelize.BOOLEAN(),
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: 'availabilities',
    // options
  }
);

Availabilities.associate = models => {
  Availabilities.belongsTo(models.Agents, {
    foreignKey: 'agent_id',
    onDelete: 'CASCADE',
  });
  Availabilities.belongsTo(models.Shifts, {
    foreignKey: 'shift_id',
    onDelete: 'CASCADE',
  });
};

module.exports = Availabilities;
