const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class StartupsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const startups = await db.startups.create(
      {
        id: data.id || undefined,

        startupName: data.startupName || null,
        contactPerson: data.contactPerson || null,
        phoneNumber: data.phoneNumber || null,
        email: data.email || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
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
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const startups = await db.startups.bulkCreate(startupsData, {
      transaction,
    });

    // For each item created, replace relation files

    return startups;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const startups = await db.startups.findByPk(id, {}, { transaction });

    await startups.update(
      {
        startupName: data.startupName || null,
        contactPerson: data.contactPerson || null,
        phoneNumber: data.phoneNumber || null,
        email: data.email || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return startups;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const startups = await db.startups.findByPk(id, options);

    await startups.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

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
    let include = [];

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
          [Op.and]: Utils.ilike(
            'startups',
            'contactPerson',
            filter.contactPerson,
          ),
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

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
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
                : [['createdAt', 'desc']],
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
              : [['createdAt', 'desc']],
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
          Utils.ilike('startups', 'id', query),
        ],
      };
    }

    const records = await db.startups.findAll({
      attributes: ['id', 'id'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['id', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.id,
    }));
  }
};
