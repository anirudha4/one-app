module.exports = {
  inputs: {
    token: {
      type: 'string',
      required: true
    }
  },
  exits: {
    success: {
      description: 'All done.',
    },
  },
  fn: async function (inputs) {
    const { token } = inputs;

    const link = `${process.env.VERIFY_TOKEN_URL}?token=${token}`
    return link;
  }
};

