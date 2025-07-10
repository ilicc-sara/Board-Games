import { useState } from "react";
import "./App.css";
import { info } from "./data";
import GameItem from "./components/GameItem";
import AppBtn from "./components/AppBtn";
// import Form from "./components/Form";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

function App() {
  const [information, setInformation] = useState(info);
  const [showForm, setShowForm] = useState(false);

  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const form = useForm();
  const { register, control } = form;
  const { name, ref, onChange, onBlur } = register("name");

  return (
    <div ref={contentRef}>
      {showForm && (
        <div
          className="overlay"
          // onClick={() => setShowForm(false)}
        >
          {/* <Form
            variation="create"
            information={information}
            setInformation={setInformation}
            setShowForm={setShowForm}
          /> */}
          <AppBtn
            variation="primary-btn"
            handleClick={() => setShowForm(false)}
          >
            Close Overlay
          </AppBtn>
          <form onClick={(e) => e.stopPropagation()}>
            <h2 className="form-heading">Add new Game</h2>
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

            <AppBtn variation="primary-btn">Add Game</AppBtn>
          </form>
          <DevTool control={control} />
        </div>
      )}

      <nav>
        <h1>Board Games</h1>
        <div className="primary-buttons">
          <AppBtn variation="primary-btn" handleClick={() => setShowForm(true)}>
            Add New Game
          </AppBtn>
          <AppBtn variation="primary-btn" handleClick={reactToPrintFn}>
            Save as PDF
          </AppBtn>
        </div>
      </nav>

      <main className="game-items-container">
        {information.map((game) => (
          <GameItem
            game={game}
            information={information}
            setInformation={setInformation}
          />
        ))}
      </main>
    </div>
  );
}

export default App;
