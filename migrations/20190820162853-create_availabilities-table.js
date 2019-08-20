module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('availabilities', {
      av_id: {
        type: Sequelize.INTEGER(12),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      agent_id: {
        type: Sequelize.STRING(12),
        references: {
          model: 'Agents',
          key: 'agent_id',
        },
        allowNull: false,
      },
      shift_id: {
        type: Sequelize.STRING(12),
        references: {
          model: 'Shifts',
          key: 'shift_id',
        },
        allowNull: false,
      },
      assigned: {
        type: Sequelize.BOOLEAN(),
        defaultValue: 0,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('availabilities');
  },
};
