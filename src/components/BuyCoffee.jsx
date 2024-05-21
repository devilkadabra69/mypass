import React from "react";
import Logo from "./Logo";

const BuyMeACoffeeButton = () => {
  return (
    <a
      href="https://www.buymeacoffee.com/your-username"
      target="_blank"
      rel="noopener noreferrer"
    >
      <button className="flex items-center justify-center bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
        <Logo src="./src/assets/coffee.svg" />
        Buy me a coffee
      </button>
    </a>
  );
};

export default BuyMeACoffeeButton;
