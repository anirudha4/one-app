const { COLORS } = require("../../../utils/constants");

module.exports = {
  exits: {
    success: {
    },
  },
  fn: async function () {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
  }
};

