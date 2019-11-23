const Sequelize = require('sequelize');
const sequelize = process.env.HEROKU_POSTGRESQL_PURPLE_URL ?
  new Sequelize(process.env.HEROKU_POSTGRESQL_PURPLE_URL) :
  new Sequelize('connect4', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  });

const game = sequelize.define('game', {
  winnerId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

const player = sequelize.define('player', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
})
const playerGame = sequelize.define('player_game')
player.belongsToMany(game, {
  through: playerGame,
  foreignKey: 'playerId',
  otherKey: 'gameId'
});
game.belongsToMany(player, {
  through: playerGame,
  foreignKey: 'gameId',
  otherKey: 'playerId'
});
// drop database connect4; create database connect4; use connect4;
// sequelize.sync()
module.exports.player = player;
module.exports.game = game;
module.exports.playerGame = playerGame;