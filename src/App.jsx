import { useState } from "react";
import "./App.css";
import { info } from "./data";
import GameDetails from "./GameDetails";
import DisplayRatingStars from "./DisplayRatingStars";
import AppBtn from "./AppBtn";
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
              <input
                type="text"
                name="name"
                value={inputs.name}
                onChange={(e) => handleInputChange(e)}
                required
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
              <input
                type="text"
                name="players"
                value={inputs.players}
                onChange={(e) => handleInputChange(e)}
                required
                placeholder="2–5"
              />

              <label>Complexity:</label>
              <input
                type="text"
                name="complexity"
                value={inputs.complexity}
                onChange={(e) => handleInputChange(e)}
                required
                placeholder="easy"
              />

              <label>Genre:</label>
              <input
                type="text"
                name="genre"
                value={inputs.genre}
                onChange={(e) => handleInputChange(e)}
                required
                placeholder="Tile-laying, Strategy"
              />

              <label>Play Time:</label>
              <input
                type="text"
                name="playTime"
                value={inputs.playTime}
                onChange={(e) => handleInputChange(e)}
                required
                placeholder="35–45 minutes"
              />

              <label>Info Link:</label>
              <input
                type="text"
                name="link"
                value={inputs.link}
                onChange={(e) => handleInputChange(e)}
                required
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
            <p> {game.description} </p>

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
