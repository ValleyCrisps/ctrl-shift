

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'agents',
      [
        {
          name: 'Cristina',
          surname: 'Valle',
          visa_expiration: '2020-10-30',
          never_on: 'Monday',
          notes: 'test',
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Agents', null, {});
  },
};
