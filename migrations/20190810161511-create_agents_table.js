

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('agents', {
      agent_id: {
        type: Sequelize.INTEGER(12),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      surname: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      monthly_hours: {
        type: Sequelize.REAL(12),
        defaultValue: 0,
      },
      visa_expiration: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      never_on: {
        type: Sequelize.STRING(12),
      },
      notes: {
        type: Sequelize.STRING(32),
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('agents');
  },
};
