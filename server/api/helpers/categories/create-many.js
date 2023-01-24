module.exports = {
  inputs: {
    categories: {
      type: 'json'
    },
    userId: {
      type: 'string'
    },
    organizationId: {
      type: 'string'
    },
  },
  exits: {
    success: {
    },
  },
  fn: async function (inputs) {
    const { categories, userId, organizationId } = inputs;
    const categoryValues = categories.map(category => ({ ...category, createdBy: userId, organizationId }));
    console.log({ categoryValues });

    return await Category.createEach(categoryValues).fetch();
  }
};

