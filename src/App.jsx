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

  return (
    <div ref={contentRef}>
      <nav>
        <h1>Board Games</h1>
        <AppBtn variation="print-btn" handleClick={reactToPrintFn}>
          Save as PDF
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
// za dugmad edit i create iskoristi app link componentu

export default App;
