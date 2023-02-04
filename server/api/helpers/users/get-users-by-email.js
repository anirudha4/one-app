module.exports = {
  inputs: {
    criteria: {
      type: 'json',
      required: true,
    },
    withDeleted: {
      type: 'boolean',
      defaultsTo: false,
    },
  },

  async fn(inputs) {
    const { criteria } = inputs;
    return await User.find(criteria);
  },
};
