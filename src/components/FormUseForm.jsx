import React from "react";
import AppBtn from "./AppBtn";

function FormUseForm(props) {
  const { handleSubmit, register, variation } = props;
  return (
    <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
      <h2 className="form-heading">{`${
        variation === "create" ? "Add new Game" : "Edit Game"
      }`}</h2>
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

      <AppBtn variation="primary-btn">{`${
        variation === "edit" ? "Edit Game" : "Add Game"
      }`}</AppBtn>
    </form>
  );
}

export default FormUseForm;
