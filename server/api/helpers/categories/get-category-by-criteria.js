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
    const category = await Category.findOne(criteria);
    return category;
  }
};

