import React from "react";

function Input(props) {
  const { name, value, handleOnChange, placeholder, textarea } = props;

  if (!textarea) {
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
  } else {
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
