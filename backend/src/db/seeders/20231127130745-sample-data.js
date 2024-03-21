const db = require('../models');
const Users = db.users;

const Startups = db.startups;

const StartupsData = [
  {
    startupName: 'Contact the tower',

    contactPerson: "Goin' hog huntin'",

    phoneNumber: 'Standby',

    email: 'verla@stehr-nicolas.com',
  },

  {
    startupName: 'Let me tell ya',

    contactPerson: 'That damn diabetes',

    phoneNumber: 'That damn gimble',

    email: 'regenia.dietrich@jacobson.io',
  },

  {
    startupName: 'That goddamn Datamate',

    contactPerson: 'That goddamn Datamate',

    phoneNumber: 'That damn gimble',

    email: 'chang@tillman-heaney.name',
  },

  {
    startupName: 'So I was walking Oscar',

    contactPerson: 'That damn diabetes',

    phoneNumber: 'Come on now',

    email: 'art@brekke-barton.com',
  },
];

// Similar logic for "relation_many"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Startups.bulkCreate(StartupsData);

    await Promise.all([
      // Similar logic for "relation_many"
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('startups', null, {});
  },
};
