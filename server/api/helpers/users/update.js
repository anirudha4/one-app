module.exports = {
  inputs: {
    values: {
      type: 'json',
      required: true
    },
    userId: {
      type: 'json',
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
    const { values, userId, request } = inputs;

    const user = await User.updateOne({ id: userId }).set(values);

    sails.sockets.broadcast(
      `@user:${user.id}`,
      'userUpdate',
      {
        item: user,
      },
      request,
    );

    return user;
  }
};

