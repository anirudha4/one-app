module.exports = {
    inputs: {
        userId: {
            type: 'string'
        }
    },
    exits: {
    },
    fn: async function (inputs) {
        const { userId } = inputs;

        const registerToken = await RegisterToken.findOne({ userId });
        return registerToken;
    }
}