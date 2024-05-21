import React from "react";

function Logo({
  src = "./src/assets/react.svg",
  height = "30px",
  width = "30px",
  className = "",
  alt = "Logo",
  ...props
}) {
  return (
    <img
      src={src}
      alt={alt}
      style={{ height, width }} // Inline styles for dynamic values
      className={className}
      {...props}
    />
  );
}

export default Logo;
