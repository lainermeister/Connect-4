const express = require('express')
const { game } = require('../db/')
const app = express()
const port = process.env.PORT || 3000
app.use(express.static('client/dist/'))
app.use(require('body-parser').json())
app.get('/', (req, res) => res.render('index'))


app.get('/games', (req, res) => {
  game.findAll(
    {
      limit: 5,
      order: [['createdAt', 'DESC']]
    }
  )
    .then(games => res.send(games))
    .catch(err => res.send(err))
})
app.get('/leaderboard', (req, res) => {
  game.findAll()
    .then(games => {
      const scores = {};
      games.forEach((game) => {
        if (game.winner === 1) {
          if (scores[game.player1_name]) {
            scores[game.player1_name]++;
          } else {
            scores[game.player1_name] = 1;
          }
        } else {
          if (scores[game.player2_name]) {
            scores[game.player2_name]++;
          } else {
            scores[game.player2_name] = 1;
          }
        }
      })
      let ranking = [];
      Object.keys(scores).forEach((score) => {
        ranking.push({
          name: score,
          numWins: scores[score]
        })
      })
      ranking.sort((a, b) => b.numWins - a.numWins)
      res.send(ranking)
    })
    .catch(err => res.send(err))
})
app.post('/games', (req, res) => {
  const { player1_name, player2_name, winner } = req.body;
  game.create({ player1_name, player2_name, winner })
    .then(({ id }) => res.send({ gameId: id }))
    .catch(err => res.sendStatus(500))
})
app.get('/teapot', (rep, res) => {
  res.sendStatus(418)
})

app.listen(port, () => console.log(`Connect 4 listening on port ${port}!`))