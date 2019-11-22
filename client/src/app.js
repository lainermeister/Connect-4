import React from "react";
import Board from "./components/Board.js"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inPlay: true,
      currentPlayer: 1,
      headerMessage: <h1 className="p1">Player 1's Turn</h1>
    };
    this.nextPlayer = {
      1: 2,
      2: 1
    }
    this.changePlayer = this.changePlayer.bind(this);
    this.handleWin = this.handleWin.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  changePlayer() {
    const nextPlayer = this.nextPlayer[this.state.currentPlayer];
    this.setState({
      currentPlayer: nextPlayer,
      headerMessage: <h1 className={`p${nextPlayer}`}>Player {nextPlayer}'s Turn</h1>
    })
  }

  handleWin(winner) {
    const messages = {
      "-1": "It was a tie.",
      "1": "Player 1 Wins!",
      "2": "Player 2 Wins!"
    }
    this.setState({
      inPlay: false,
      headerMessage:
        <div>
          <h1 className={`p${winner}`}>
            Game Over...{messages[winner]}
          </h1>
        </div>
    })
  }

  handleReset() {
    this.setState({
      inPlay: true,
      currentPlayer: 1,
      headerMessage: <h1>Player 1's Turn</h1>
    })
  }

  render() {
    return <div>
      {this.state.headerMessage}
      <Board inPlay={this.state.inPlay}
        currentPlayer={this.state.currentPlayer}
        changePlayer={this.changePlayer}
        handleWin={this.handleWin}
        handleReset={this.handleReset} />
    </div>
  }
}

export default App;
