import React from "react";
import { Logo } from "../index";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="w-full p-2 bg-gray-600">
      <div className="flex items-center justify-center px-4">
        <div className="w-full flex space-x-2">
          <p className="text-center text-white">
            Copyright &copy; 2024 | Made with &hearts; by{" "}
            <span className="text-bold text-white">Adarsh Kumar Singh</span>
          </p>
          <p className="text-center text-white">| All Rights Reserved</p>
        </div>
        <div className="w-full flex items-center justify-end space-x-5">
          <p>Connect With Me</p>
          <Link to={"https://github.com/adarsh111coffee"} target="_blank">
            <Logo src="./src/assets/github.svg" height="20px" width="20px" />
          </Link>
          <Link
            to={"https://www.linkedin.com/in/adarshkumarsingh111/"}
            target="_blank"
          >
            <Logo src="./src/assets/linkedin.svg" height="20px" width="20px" />
          </Link>
          <Link to={""} target="_blank">
            <Logo src="./src/assets/instagram.svg" height="20px" width="20px" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
