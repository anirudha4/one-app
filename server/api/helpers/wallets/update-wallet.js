module.exports = {
  inputs: {
    walletId: {
      type: 'string',
      required: true
    },
    values: {
      type: 'json',
      required: true
    },
    request: {
      type: 'ref'
    }
  },
  exits: {

  },
  fn: async function (inputs) {
    const { walletId, values } = inputs;
    const wallet = await Wallet.updateOne(walletId).set(values);
    return wallet;
  }
};

