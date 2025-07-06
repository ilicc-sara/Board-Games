import React from "react";

function AppBtn(props) {
  const { children, variation, href, handleClick } = props;

  const baseClassName = "btn";
  let modifierClassName;

  if (variation === "print-btn") {
    modifierClassName = "btn-pdf";
  }
  if (variation === "link-btn") {
    modifierClassName = "btn-link";
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
