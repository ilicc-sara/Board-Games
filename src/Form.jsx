import React from "react";
import Input from "./Input";
import AppBtn from "./AppBtn";

function Form(props) {
  const { handleSubmit, isEditing, inputs, handleInputChange } = props;
  return (
    <form onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
      <h2> {`${isEditing ? "Add new Game" : "Edit Game"}`}</h2>
      <div className="inputs-and-labels">
        <label>Set Game Name:</label>
        <Input
          name="name"
          value={inputs.name}
          handleOnChange={handleInputChange}
          placeholder="Carcassonne"
        />

        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={inputs.description}
          onChange={(e) => handleInputChange(e)}
          required
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
        {/* <Input
          name="complexity"
          value={inputs.complexity}
          handleOnChange={handleInputChange}
          placeholder="easy"
        /> */}
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
        {`${isEditing ? "Add Game" : "Edit game"}`}
      </AppBtn>
    </form>
  );
}

export default Form;
