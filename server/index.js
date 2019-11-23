const express = require('express')
const Sequelize = require('sequelize');
const { game, player, playerGame } = require('../db/')
const app = express()
const port = process.env.PORT || 3000
app.use(express.static('client/dist/'))
app.use(require('body-parser').json())
app.get('/', (req, res) => res.render('index'))


app.get('/games', (req, res) => {
  game.findAll({ include: [{ model: player, required: true, right: true }],
  order: [['createdAt', 'DESC']] })
    .then(games => games.map(({ dataValues: game }) => {
      let winner;
      if (!game.winnerId) {
        winner = -1;
      } else {
        winner = game.winnerId === game.players[0].dataValues.id ? 1 : 2;
      }
      return {
        id: game.id,
        player1_name: game.players[0].dataValues.name,
        player2_name: game.players[1].dataValues.name,
        winner: winner,
        createdAt: new Date(game.createdAt).toLocaleDateString()
      }
    }))
    .then((data) => res.send(data))
    .catch(err => console.log(err))
})
app.get('/leaderboard', (req, res) => {
  player.findAll({
    include: [{ model: game, required: true, right: true }]
  })
    .then((players) => players.map((player) => ({
      name: player.name,
      wins: (player.games).reduce((total, game) => {
        if (game.winnerId === player.id) {
          return total + 1;
        }
        return total;
      }, 0)
    })))
    .then((data) => res.send(data))
    .catch(err => res.send(err))
})
app.post('/games', (req, res) => {
  const { player1_name, player2_name, winner } = req.body;
  let player1Id, player2Id;

  Promise.all([
    player.findOrCreate({ where: { name: player1_name } }),
    player.findOrCreate({ where: { name: player2_name } })
  ])
    .then(([player1, player2]) => {
      player1Id = player1[0].id;
      player2Id = player2[0].id;
      const winnerId = winner === 1 ? player1Id :
        winner === 2 ? player2Id : null;
      return game.create({ winnerId })
    })
    .then((game) => {
      return Promise.all([
        playerGame.create({ gameId: game.id, playerId: player1Id }),
        playerGame.create({ gameId: game.id, playerId: player2Id })])

    })
    .then((response) => res.send(response))
    .catch(err => res.send(err))
})
app.get('/teapot', (rep, res) => {
  res.sendStatus(418)
})

app.listen(port, () => console.log(`Connect 4 listening on port ${port}!`))