import React from "react";

function GameDetails(props) {
  const { players, gameType, timeSpan, level } = props;

  return (
    <div className="game-details">
      <p className="game-detail">
        <ion-icon name="people-outline"></ion-icon> {players}
      </p>
      <p className="game-detail">
        <img className="social-game-icon" src={"./social-game.png"} />{" "}
        {gameType}
      </p>
      <p className="game-detail">
        <ion-icon name="time-outline"></ion-icon> {timeSpan}
      </p>
      <p className="game-detail">
        <ion-icon name="stats-chart-outline"></ion-icon>
        {level}
      </p>
    </div>
  );
}

export default GameDetails;
