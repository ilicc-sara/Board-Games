import { useState, useEffect } from "react";
import Input from "./Input";
import AppBtn from "./AppBtn";
import Select from "./Select";

function Form(props) {
  const { game, variation, handleSubmit } = props;

  const [inputs, setInputs] = useState(game);

  // const [inputs, setInputs] = useState({
  //   name: "",
  //   description: "",
  //   players: "",
  //   complexity: "",
  //   genre: "",
  //   playTime: "",
  //   link: "",
  //   rating: "",
  //   id: crypto.randomUUID(),
  // });

  // useEffect(() => {
  //   return () => {
  //     if (game) {
  //       setInputs(game);
  //     }
  //   };
  // }, [game]);

  function handleInputChange(e) {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  return (
    <form
      onClick={(e) => e.stopPropagation()}
      onSubmit={(e) => handleSubmit(e, inputs)}
    >
      <h2 className="form-heading">{`${
        // !game ? "Add new Game" : "Edit Game"
        variation === "create" ? "Add new Game" : "Edit Game"
      }`}</h2>
      <div className="inputs-and-labels">
        <label>Game Name:</label>
        <Input
          variation="input"
          name="name"
          value={inputs.name}
          handleOnChange={handleInputChange}
          placeholder="Carcassonne"
        />

        <label>Description:</label>
        <Input
          variation="textarea"
          name="description"
          value={inputs.description}
          handleOnChange={handleInputChange}
          placeholder="Players take turns drawing and placing tiles to build a medieval landscape filled with cities, roads, monasteries, and fields."
        />

        <label>Players:</label>
        <Input
          variation="input"
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
          options={[
            { option: "Choose complexity...", value: "" },
            { option: "Easy", value: "Easy" },
            { option: "Medium", value: "Medium" },
            { option: "Hard", value: "Hard" },
          ]}
        />

        <label>Genre:</label>
        <Input
          variation="input"
          name="genre"
          value={inputs.genre}
          handleOnChange={handleInputChange}
          placeholder="Tile-laying, Strategy"
        />

        <label>Play Time:</label>
        <Input
          variation="input"
          name="playTime"
          value={inputs.playTime}
          handleOnChange={handleInputChange}
          placeholder="35-45 minutes"
        />

        <label>Info Link:</label>
        <Input
          variation="input"
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
          options={[
            { option: "Leave rating...", value: "0" },
            { option: "1", value: "1" },
            { option: "2", value: "2" },
            { option: "3", value: "3" },
            { option: "4", value: "4" },
            { option: "5", value: "5" },
          ]}
        />
      </div>

      <AppBtn variation="Primary Button">
        {/* {`${!game ? "Add Game" : "Edit game"}`} */}
        {`${variation === "create" ? "Add Game" : "Edit game"}`}
      </AppBtn>
    </form>
  );
}

export default Form;
