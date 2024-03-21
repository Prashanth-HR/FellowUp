const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const startups = sequelize.define(
    'startups',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      startupName: {
        type: DataTypes.TEXT,
      },

      contactPerson: {
        type: DataTypes.TEXT,
      },
      

      phoneNumber: {
        type: DataTypes.TEXT,
      },

      email: {
        type: DataTypes.TEXT,
      },

      
      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  startups.beforeCreate((startups, options) => {
    startups = trimStringFields(startups);

  });

  startups.beforeUpdate((startups, options) => {
    startups = trimStringFields(startups);
  });

  return startups;
};

function trimStringFields(startups) {
  startups.email = startups.email.trim();

  startups.startupName = startups.startupName ? startups.startupName.trim() : null;

  startups.contactPerson = startups.contactPerson ? startups.contactPerson.trim() : null;

  return startups;
}
