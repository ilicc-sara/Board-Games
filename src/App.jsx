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
    inputName: "",
    inputDescription: "",
    inputPlayers: "",
    inputLevel: "",
    inputGameType: "",
    inputTimeSpan: "",
    inputLink: "",
    inputRating: "",
    id: crypto.randomUUID(),
  });

  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  function displayRating(ratingNumber) {
    const maxRateNumber = 5;
    const rateNumber = Array(ratingNumber).fill(true);
    const rateDifference = Array(maxRateNumber - ratingNumber).fill(false);

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

  return (
    <div ref={contentRef}>
      {showForm && (
        <div className="overlay" onClick={() => setShowForm(false)}>
          <h1 style={{ color: "white" }}>Add new Game</h1>
          <form onClick={(e) => e.stopPropagation()}>
            <label>Set Game Name:</label>
            <input
              type="text"
              name="inputName"
              value={inputs.inputName}
              onChange={(e) => handleInputChange(e)}
            />
            <br />
            <label>Description:</label>
            <input
              type="text"
              name="inputDescription"
              value={inputs.inputDescription}
              onChange={(e) => handleInputChange(e)}
            />
            <br />
            <label>Players:</label>
            <input
              type="text"
              name="inputPlayers"
              value={inputs.inputPlayers}
              onChange={(e) => handleInputChange(e)}
            />
            <br />
            <label>Level:</label>
            <input
              type="text"
              name="inputLevel"
              value={inputs.inputLevel}
              onChange={(e) => handleInputChange(e)}
            />
            <br />
            <label>Game Type:</label>
            <input
              type="text"
              name="inputGameType"
              value={inputs.inputGameType}
              onChange={(e) => handleInputChange(e)}
            />
            <br />
            <label>Time Span:</label>
            <input
              type="text"
              name="inputTimeSpan"
              value={inputs.inputTimeSpan}
              onChange={(e) => handleInputChange(e)}
            />
            <br />
            <label>Info Link:</label>
            <input
              type="text"
              name="inputLink"
              value={inputs.inputLink}
              onChange={(e) => handleInputChange(e)}
            />
            <br />
            <label>Rating:</label>
            <input
              type="text"
              name="inputRating"
              value={inputs.inputRating}
              onChange={(e) => handleInputChange(e)}
            />
            <br />
          </form>
        </div>
      )}

      <nav>
        <h1>Board Games</h1>
        <AppBtn variation="print-btn" handleClick={reactToPrintFn}>
          Save as PDF
        </AppBtn>
        <AppBtn variation="new-game-btn" handleClick={() => setShowForm(true)}>
          Add New Game
        </AppBtn>
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
              gameType={game.gameType}
              timeSpan={game.timeSpan}
              level={game.level}
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
