module.exports = {
  inputs: {
    criteria: {
      type: 'json',
      required: true
    }
  },
  exits: {
    success: {
    },
  },
  fn: async function (inputs) {
    const { criteria } = inputs;
    const wallets = await Wallet.find(criteria);
    return wallets;
  }


};

