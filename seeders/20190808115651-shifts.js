

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "shifts",
      [
        {
          shift_date: "2019-08-08",
          shift_start: "08:00",
          shift_end: "16:00",
          needed: 3,
          shift_notes: "test"
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("shifts", null, {});
  }
};
