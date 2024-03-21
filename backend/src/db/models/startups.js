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

  startups.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.startups.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.startups.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return startups;
};
