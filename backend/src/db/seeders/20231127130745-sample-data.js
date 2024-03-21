const db = require('../models');
const Users = db.users;

const Startups = db.startups;

const StartupsData = [
  {
    startupName: 'I want my damn cart back',

    contactPerson: 'Like a red-headed stepchild',

    phoneNumber: 'That goddamn Datamate',

    email: 'antwan_kessler@donnelly.io',
  },

  {
    startupName: 'Standby',

    contactPerson: 'Let me tell ya',

    phoneNumber: 'Always the last one to the party',

    email: 'benton@zulauf-vonrueden.com',
  },

  {
    startupName: "I'm washing my hands of it",

    contactPerson: 'That damn Bill Stull',

    phoneNumber: 'So I was walking Oscar',

    email: 'fumiko@corwin.info',
  },

  {
    startupName: 'I want my 5$ back',

    contactPerson: 'That damn Bill Stull',

    phoneNumber: 'Yup',

    email: 'barrie@quigley.org',
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
