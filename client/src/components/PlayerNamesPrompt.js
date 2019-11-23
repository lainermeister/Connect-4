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
    return <fieldset>
      <h1> Welcome to Connect 4</h1>
      <h4>
        Please enter your names.
      </h4>
      <form>
        <fieldset>
          Player 1:&nbsp;
          <input type="text" id="player1"
            onChange={this.handleChange}
            value={this.state.player1} />
        </fieldset>
        <fieldset>
          Player 2:&nbsp;
          <input type="text" id="player2"
            onChange={this.handleChange}
            value={this.state.player2} />

        </fieldset>
        <input type="submit" onClick={() => this.props.handleSubmit(this.state)} />
      </form>
    </fieldset>


  }
}

export default PlayerNamesPrompt