import React from "react";
import DisplayRatingStars from "./DisplayRatingStars";
import GameDetails from "./GameDetails";
import AppBtn from "./AppBtn";

function GameItem(props) {
  const { game, rate, setEditing } = props;

  // console.log(game.isEditing);

  function displayRating(ratingNumber) {
    const maxRateNumber = 5;
    const number = Number(ratingNumber);

    const rateNumber = Array(number).fill(true);
    const rateDifference = Array(maxRateNumber - number).fill(false);

    const sum = [...rateNumber, ...rateDifference];

    return sum;
  }

  return (
    <article className="game-item">
      <div className="title-rating-cont">
        <h3 className="game-name"> {game.name} </h3>
        <DisplayRatingStars
          displayRating={displayRating}
          rating={game.rating}
          handleClick={rate}
          id={game.id}
        />
      </div>
      <p className="game-description"> {game.description} </p>

      <GameDetails
        players={game.players}
        genre={game.genre}
        playTime={game.playTime}
        complexity={game.complexity}
      />

      <div className="link-and-edit">
        <AppBtn variation="link-btn" href={game.link}>
          Learn More
        </AppBtn>
        <AppBtn variation="edit-btn" handleClick={() => setEditing(game)}>
          Edit
        </AppBtn>
      </div>
    </article>
  );
}

export default GameItem;
