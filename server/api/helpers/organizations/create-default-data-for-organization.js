const { defaultCategories } = require("../../../utils/constants");

module.exports = {
  inputs: {
    userId: {
      type: 'string',
      required: true
    },
    organizationId: {
      type: 'string',
      required: true
    },
  },
  exits: {
  },
  fn: async function (inputs) {
    const { userId, organizationId } = inputs;

    // categories
    const categories = await sails.helpers.categories.createMany(defaultCategories, userId, organizationId);

    // wallet
    const { wallet } = await sails.helpers.wallets.createWallet('Debit Card', -1, organizationId);

    return { categories, wallet };
  }
};

