<!-- APP.JSX -->

import { useState, useEffect } from "react";
import "./App.css";
import { info } from "./data";
import GameItem from "./GameItem";
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
// forma treba biti komponenta koja drzi stejt inputa
// ti inputi mogu biti prazni a mogu biti i prepopunjeni vrednostima iz igrice
// znam da je is editign true ako sam primila inpute iz igrice kao prop
// formu komponentu treba iskoristiti na dva mesta
// prvo mesto gde treba iskoristiti je u app jsx
// tu u app.jsx ne prosledjujem igricu kao prop jer je to tu create
// kada tu otvorim formu to je create
//
// kada radim map preko igrica vratim koponentu single game ili game card
// unutar te komponente napravim isEditing true ili false stejt
// na klik dugmeta edit stavljam isEdit true
// ta komponenta treba da prikazuje i formu ako je is editing true i da prosledi propove iz same sebe
// posto je forma sada dobila igricu kao prop ona zna da je editing
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
          // <article className="game-item">
          //   <div className="title-rating-cont">
          //     <h3 className="game-name"> {game.name} </h3>
          //     <DisplayRatingStars
          //       displayRating={displayRating}
          //       rating={game.rating}
          //       handleClick={rate}
          //       id={game.id}
          //     />
          //   </div>
          //   <p className="game-description"> {game.description} </p>

          //   <GameDetails
          //     players={game.players}
          //     genre={game.genre}
          //     playTime={game.playTime}
          //     complexity={game.complexity}
          //   />

          //   <div className="link-and-edit">
          //     <AppBtn variation="link-btn" href={game.link}>
          //       Learn More
          //     </AppBtn>
          //     <AppBtn variation="edit-btn" handleClick={() => setEditing(game)}>
          //       Edit
          //     </AppBtn>
          //   </div>
          // </article>
          <GameItem game={game} rate={rate} setEditing={setEditing} />
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

<!-- APP.BTN -->

import React from "react";

function AppBtn(props) {
const { children, variation, href, handleClick } = props;

const baseClassName = "btn";
let modifierClassName;

if (variation === "primary-btn") {
modifierClassName = "btn-primary";
}

if (variation === "link-btn") {
modifierClassName = "btn-link";
}

if (variation === "edit-btn") {
modifierClassName = "btn-edit";
}

if (href) {
return (
<a
className={`${baseClassName} ${modifierClassName}`}
href={href}
target="\_blank" >
{children}
</a>
);
} else {
return (
<button
onClick={() => handleClick()}
className={`${baseClassName} ${modifierClassName}`} >
{children}
</button>
);
}
}

export default AppBtn;

<!-- DosplayRatingStars.jsx -->

import React from "react";

function DisplayRatingStars(props) {
const { rating, displayRating, id, handleClick } = props;
const stars = displayRating(rating);
return (

<div className="rating-stars">
{stars.map((rateStar, index) => (
<ion-icon
key={index}
name={`${rateStar ? "star" : "star-outline"}`}
onClick={() => handleClick(id, index)} ></ion-icon>
))}
</div>
);
}

export default DisplayRatingStars;

<!-- FORM.JSX -->

import React from "react";
import Input from "./Input";
import AppBtn from "./AppBtn";

function Form(props) {
const { handleSubmit, isNotEditing, inputs, handleInputChange } = props;

return (

<form onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
<h2> {`${isNotEditing ? "Add new Game" : "Edit Game"}`}</h2>
<div className="inputs-and-labels">
<label>Game Name:</label>
<Input
          name="name"
          value={inputs.name}
          handleOnChange={handleInputChange}
          placeholder="Carcassonne"
        />

        <label>Description:</label>
        <Input
          textarea
          name="description"
          value={inputs.description}
          handleOnChange={handleInputChange}
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
        <select
          type="text"
          name="complexity"
          value={inputs.complexity}
          onChange={(e) => handleInputChange(e)}
          required
        >
          <option value="">Choose complexity...</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        {/* <Input
          optionsValues={["", "Easy", "Medium", "Hard"]}
          options={["Choose complexity...", "Easy", "Medium", "Hard"]}
          name="complexity"
          value={inputs.complexity}
          handleOnChange={handleInputChange}
          required={true}
        /> */}

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
        >
          <option value="0">Leave rating...</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        {/* <Input
          optionsValues={["0", "1", "2", "3", "4", "5"]}
          options={["Leave rating...", "1", "2", "3", "4", "5"]}
          name="rating"
          value={inputs.rating}
          handleOnChange={handleInputChange}
          required={false}
        /> */}
      </div>

      <AppBtn variation="primary-btn">
        {`${isNotEditing ? "Add Game" : "Edit game"}`}
      </AppBtn>
    </form>

);
}

export default Form;

<!-- GameDetails.jsx -->

import React from "react";

function GameDetails(props) {
const { players, genre, playTime, complexity } = props;

return (

<div className="game-details">
<p className="game-detail">
<img src="./images/People_icon.svg.png" className="icon-png" />
{players}
</p>
<p className="game-detail">
<img src="./images/board-game-icon.png" className="icon-png" />
{genre}
</p>
<p className="game-detail">
<img src="./images/clock-icn.png" className="icon-png" />
{playTime}
</p>
<p className="game-detail">
<img src="./images/chart-game-icon.png" className="icon-png" />

        {complexity}
      </p>
    </div>

);
}

export default GameDetails;

<!-- GAME ITEM. JSX -->

import React from "react";
import DisplayRatingStars from "./DisplayRatingStars";
import GameDetails from "./GameDetails";
import AppBtn from "./AppBtn";

function GameItem(props) {
const { game, rate, setEditing } = props;

console.log(game.isEditing);

function displayRating(ratingNumber) {
const maxRateNumber = 5;
const number = Number(ratingNumber);

    const rateNumber = Array(number).fill(true);
    const rateDifference = Array(maxRateNumber - number).fill(false);

    const sum = [...rateNumber, ...rateDifference];

    return sum;

}

return (

<article className="game-item">
<div className="title-rating-cont">
<h3 className="game-name"> {game.name} </h3>
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

);
}

export default GameItem;

const { name, ref, onChange, onBlur } = register("name");
