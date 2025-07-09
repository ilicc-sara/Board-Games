import { useState } from "react";
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

  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <div ref={contentRef}>
      {showForm && (
        <div className="overlay" onClick={() => setShowForm(false)}>
          <Form
            variation="create"
            information={information}
            setInformation={setInformation}
            setShowForm={setShowForm}
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
