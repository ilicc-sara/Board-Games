import React, { useState, useEffect } from "react";
import Input from "./Input";
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
    isEditing: false,
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
      <h2>{`${!game ? "Add new Game" : "Edit Game"}`}</h2>
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
        <select
          type="text"
          name="complexity"
          value={inputs.complexity}
          onChange={(e) => handleInputChange(e)}
          required
        >
          <option value="">Choose complexity...</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

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
        <select
          type="text"
          name="rating"
          value={inputs.rating}
          onChange={(e) => handleInputChange(e)}
        >
          <option value="0">Leave rating...</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>

      <AppBtn variation="primary-btn">
        {`${!game ? "Add Game" : "Edit game"}`}
      </AppBtn>
    </form>
  );
}

export default Form;
