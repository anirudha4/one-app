module.exports = {
  inputs: {
    userId: {
      type: 'string',
      required: true
    }
  },
  exits: {
    success: {
    },
  },
  fn: async function (inputs) {
    const { userId } = inputs;
    const token = await sails.helpers.utils.createToken(userId);
    const registerToken = await RegisterToken.create({
      token,
      userId
    }).fetch();

    return registerToken;
  }
};

