import React from 'react';

const Cell = ({ c, r, player, moveHandler, hoverHandler }) => (
  <td className={`player${player}`} onClick={() => moveHandler(c)} onMouseOver={() => hoverHandler(c)}></td>
)
export default Cell