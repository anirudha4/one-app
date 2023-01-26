/**
 * Transaction.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    name: {
      type: 'string',
      required: true
    },
    type: {
      type: 'string',
      defaultsTo: 'expense'
    },
    amount: {
      type: 'number',
      columnType: 'FLOAT',
      required: true
    },
    date: {
      type: 'ref',
      required: true
    },
    description: {
      type: 'string'
    },
    isRecurring: {
      type: 'boolean',
      defaultsTo: false,
      columnName: 'is_recurring'
    },


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    categoryId: {
      model: 'Category',
      required: true,
      columnName: 'category_id',
    },
    organizationId: {
      model: 'Organization',
      required: true,
      columnName: 'organization_id',
    },
    userId: {
      model: 'User',
      required: true,
      columnName: 'user_id',
    }
  },
  tableName: 'transaction'
};

