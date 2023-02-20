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
    const friends = await Friend.find(criteria);
    return friends;
  }
};

