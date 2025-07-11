import { useState } from "react";
import "./App.css";
import { info } from "./data";
import GameItem from "./components/GameItem";
import AppBtn from "./components/AppBtn";
import Form from "./components/Form";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import FormUseForm from "./components/FormUseForm";

function App() {
  const [information, setInformation] = useState(info);
  const [showForm, setShowForm] = useState(false);

  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  // FOR FORM COMPONENT
  function handleSubmit(e, inputs) {
    e.preventDefault();

    setInformation((prev) => [...prev, inputs]);
    setShowForm(false);
  }

  // FOR FORM USE FORM COMPONENT
  // const form = useForm();
  // const { register, control, handleSubmit, reset } = form;

  // const onSubmit = (data) => {
  //   setInformation((prev) => [...prev, data]);

  //   setShowForm(false);
  //   reset();
  // };

  return (
    <div ref={contentRef}>
      {showForm && (
        <div className="overlay" onClick={() => setShowForm(false)}>
          {/* FOR FORM COMPONENT */}
          <Form
            variation="create"
            handleSubmit={handleSubmit}
            game={{
              name: "",
              description: "",
              players: "",
              complexity: "",
              genre: "",
              playTime: "",
              link: "",
              rating: "",
              id: crypto.randomUUID(),
            }}
          />

          {/* FOR FORM USE FORM COMPONENT */}
          {/* <FormUseForm
            handleSubmit={handleSubmit(onSubmit)}
            register={register}
            variation="create"
          />
          <div onClick={(e) => e.stopPropagation()}>
            <DevTool control={control} />
          </div> */}
        </div>
      )}

      <nav>
        <h1>Board Games</h1>
        <div className="primary-buttons">
          <AppBtn
            variation="Primary Button"
            handleClick={() => setShowForm(true)}
          >
            Add New Game
          </AppBtn>
          <AppBtn variation="Primary Button" handleClick={reactToPrintFn}>
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
