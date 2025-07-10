import { useState } from "react";
import "./App.css";
import { info } from "./data";
import GameItem from "./components/GameItem";
import AppBtn from "./components/AppBtn";
// import Form from "./components/Form";
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

  const form = useForm();
  const { register, control, handleSubmit, reset } = form;
  const { name, ref, onChange, onBlur } = register("name");

  const onSubmit = (data) => {
    console.log("Form submitted", data);
    console.log(data);

    setInformation((prev) => [...prev, data]);
    console.log("information", information);

    setShowForm(false);
    reset();
  };

  return (
    <div ref={contentRef}>
      {showForm && (
        <div className="overlay" onClick={() => setShowForm(false)}>
          {/* <Form
            variation="create"
            information={information}
            setInformation={setInformation}
            setShowForm={setShowForm}
          /> */}

          <FormUseForm
            handleSubmit={handleSubmit(onSubmit)}
            register={register}
            variation="create"
          />

          <div onClick={(e) => e.stopPropagation()}>
            <DevTool control={control} />
          </div>
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
