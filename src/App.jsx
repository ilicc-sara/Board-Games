import { useState } from "react";
import "./App.css";
import { info } from "./data";
import GameDetails from "./GameDetails";
import DisplayRatingStars from "./DisplayRatingStars";
import AppBtn from "./AppBtn";
import Input from "./Input";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

function App() {
  const [information, setInformation] = useState(info);
  const [showForm, setShowForm] = useState(false);

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
  console.log(inputs);
  console.log(information);

  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

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

  function handleInputChange(e) {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setInformation((prev) => [...prev, inputs]);
    setInputs({
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
    setShowForm(false);
  }

  return (
    <div ref={contentRef}>
      {showForm && (
        <div className="overlay" onClick={() => setShowForm(false)}>
          <h1 style={{ color: "white" }}>Add new Game</h1>
          <form onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
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
              <Input
                name="complexity"
                value={inputs.complexity}
                handleOnChange={handleInputChange}
                placeholder="easy"
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
              <select
                type="text"
                name="rating"
                value={inputs.rating}
                onChange={(e) => handleInputChange(e)}
                placeholder="How would you rate this game?"
              >
                <option value="0">Leave rating...</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>

            <button> Add Game </button>
          </form>
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
          <article className="game-item">
            <div className="title-rating-cont">
              <h3> {game.name} </h3>
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

            <AppBtn variation="link-btn" href={game.link}>
              Learn More
            </AppBtn>
          </article>
        ))}
      </main>
    </div>
  );
}
// dodati sledece funkcionalnosti
// dodavanje nove igrice :
// dodati neko dugme add new game
// kad se na njega klikne treba se pojaviti overlay i forma po sredini ekrana
// submit forme pravi novu igricu
// edit postojece igrice
// svako dugme treba imati mali edit btn
// kad se klikne na edit btn otvori se ista forma kao za dodavanje nove igrice samo je popunjena vrednostima iz igrice
// znaci potrebna ce biti neka komponenta createEditForm
// za dugmad edit i create iskoristi app link componentu ✅

export default App;
