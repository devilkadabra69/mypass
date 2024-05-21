import React, { useId } from "react";

function InputComp(
  { label, type = "text", placeholder = "", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <>
      {label && (
        <label htmlFor={id} className="inline-block mb-1 pl-1">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        {...props}
      />
    </>
  );
}

export default React.forwardRef(InputComp);
