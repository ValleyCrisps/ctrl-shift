module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("shifts", {
      shift_id: {
        type: Sequelize.INTEGER(12),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      shift_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      shift_start: {
        type: Sequelize.TIME,
        allowNull: false
      },
      shift_end: {
        type: Sequelize.TIME,
        allowNull: false
      },
      needed: {
        type: Sequelize.INTEGER(8),
        allowNull: false,
        defaultValue: 0
      },
      shift_notes: {
        type: Sequelize.STRING(32)
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("shifts");
  }
};
