module.exports = {
    async fn() {
      const user = {
        name: 'Anirudha Gandhare',
        email: 'anirudhag1999@gmail.com'
      }
      const organization = {
        name: 'Jokerbox'
      }
      await sails.helpers.emails.sendWelcomeEmail(user, organization, '__TOKEN__');
      return {
        working: true
      };
    },
  };
  