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
    const tags = await Tag.find(criteria);
    return tags;
  }
};

