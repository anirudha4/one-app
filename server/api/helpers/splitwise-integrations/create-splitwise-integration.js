module.exports = {
  inputs: {
    values: {
      type: 'json',
      required: true
    },
    organizationId: {
      type: 'string',
      required: true
    },
    userId: {
      type: 'string',
      required: true
    },
    request: {
      type: 'ref'
    }
  },
  exits: {
    success: {
    },
  },
  fn: async function (inputs) {
    const { values, userId, organizationId } = inputs;

    const splitwiseIntegration = await SplitwiseIntegration.create({
      ...values,
      userId,
      organizationId
    }).fetch();

    /**
     * @todo
     * emit socket event
     */

    return splitwiseIntegration;
  }
};

