import React from "react";

function Input(props) {
  // prettier-ignore
  const { name, value, handleOnChange, placeholder, variation, options, values, required } = props;

  if (variation === "input") {
    return (
      <input
        type="text"
        name={name}
        value={value}
        onChange={(e) => handleOnChange(e)}
        required
        placeholder={placeholder}
      />
    );
  }
  if (variation === "textarea") {
    return (
      <textarea
        type="text"
        name={name}
        value={value}
        onChange={(e) => handleOnChange(e)}
        required
        placeholder={placeholder}
      />
    );
  }
}

export default Input;
