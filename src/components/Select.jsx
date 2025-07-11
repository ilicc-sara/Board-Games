import React from "react";

function Select(props) {
  const { name, value, handleOnChange, options, required } = props;
  return (
    <select
      type="text"
      name={name}
      value={value}
      onChange={(e) => handleOnChange(e)}
      required={required}
    >
      {options.map((option) => (
        <option value={`${option.value}`}>{option.option}</option>
      ))}
    </select>
  );
}

export default Select;
