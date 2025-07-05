import { useState } from "react";
import "./App.css";
import { info } from "./data";
import GameDetails from "./GameDetails";
import DisplayRatingStars from "./DisplayRatingStars";
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
        <button onClick={() => reactToPrintFn()} className="save-as-pdf-btn">
          Save as PDF
        </button>
      </nav>

      <main className="game-items-container">
        {information.map((game) => (
          <article className="game-item">
            <div className="title-rating-cont">
              <h3> {game.name} </h3>
              <DisplayRatingStars
                displayRating={displayRating}
                rating={game.rating}
                id={game.id}
                handleClick={rate}
              />
            </div>
            <p> {game.description} </p>

            <GameDetails
              players={game.players}
              gameType={game.gameType}
              timeSpan={game.timeSpan}
              level={game.level}
            />

            <a className="learn-more" href={`${game.link}`} target="_blank">
              Learn More
            </a>
          </article>
        ))}
      </main>
    </div>
  );
}

export default App;
