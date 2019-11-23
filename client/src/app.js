import React from "react";
import Board from "./components/Board.js"
import Scoreboard from "./components/Scoreboard"
import PlayerNamesPrompt from "./components/PlayerNamesPrompt"
import axios from 'axios'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inPlay: true,
      currentPlayer: 2,
      headerMessage: <h1 className="p1">Player 2's Turn</h1>,
      names: {
        1: null,
        2: null
      },
      gameHistory: [],
      leaderboard: []
    };

    this.changePlayer = this.changePlayer.bind(this);
    this.handleWin = this.handleWin.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleNameInput = this.handleNameInput.bind(this);
  }
  componentDidMount() {
    this.refreshScoreboard()
  }
  refreshScoreboard() {
    return axios.get('/games')
      .then(({ data }) => {
        this.setState({ gameHistory: data })
        return axios.get('/leaderboard')
      })
      .then(({ data }) => {
        this.setState({ leaderboard: data })
      })
      .catch((err) => console.log(err))
  }

  handleNameInput({ player1, player2 }) {
    this.setState({
      names: {
        1: player1,
        2: player2
      }
    }, () => this.changePlayer())
  }

  changePlayer() {
    const playerMap = {
      1: 2,
      2: 1
    }
    const nextPlayer = playerMap[this.state.currentPlayer];
    this.setState({
      currentPlayer: nextPlayer,
      headerMessage: <h1 className={`p${nextPlayer}`}>{this.state.names[nextPlayer]}'s Turn</h1>
    })
  }

  handleWin(winner) {
    const messages = {
      "-1": "It was a tie.",
      "1": <>{this.state.names[1]} Wins!</>,
      "2": <>{this.state.names[2]} Wins!</>
    }
    this.setState({
      inPlay: false,
      headerMessage:
        <div>
          <h1 className={`p${winner}`}>Game Over...{messages[winner]}</h1>
        </div>
    })
    axios.post("/games", {
      player1_name: this.state.names[1],
      player2_name: this.state.names[2],
      winner: winner
    })
      .then(() => this.refreshScoreboard())
      .then((res) => console.log(res))
      .catch((err) => console.error(err))
  }

  handleReset() {
    this.setState({
      inPlay: true,
      currentPlayer: 2,
      headerMessage: <h1 className="p2">{this.state.names[2]}'s Turn</h1>
    })
  }

  render() {
    if (!this.state.names[1] || !this.state.names[2]) {
      return <div>
        <PlayerNamesPrompt
          handleSubmit={this.handleNameInput} />
        <Scoreboard gameHistory={this.state.gameHistory}
          leaderboard={this.state.leaderboard} />
      </div>
    } else {
      return <div>
        {this.state.headerMessage}
        <Board inPlay={this.state.inPlay}
          currentPlayer={this.state.currentPlayer}
          changePlayer={this.changePlayer}
          handleWin={this.handleWin}
          handleReset={this.handleReset} />
        <Scoreboard gameHistory={this.state.gameHistory}
          leaderboard={this.state.leaderboard} />
      </div>
    }

  }
}

export default App;
