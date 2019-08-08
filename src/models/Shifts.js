const Sequelize = require('sequelize');
const sequelize = require('../config/database.js');
const Model = Sequelize.Model;

class Shifts extends Model {}

Shifts.init(
  {
    shift_id: {
      type: Sequelize.INTEGER(12),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    shift_date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    shift_start: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    shift_end: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    needed: {
      type: Sequelize.INTEGER(8),
      allowNull: false,
      defaultValue: 0,
    },
    shift_notes: {
      type: Sequelize.STRING(32),
    },
  },
  {
    sequelize,
    tableName: 'shifts',
    // options
  }
);

module.exports = Shifts;
