const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const bcrypt = require('bcrypt');
const config = require('../../config');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class StartupsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const startups = await db.startups.create(
      {
        id: data.data.id || undefined,

        startupName: data.data.startupName || null,
        contactPerson: data.data.contactPerson || null,
        phoneNumber: data.data.phoneNumber || null,
        email: data.data.email || null,

      },
      { transaction },
    );

    return startups;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const startupsData = data.map((item, index) => ({
      id: item.id || undefined,

      startupName: item.startupName || null,
      contactPerson: item.contactPerson || null,
      phoneNumber: item.phoneNumber || null,
      email: item.email || null,

    }));

    // Bulk create items
    const startups = await db.startups.bulkCreate(startupsData, { transaction });

    return users;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const startups = await db.startups.findByPk(id, {}, { transaction });

    await users.update(
      {
        startupName: data.startupName || null,
        contactPerson: data.contactPerson || null,
        phoneNumber: data.phoneNumber || null,
        email: data.email || null,

      },
      { transaction },
    );

    return users;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const startups = await db.startups.findByPk(id, options);

    await startups.destroy({
      transaction,
    });

    return startups;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const startups = await db.startups.findOne({ where }, { transaction });

    if (!startups) {
      return startups;
    }

    const output = startups.get({ plain: true });


    return output;
  }

  static async findAll(filter, options) {
    var limit = filter.limit || 0;
    var offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    var orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.startups,
      },

    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.startupName) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('startups', 'startupName', filter.startupName),
        };
      }

      if (filter.contactPerson) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('startups', 'contactPerson', filter.contactPerson),
        };
      }

      if (filter.phoneNumber) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('startups', 'phoneNumber', filter.phoneNumber),
        };
      }

      if (filter.email) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('startups', 'email', filter.email),
        };
      }

    }

    let { rows, count } = options?.countOnly
      ? {
        rows: [],
        count: await db.startups.count({
          where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['desc']],
          transaction,
        }),
      }
      : await db.startups.findAndCountAll({
        where,
        include,
        distinct: true,
        limit: limit ? Number(limit) : undefined,
        offset: offset ? Number(offset) : undefined,
        order:
          filter.field && filter.sort
            ? [[filter.field, filter.sort]]
            : [['desc']],
        transaction,
      });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('startups', 'startupName', query),
        ],
      };
    }

    const records = await db.startups.findAll({
      attributes: ['id', 'startupName'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['startupName', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.startupName,
    }));
  }

  static async createFromAuth(data, options) {
    const transaction = (options && options.transaction) || undefined;
    const startups = await db.startups.create(
      {
        email: data.email,
        startupName: data.startupName,
      },
      { transaction },
    );


    await startups.update(
      {
        authenticationUid: users.id,
      },
      { transaction },
    );

    return startups;
  }

};
