import { useState } from "react";
import DisplayRatingStars from "./DisplayRatingStars";
import GameDetails from "./GameDetails";
import AppBtn from "./AppBtn";
// import Form from "./Form";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import FormUseForm from "./FormUseForm";

function GameItem(props) {
  const { game, setInformation } = props;
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

  // FOR FORM COMPONENT
  // function handleSubmit(e, inputs) {
  //   e.preventDefault();

  //   setInformation((prev) =>
  //     prev.map((item) => {
  //       if (item.id === game.id) {
  //         return { ...inputs };
  //       } else return item;
  //     })
  //   );
  //   setShowEditForm(false);
  // }

  // FOR FORM USE FORM COMPONENT
  const form = useForm({ defaultValues: { ...game } });
  const { register, control, handleSubmit, reset } = form;

  const onSubmit = (data) => {
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
          {/* <Form variation="edit" game={game} handleSubmit={handleSubmit} /> */}

          <FormUseForm
            handleSubmit={handleSubmit(onSubmit)}
            register={register}
            variation="edit"
          />
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
        <AppBtn variation="Learn More" href={game.link}>
          Learn More
        </AppBtn>
        <AppBtn
          variation="Edit Button"
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
