import React, { useState, useEffect } from "react";
import Input from "./Input";
import Select from "./Select";
import AppBtn from "./AppBtn";

function Form(props) {
  // prettier-ignore
  const { setInformation, setShowForm, game, variation, setShowEditForm, id } = props;

  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    players: "",
    complexity: "",
    genre: "",
    playTime: "",
    link: "",
    rating: "",
    id: crypto.randomUUID(),
  });

  useEffect(() => {
    return () => {
      if (game) {
        setInputs(game);
      }
    };
  }, [game]);

  function handleInputChange(e) {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (variation === "create") {
      setInformation((prev) => [...prev, inputs]);
      setShowForm(false);
    } else if (variation === "edit") {
      setInformation((prev) =>
        prev.map((game) => {
          if (game.id === id) {
            return { ...inputs };
          } else return game;
        })
      );
      setShowEditForm(false);
    }
  }

  return (
    <form onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
      <h2 className="form-heading">{`${
        !game ? "Add new Game" : "Edit Game"
      }`}</h2>
      <div className="inputs-and-labels">
        <label>Game Name:</label>
        <Input
          name="name"
          value={inputs.name}
          handleOnChange={handleInputChange}
          placeholder="Carcassonne"
        />

        <label>Description:</label>
        <Input
          textarea
          name="description"
          value={inputs.description}
          handleOnChange={handleInputChange}
          placeholder="Players take turns drawing and placing tiles to build a medieval landscape filled with cities, roads, monasteries, and fields."
        />

        <label>Players:</label>
        <Input
          name="players"
          value={inputs.players}
          handleOnChange={handleInputChange}
          placeholder="2-5"
        />

        <label>Complexity:</label>
        <Select
          name="complexity"
          value={inputs.complexity}
          handleOnChange={handleInputChange}
          required={true}
          values={["", "Easy", "Medium", "Hard"]}
          options={["Choose complexity...", "Easy", "Medium", "Hard"]}
        />

        <label>Genre:</label>
        <Input
          name="genre"
          value={inputs.genre}
          handleOnChange={handleInputChange}
          placeholder="Tile-laying, Strategy"
        />

        <label>Play Time:</label>
        <Input
          name="playTime"
          value={inputs.playTime}
          handleOnChange={handleInputChange}
          placeholder="35-45 minutes"
        />

        <label>Info Link:</label>
        <Input
          name="link"
          value={inputs.link}
          handleOnChange={handleInputChange}
          placeholder="https://(info link to learn more...)"
        />

        <label>Rating:</label>
        <Select
          name="rating"
          value={inputs.rating}
          handleOnChange={handleInputChange}
          required={false}
          values={["0", "1", "2", "3", "4", "5"]}
          options={["Leave rating...", "1", "2", "3", "4", "5"]}
        />
      </div>

      <AppBtn variation="primary-btn">
        {`${!game ? "Add Game" : "Edit game"}`}
      </AppBtn>
    </form>
  );
}

export default Form;
