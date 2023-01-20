module.exports = {
  async fn() {
    const { accessToken } = this.req;
    return {
      item: accessToken,
    };
  },
};
