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
app.post('/games', (req, res) => {
  let { player1_name, player2_name, winner } = req.body;
  game.create({ player1_name, player2_name, winner })
    .then(({ id }) => res.send({ gameId: id }))
    .catch(err => res.sendStatus(500))
})

app.listen(port, () => console.log(`Connect 4 listening on port ${port}!`))