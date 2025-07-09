import React from "react";

function Select(props) {
  const { name, value, handleOnChange, required, values, options } = props;

  return (
    <select
      type="text"
      name={name}
      value={value}
      onChange={(e) => handleOnChange(e)}
      required={required}
    >
      {options.map((option, index) => (
        <option value={`${values[index]}`}>{option}</option>
      ))}
    </select>
  );
}

export default Select;
