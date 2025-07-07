import { useState, useEffect } from "react";
import "./App.css";
import { info } from "./data";
import GameDetails from "./GameDetails";
import DisplayRatingStars from "./DisplayRatingStars";
import AppBtn from "./AppBtn";
import Form from "./Form";
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
    isEditing: false,
  });

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

  function closeOverlay() {
    setInformation((prev) =>
      prev.map((game) => {
        return { ...game, isEditing: false };
      })
    );
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
      isEditing: false,
    });
    setShowForm(false);
  }

  const isNotEditing = information.every((game) => !game.isEditing);

  function handleSubmit(e) {
    e.preventDefault();

    if (information.every((game) => !game.isEditing)) {
      setInformation((prev) => [...prev, inputs]);
    } else {
      setInformation((prev) =>
        prev.map((game) => {
          if (game.isEditing) {
            return { ...inputs };
          } else return game;
        })
      );
    }

    closeOverlay();
  }

  function setEditing(game) {
    setShowForm(true);

    setInputs({ ...game });

    setInformation((prev) =>
      prev.map((gameItem) => {
        if (game.id === gameItem.id) {
          return { ...gameItem, isEditing: true };
        } else return { ...gameItem, isEditing: false };
      })
    );
  }

  return (
    <div ref={contentRef}>
      {showForm && (
        <div className="overlay" onClick={() => closeOverlay()}>
          <Form
            handleSubmit={handleSubmit}
            isNotEditing={isNotEditing}
            inputs={inputs}
            handleInputChange={handleInputChange}
          />
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

            <div className="link-and-edit">
              <AppBtn variation="link-btn" href={game.link}>
                Learn More
              </AppBtn>
              <AppBtn variation="edit-btn" handleClick={() => setEditing(game)}>
                Edit
              </AppBtn>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
}
// dodati sledece funkcionalnosti
// dodavanje nove igrice : ✅
// dodati neko dugme add new game ✅
// kad se na njega klikne treba se pojaviti overlay i forma po sredini ekrana ✅
// submit forme pravi novu igricu ✅
// edit postojece igrice ✅
// svako dugme treba imati mali edit btn ✅
// kad se klikne na edit btn otvori se ista forma kao za dodavanje nove igrice samo je popunjena vrednostima iz igrice ✅
// znaci potrebna ce biti neka komponenta createEditForm
// za dugmad edit i create iskoristi app link componentu ✅

export default App;
