import React from "react";

function ButtonComp({
  children = "untitled",
  type = "button",
  onClick = () => {},
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`p-2 rounded shadow w-full outline-none ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default ButtonComp;
