import React from 'react'

class PlayerNamesPrompt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player1: "",
      player2: ""
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange({ target }) {
    this.setState({ [target.id]: target.value })
  }

  render() {
    return <div>
      <h1> Welcome to Connect 4</h1>
      <h4>
        Please enter your names.
      </h4>
      <div className="container">
        <div>
          Player 1:
          <input type="text" id="player1"
            onChange={this.handleChange}
            value={this.state.player1} />
        </div>
        <div>
          Player 2:
          <input type="text" id="player2"
            onChange={this.handleChange}
            value={this.state.player2} />
        </div>
      </div>
      <input type="button" value="Submit" onClick={() => this.props.handleSubmit(this.state)} />
    </div>
  }
}

export default PlayerNamesPrompt