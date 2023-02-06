/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    email: {
      type: 'string',
      // isEmail: true,
      required: true,
    },
    password: {
      type: 'string',
      required: true,
    },
    isAdmin: {
      type: 'boolean',
      defaultsTo: false,
      columnName: 'is_admin',
    },
    name: {
      type: 'string'
    },
    color: {
      type: 'string'
    },
    isEmailVerified: {
      type: 'boolean',
      defaultsTo: false,
      columnName: 'is_email_verified'
    },
    username: {
      type: 'string',
      isNotEmptyString: true,
      minLength: 3,
      maxLength: 16,
      regex: /^[a-zA-Z0-9]+((_|\.)?[a-zA-Z0-9])*$/,
      allowNull: true,
    },
    registrationType: {
      type: 'string',
      defaultsTo: 'standard',
      columnName: 'registration_type'
    },
    phone: {
      type: 'string',
      isNotEmptyString: true,
      allowNull: true,
    },
    deletedAt: {
      type: 'ref',
      columnName: 'deleted_at',
    },
    passwordChangedAt: {
      type: 'ref',
      columnName: 'password_changed_at',
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    organizationId: {
      model: 'Organization',
      required: true,
      columnName: 'organization_id',
    }
  },

  tableName: 'user_account',

  customToJSON() {
    return {
      ..._.omit(this, ['password', 'avatar', 'passwordChangedAt']),
      avatarUrl:
        this.avatar &&
        `${sails.config.custom.userAvatarsUrl}/${this.avatar.dirname}/square-100.${this.avatar.extension}`,
    };
  },
};
