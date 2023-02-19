/**
 * SplitwiseTransaction.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    referenceId: {
      type: 'string',
      required: true,
      columnName: 'reference_id'
    },
    groupName: {
      type: 'string',
      allowNull: true,
      columnName: 'group_name'
    },
    creationMethod: {
      type: 'string',
      allowNull: true,
      columnName: 'creation_method'
    },
    friends: {
      type: 'json',
      defaultsTo: {},
    },
    createdBy: {
      type: 'json',
      defaultsTo: {},
      columnName: 'created_by'
    },


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    splitwiseIntegrationId: {
      model: 'SplitwiseIntegration',
      required: true,
      columnName: 'splitwise_integration_id',
    },
    organizationId: {
      model: 'Organization',
      required: true,
      columnName: 'organization_id',
    },
    transactionId: {
      model: 'Transaction',
      required: true,
      columnName: 'transaction_id',
    }
  },
  tableName: 'splitwise_transaction'
};

