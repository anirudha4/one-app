const zxcvbn = require('zxcvbn');

const Errors = {
  EMAIL_ALREADY_IN_USE: {
    emailAlreadyInUse: {
      code: '9001',
      message: 'Email already in use'
    },
  },
  USERNAME_ALREADY_IN_USE: {
    usernameAlreadyInUse: {
      code: '9002',
      message: 'Username already in use'
    },
  },
  ORGANIZATION_NAME_ALREADY_IN_USE: {
    organizationNameAlreadyInUse: {
      code: '9003',
      message: 'Organization Name already in use'
    },
  },
};

// const passwordValidator = (value) => zxcvbn(value).score >= 2; // TODO: move to config

module.exports = {
  inputs: {
    email: {
      type: 'string',
      isEmail: true,
      required: true,
    },
    password: {
      type: 'string',
      // custom: passwordValidator,
      required: true,
    },
    name: {
      type: 'string',
      required: true,
    },
    username: {
      type: 'string',
      isNotEmptyString: true,
      minLength: 3,
      maxLength: 16,
      regex: /^[a-zA-Z0-9]+((_|\.)?[a-zA-Z0-9])*$/,
      allowNull: true,
    },
    phone: {
      type: 'string',
      isNotEmptyString: true,
      allowNull: true,
    },
    language: {
      type: 'string',
      isNotEmptyString: true,
      allowNull: true,
    },
    organizationName: {
      type: 'string',
      required: true
    }
  },

  exits: {
    emailAlreadyInUse: {
      responseType: 'conflict',
    },
    usernameAlreadyInUse: {
      responseType: 'conflict',
    },
    organizationNameAlreadyInUse: {
      responseType: 'conflict'
    }
  },

  async fn(inputs) {
    const values = _.pick(inputs, [
      'email',
      'password',
      'name',
      'username',
      'phone',
      'organizationName'
    ]);

    const { user, organization } = await sails.helpers.users.createOne
      .with({
        values,
        request: this.req,
      })
      .intercept('emailAlreadyInUse', () => Errors.EMAIL_ALREADY_IN_USE)
      .intercept('usernameAlreadyInUse', () => Errors.USERNAME_ALREADY_IN_USE)
      .intercept('organizationNameAlreadyInUse', () => Errors.ORGANIZATION_NAME_ALREADY_IN_USE);

    const { token } = await sails.helpers.tokens.createRegisterToken(user.id);
    sails.helpers.emails.sendWelcomeEmail(user, organization, token).then(() => { }).catch(() => { })
    return {
      item: user,
    };
  },
};
