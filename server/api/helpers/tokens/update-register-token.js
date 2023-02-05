module.exports = {
  inputs: {
    values: {
      type: 'json',
      required: true
    },
    userId: {
      type: 'string',
      required: true
    },
  },
  exits: {
    success: {
    },
  },
  fn: async function (inputs) {
    const { values, userId } = inputs;

    const registerToken = await RegisterToken.updateOne({ userId }).set(values);

    return registerToken;
  }
};

