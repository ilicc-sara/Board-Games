import React from "react";

function GameDetails(props) {
  const { players, genre, playTime, complexity } = props;

  return (
    <div className="game-details">
      <p className="game-detail">
        <ion-icon name="people-outline"></ion-icon> {players}
      </p>
      <p className="game-detail">
        <img className="social-game-icon" src={"./social-game.png"} /> {genre}
      </p>
      <p className="game-detail">
        <ion-icon name="time-outline"></ion-icon> {playTime}
      </p>
      <p className="game-detail">
        <ion-icon name="stats-chart-outline"></ion-icon>
        {complexity}
      </p>
    </div>
  );
}

export default GameDetails;
