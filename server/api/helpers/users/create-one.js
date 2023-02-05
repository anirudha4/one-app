const bcrypt = require('bcrypt');

const valuesValidator = (value) => {
  if (!_.isPlainObject(value)) {
    return false;
  }

  if (!_.isString(value.email)) {
    return false;
  }

  if (!_.isString(value.password)) {
    return false;
  }
  if (!_.isString(value.organizationName)) {
    return false;
  }

  if (!_.isNil(value.username) && !_.isString(value.username)) {
    return false;
  }

  return true;
};

module.exports = {
  inputs: {
    values: {
      type: 'json',
      custom: valuesValidator,
      required: true,
    },
    request: {
      type: 'ref',
    },
  },

  exits: {
    emailAlreadyInUse: {},
    usernameAlreadyInUse: {},
    organizationNameAlreadyInUse: {},
  },

  async fn(inputs, exits) {
    const { values } = inputs;

    // check if user with same email exists
    const userExists = await User.find({ email: values.email });
    if (userExists.length > 0) return exits.emailAlreadyInUse();

    // create organization
    const organizationName = values.organizationName;
    const organization = await Organization.create({
      name: organizationName
    })
      .intercept({
        message:
          'Unexpected error from database adapter: conflicting key value violates exclusion constraint "organization_name_unique"',
      }, 'organizationNameAlreadyInUse')
      .fetch();

    if (values.username) {
      values.username = values.username.toLowerCase();
    }

    const user = await User.create({
      ...values,
      email: values.email.toLowerCase(),
      password: bcrypt.hashSync(values.password, 10),
      organizationId: organization.id
    })
      .intercept(
        {
          message:
            'Unexpected error from database adapter: conflicting key value violates exclusion constraint "user_email_unique"',
        },
        'emailAlreadyInUse',
      )
      .intercept(
        {
          message:
            'Unexpected error from database adapter: conflicting key value violates exclusion constraint "user_username_unique"',
        },
        'usernameAlreadyInUse',
      ).fetch();

    await sails.helpers.organizations.createDefaultDataForOrganization(user.id, user.organizationId);
    return exits.success({
      user,
      organization
    });
  },
};
