import React from "react";
import Cell from "./Cell"

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.numCols = 7;
    this.numRows = 6;
    this.state = {
      board:
        [...Array(this.numCols)].map(() => Array(this.numRows).fill(0)),
      hoverCol: null,
      errorMessage: null
    }
    this.moveHandler = this.moveHandler.bind(this)
    this.toggleHoverCol = this.toggleHoverCol.bind(this)
  }

  reset() {
    this.setState({
      board:
        [...Array(this.numCols)].map(() => Array(this.numRows).fill(0)),
      hoverCol: null,
      errorMessage: null
    })
    this.props.handleReset()
  }

  render() {
    let rows = [];
    for (let r = 0; r < this.numRows; r++) {
      rows.push(this._renderRow(r));
    }
    return <div>
      <table className="board">{rows}</table>
      <p>{this.state.errorMessage}</p>
      {!this.props.inPlay ? <button type="reset" onClick={() => this.reset()}>Reset</button> : <></>}
    </div>
  }

  _renderRow(r) {
    let cells = [];
    for (let c = 0; c < this.numCols; c++) {
      let player = this.state.board[c][r];
      if (this.props.inPlay && player === 0 && this.state.hoverCol === c) {
        player = "H" + this.props.currentPlayer
      }
      cells.push(<Cell c={c} r={r} key={`${c}_${r}`} player={player}
        moveHandler={this.moveHandler}
        hoverHandler={this.toggleHoverCol} />);
    }
    return <tr key={r}>{cells}</tr>
  }
  toggleHoverCol(c) {
    this.setState({ hoverCol: c })
  }

  moveHandler(c) {
    if (this.props.inPlay) {
      if (this.addPiece(c, this.props.currentPlayer)) {
        const winner = this.findWinner();
        if (winner === 0) {
          this.props.changePlayer();
          this.setState({ errorMessage: null })
        } else {
          this.props.handleWin(winner)
        }

      } else {
        this.setState({ errorMessage: "That was not a valid move!" })
      }
    }

  }

  addPiece(col, playerNum) {
    let row = this.numRows - 1;
    while (this.state.board[col][row] !== 0 && row > -1) {
      row--;
    }
    if (row >= 0) {
      this.state.board[col][row] = playerNum;
      this.setState({ board: [...this.state.board] });
      return true;
    } else {
      return false;
    }
  }

  findWinner() {
    let check = this._checkAllRows();
    if (check !== 0) {
      return check
    }
    check = this._checkAllCols();
    if (check !== 0) {
      return check;
    }
    check = this._checkAllMajorDiags();
    if (check !== 0) {
      return check;
    }
    check = this._checkAllMinorDiags();
    if (check !== 0) {
      return check;
    }
    return 0;
  }
  _checkRow(r) {
    let streakingPlayer = 0;
    let numInRow = 0;
    let blanksFound = false;
    for (let c = 0; c < this.numCols; c++) {
      if (this.state.board[c][r] === 0) {
        blanksFound = true;
      }
      if (this.state.board[c][r] === streakingPlayer) {
        numInRow++;
        if (streakingPlayer !== 0 && numInRow === 4) {
          console.log(`Win found: Row ${r} Player ${streakingPlayer}`)
          return streakingPlayer;
        }
      } else {
        streakingPlayer = this.state.board[c][r];
        numInRow = 1;
      }
    }
    if (blanksFound) {
      return 0;
    }
    console.log("no piece on row" + r)
    return -1;
  }

  _checkAllRows() {
    let blanksFound = false;
    for (let r = 0; r < this.numRows; r++) {
      let rowCheck = this._checkRow(r);
      if (rowCheck > 0) {
        return rowCheck;
      } if (rowCheck !== -1) {
        blanksFound = true;
      }
    }
    if (blanksFound) {
      return 0;
    }
    return -1;
  }

  _checkCol(c) {
    let streakingPlayer = 0;
    let numInRow = 0;
    for (let r = 0; r < this.numRows; r++) {
      if (this.state.board[c][r] === streakingPlayer) {
        numInRow++;
        if (streakingPlayer !== 0 && numInRow === 4) {
          console.log(`Win found: Col ${c} Player ${streakingPlayer}`)
          return streakingPlayer;
        }
      } else {
        streakingPlayer = this.state.board[c][r];
        numInRow = 1;
      }
    }
    return 0;
  }

  _checkAllCols() {
    for (let c = 0; c < this.numCols; c++) {
      let colCheck = this._checkCol(c)
      if (colCheck !== 0) {
        return colCheck;
      }
    }
    return 0;
  }
  // [1, 2, 1, 2, 1, 2],
  // [0, 0, 0, 0, 2, 1],
  // [0, 0, 1, 2, 1, 2],
  // [0, 0, 0, 1, 1, 2],
  // [0, 0, 0, 0, 1, 2],
  // [0, 0, 0, 0, 0, 0],
  // [0, 0, 0, 0, 1, 2]
  _checkMajorDiag(c) {
    let streakingPlayer = 0;
    let numInRow = 0;
    for (let r = 0; r < this.numRows; r++) {
      if (c >= 0 && c < this.numCols) {
        if (this.state.board[c][r] === streakingPlayer) {
          numInRow++;
          if (streakingPlayer !== 0 && numInRow === 4) {
            console.log(`Win found: Major Diag Player ${streakingPlayer}`)
            console.log(JSON.stringify(this.state.board))
            return streakingPlayer;
          }
        } else {
          streakingPlayer = this.state.board[c][r];
          numInRow = 1;
        }


      }
      c++;
    }
    return 0;
  }
  _checkAllMajorDiags() {
    for (let c = -2; c < this.numCols; c++) {
      let colCheck = this._checkMajorDiag(c)
      if (colCheck !== 0) {
        return colCheck;
      }
    }
    return 0;
  }

  _checkMinorDiag(c) {
    let streakingPlayer = 0;
    let numInRow = 0;
    for (let r = 0; r < this.numRows; r++) {
      if (c >= 0) {
        if (this.state.board[c][r] === streakingPlayer) {
          numInRow++;
          if (streakingPlayer !== 0 && numInRow === 4) {
            console.log(`Win found: Minor Diag Player ${streakingPlayer}`)
            return streakingPlayer;
          }
        } else {
          streakingPlayer = this.state.board[c][r];
          numInRow = 1;
        }
      }
      c--;
    }
    return 0;
  }
  _checkAllMinorDiags() {
    for (let c = 0; c < this.numCols; c++) {
      let colCheck = this._checkMinorDiag(c)
      if (colCheck !== 0) {
        return colCheck;
      }
    }
    return 0;
  }


}

export default Board;