import { useState } from "react";
import DisplayRatingStars from "./DisplayRatingStars";
import GameDetails from "./GameDetails";
import AppBtn from "./AppBtn";
import Form from "./Form";

function GameItem(props) {
  const { game, information, setInformation } = props;
  const [showEditForm, setShowEditForm] = useState(false);

  function displayRating(ratingNumber) {
    const maxRateNumber = 5;
    const number = Number(ratingNumber);

    const rateNumber = Array(number).fill(true);
    const rateDifference = Array(maxRateNumber - number).fill(false);

    const sum = [...rateNumber, ...rateDifference];

    return sum;
  }

  function rate(id, index) {
    setInformation((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, rating: index + 1 };
        } else {
          return item;
        }
      })
    );
  }

  return (
    <article className="game-item">
      {showEditForm && (
        <div className="overlay" onClick={() => setShowEditForm(false)}>
          <Form
            variation="edit"
            game={game}
            id={game.id}
            information={information}
            setInformation={setInformation}
            setShowEditForm={setShowEditForm}
          />
        </div>
      )}
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
        <AppBtn
          variation="edit-btn"
          handleClick={() => {
            setShowEditForm(true);
          }}
        >
          Edit
        </AppBtn>
      </div>
    </article>
  );
}

export default GameItem;
