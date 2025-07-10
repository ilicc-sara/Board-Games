import { useState } from "react";
import DisplayRatingStars from "./DisplayRatingStars";
import GameDetails from "./GameDetails";
import AppBtn from "./AppBtn";
// import Form from "./Form";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

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

  const form = useForm({ defaultValues: { ...game } });
  const { register, control, handleSubmit, reset } = form;
  const { name, ref, onChange, onBlur } = register("name");

  const onSubmit = (data) => {
    console.log("Form submitted", data);
    console.log(data);

    // setInformation((prev) => [...prev, data]);
    // console.log("information", information);

    setInformation((prev) =>
      prev.map((item) => {
        if (item.id === game.id) {
          return { ...data };
        } else return item;
      })
    );

    setShowEditForm(false);
    reset();
  };

  return (
    <article className="game-item">
      {showEditForm && (
        <div className="overlay" onClick={() => setShowEditForm(false)}>
          {/* <Form
            variation="edit"
            game={game}
            id={game.id}
            information={information}
            setInformation={setInformation}
            setShowEditForm={setShowEditForm}
          /> */}

          <form
            onSubmit={handleSubmit(onSubmit)}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="form-heading">Edit Game</h2>
            <div className="inputs-and-labels">
              <label htmlFor="name">Game Name:</label>
              <input
                type="text"
                id="name"
                placeholder="Carcassonne"
                {...register("name")}
                required
              />

              <label htmlFor="description">Description:</label>
              <textarea
                type="text"
                id="description"
                placeholder="Players take turns drawing and placing tiles to build a medieval landscape filled with cities, roads, monasteries, and fields."
                {...register("description")}
                required
              />

              <label htmlFor="players">Players:</label>
              <input
                type="text"
                id="players"
                placeholder="2-5"
                {...register("players")}
                required
              />

              <label htmlFor="complexity">Complexity:</label>
              <select
                type="text"
                id="complexity"
                {...register("complexity")}
                required
              >
                <option value="">Choose complexity...</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>

              <label htmlFor="genre">Genre:</label>
              <input
                type="text"
                id="genre"
                placeholder="Tile-laying, Strategy"
                {...register("genre")}
                required
              />

              <label htmlFor="playTime">Play Time:</label>
              <input
                type="text"
                id="playTime"
                placeholder="35-45 minutes"
                {...register("playTime")}
                required
              />

              <label htmlFor="link">Info Link:</label>
              <input
                type="text"
                id="link"
                placeholder="https://(info link to learn more...)"
                {...register("link")}
                required
              />

              <label htmlFor="rating">Rating:</label>
              <select type="text" id="rating" {...register("rating")}>
                <option value="0">Leave rating...</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>

            <AppBtn variation="primary-btn">Edit Game</AppBtn>
          </form>
          <div onClick={(e) => e.stopPropagation()}>
            <DevTool control={control} />
          </div>
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
