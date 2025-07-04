import { useState } from "react";
import "./App.css";
import { info } from "./data";

function App() {
  const [information, setInformation] = useState(info);

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
    <div>
      <nav>
        <h1>Board Games</h1>
        <button className="save-as-pdf-btn">Save as PDF</button>
      </nav>

      <main className="game-items-container">
        {information.map((game) => (
          <article className="game-item">
            <div className="title-rating-cont">
              <h3> {game.name} </h3>
              <div className="rating-stars">
                {displayRating(game.rating).map((rateStar, index) =>
                  rateStar ? (
                    <ion-icon
                      key={index}
                      name="star"
                      onClick={() => rate(game.id, index)}
                    ></ion-icon>
                  ) : (
                    <ion-icon
                      key={index}
                      name="star-outline"
                      onClick={() => rate(game.id, index)}
                    ></ion-icon>
                  )
                )}
              </div>
            </div>
            <p> {game.description} </p>

            <div className="game-details">
              <p className="game-detail">
                <ion-icon name="people-outline"></ion-icon> {game.players}
              </p>
              <p className="game-detail">
                <img className="social-game-icon" src={"./social-game.png"} />{" "}
                {game.gameType}
              </p>
              <p className="game-detail">
                <ion-icon name="time-outline"></ion-icon> {game.timeSpan}
              </p>
              <p className="game-detail">
                <ion-icon name="stats-chart-outline"></ion-icon>
                {game.level}
              </p>
            </div>

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
