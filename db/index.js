const Sequelize = require('sequelize');
const sequelize = process.env.HEROKU_POSTGRESQL_PURPLE_URL ?
  new Sequelize(process.env.HEROKU_POSTGRESQL_PURPLE_URL) :
  new Sequelize('connect4', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  });

module.exports.game = sequelize.define('game', {
  player1_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  player2_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  winner: {
    type: Sequelize.INTEGER,
    allowNull: false
  }

}, {
  // options
});
// sequelize.sync();
// sequelize.authenticate()
//   .then(() => {
//     sequelize.sync()
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });