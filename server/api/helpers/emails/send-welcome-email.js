module.exports = {
  inputs: {
    user: {
      type: 'json',
      required: true
    },
    organization: {
      type: 'json',
      required: true
    },
    token: {
      type: 'string',
      required: true
    }
  },
  exits: {
  },
  fn: async function (inputs) {
    const { user, organization, token } = inputs
    const confirmLink = await sails.helpers.utils.createEmailVerificationLink(token);
    const templateData = {
      name: user.name,
      email: user.email,
      organization,
      confirmLink
    }
    console.log({ name: user.name,
      email: user.email,
      organization,
      confirmLink });
    // get rendered template
    const template = await sails.helpers.utils.getEmailTemplate('welcome', templateData);

    await sails.hooks.email.sendMail('anirudhag13@gmail.com', user.email, 'Please verify your account', template);
    return {
      template
    }
  }
};

