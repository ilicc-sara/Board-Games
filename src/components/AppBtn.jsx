import React from "react";

function AppBtn(props) {
  const { children, variation, href, handleClick } = props;

  const baseClassName = "btn";
  let modifierClassName;

  if (variation === "Primary Button") {
    modifierClassName = "btn-primary";
  }

  if (variation === "Learn More") {
    modifierClassName = "btn-link";
  }

  if (variation === "Edit Button") {
    modifierClassName = "btn-edit";
  }

  if (href) {
    return (
      <a
        className={`${baseClassName} ${modifierClassName}`}
        href={href}
        target="_blank"
      >
        {children}
      </a>
    );
  } else {
    return (
      <button
        onClick={() => handleClick()}
        className={`${baseClassName} ${modifierClassName}`}
      >
        {children}
      </button>
    );
  }
}

export default AppBtn;
