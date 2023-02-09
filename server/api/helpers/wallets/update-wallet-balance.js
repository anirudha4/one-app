module.exports = {
  inputs: {
    transaction: {
      type: 'json',
      required: true
    },
    wallet: {
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
    const { transaction, wallet, request } = inputs;

    const revisedWalletBalance = await sails.helpers.utils.reviseWalletBalance(wallet.amount, transaction.amount, transaction.type);

    return await sails.helpers.wallets.updateWallet(wallet.id, { amount: revisedWalletBalance }, request);
  }
};

