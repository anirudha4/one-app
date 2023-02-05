module.exports = {
  inputs: {
    token: {
      type: 'string',
      required: true
    }
  },
  exits: {
    unauthorized: {
      response: 'unauthorized'
    }
  },
  fn: async function (inputs) {
    const { token } = inputs;
    const { subject: userId } = sails.helpers.utils.verifyToken(token);

    const user = await sails.helpers.users.getOne(userId);
    if (!user) {
      return exits.unauthorized();
    }

    const registerToken = await sails.helpers.tokens.getRegisterToken(userId);

    if (!registerToken.tokenUsed) {
      await sails.helpers.tokens.updateRegisterToken({ tokenUsed: true }, userId);
      await sails.helpers.users.update({ isEmailVerified: true }, userId, this.req);
      return this.res.redirect(`${process.env.CLIENT_BASE_URL}?verified=true`);
    }
    return this.res.redirect(`${process.env.CLIENT_BASE_URL}?existing_user=true`);
  }
};
