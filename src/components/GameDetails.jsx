import React from "react";

function GameDetails(props) {
  const { players, genre, playTime, complexity } = props;

  return (
    <div className="game-details">
      <p className="game-detail">
        <img src="./images/People_icon.svg.png" className="icon-png" />
        {players}
      </p>
      <p className="game-detail">
        <img src="./images/board-game-icon.png" className="icon-png" />
        {genre}
      </p>
      <p className="game-detail">
        <img src="./images/clock-icn.png" className="icon-png" />
        {playTime}
      </p>
      <p className="game-detail">
        <img src="./images/chart-game-icon.png" className="icon-png" />

        {complexity}
      </p>
    </div>
  );
}

export default GameDetails;
