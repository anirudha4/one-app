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

    return { categories };
  }
};

