const bcrypt = require('bcrypt');

exports.seed = (knex) => {
  const date = new Date().toUTCString();

  return knex('user_account').insert({
    email: 'anirudha@gmail.com',
    password: bcrypt.hashSync('anirudha', 10),
    isAdmin: true,
    name: 'Anirudha',
    username: 'anirudha',
    createdAt: date,
    updatedAt: date,
  });
};
