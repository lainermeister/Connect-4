import React from 'react'
import axios from "axios"

const GameHistory = ({ gameHistory }) => (
  <>
    <h3>Recent Games</h3>
    {gameHistory.map(({ id, player1_name, player2_name, winner, createdAt }) => {
      let date = (new Date(createdAt)).toLocaleDateString("en-US", { dateStyle: "short" });
      const messages = {
        "1": <div key={id}>{date} {player1_name} demolished {player2_name}!</div>,
        "2": <div key={id}>{date} {player2_name} schooled {player1_name}!</div >,
        "-1": <div key={id}>{date} {player2_name} and {player1_name} played a boring game where no one won.. </div >
      }
      return messages[winner]

    })}
  </>

)

export default GameHistory