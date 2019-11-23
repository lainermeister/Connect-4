import React from 'react'
import axios from "axios"

const Scoreboard = ({ gameHistory, leaderboard }) => (
  <table>
    <tr>
      <th><div className="recent">Recent Games</div></th>
      <th><div className="leaderboard">Leaderboard</div>
        </th>
    </tr>
    <tr>
      <td>
        {gameHistory.map(({ id, player1_name, player2_name, winner, createdAt }) => {
          let date = (new Date(createdAt)).toLocaleDateString("en-US", { dateStyle: "short" });
          const messages = {
            "1": <div key={id}>{date} {player1_name} demolished {player2_name}!</div>,
            "2": <div key={id}>{date} {player2_name} schooled {player1_name}!</div >,
            "-1": <div key={id}>{date} {player2_name} and {player1_name} played a boring game where no one won.. </div >
          }
          return messages[winner]

        })}

      </td>
      <td>
        {leaderboard.map(({ name, wins }) => {
          return <div key={name}>{name} {wins}</div>

        })}

      </td>
    </tr>
  </table>
)
export default Scoreboard