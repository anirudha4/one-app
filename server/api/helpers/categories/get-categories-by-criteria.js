module.exports = {
  inputs: {
    criteria: {
      type: 'json',
      required: true
    }
  },
  exits: {

  },
  fn: async function (inputs) {
    const { criteria } = inputs;
    const categories = await Category.find(criteria);
    return categories;
  }
};

