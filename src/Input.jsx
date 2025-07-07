import React from "react";

function Input(props) {
  const { name, value, handleOnChange, placeholder } = props;
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

export default Input;
