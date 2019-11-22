import React from 'react'
import axios from "axios"

const GameHistory = ({ gameHistory }) => (
  <>
    <h3>Recent Games</h3>
    {gameHistory.map(({ id, player1_name, player2_name, winner, createdAt }) => {

      const messages = {
        "1": <div>{createdAt} {player1_name} defeated {player2_name}!</div>,
        "2": <div>{createdAt} {player2_name} defeated {player1_name}!</div >,
        "-1": <div>{createdAt} {player2_name} and {player1_name} drew.</div >
      }
      return messages[winner]

    })}
  </>

)

export default GameHistory