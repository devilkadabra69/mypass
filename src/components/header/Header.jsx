import React, { useState } from "react";
import { Container, ButtonComp, Logo } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../store/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import Auth from "../../appwrite/Auth";
import GitHub_BUTTON from "../GitHub_BUTTON";
import BuyMeACoffeeButton from "../BuyCoffee";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.auth.status);
  console.log(`${Math.random() * 100}`, authenticated); // Verify the value of authenticated
  const [logoutloader, setLogOutLoader] = useState(false);

  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      await Auth.logout();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log(
        "Can't able to log out :: error in Header.jsx line 16 :: ",
        error
      );
    } finally {
      setLogOutLoader(false);
    }
  };

  const navItems = [
    {
      name: "Home",
      to: "/",
      className:
        "font-bold hover:text-gray-400 text-white transition-all duration-200 ease-in-out",
    },
    {
      name: "About",
      to: "about",
      className:
        "font-bold hover:text-gray-400 text-white transition-all duration-200 ease-in-out",
    },
    {
      name: "Contact",
      to: "contact",
      className:
        "font-bold hover:text-gray-400 text-white transition-all duration-200 ease-in-out",
    },
  ];

  const authNavItems = [
    {
      name: "Library",
      to: "/all-posts",
      className:
        "font-bold hover:text-gray-400 text-white transition-all duration-200 ease-in-out",
    },
    {
      name: "Profile",
      to: "/profile",
      className:
        "font-bold hover:text-gray-400 text-white transition-all duration-200 ease-in-out",
    },
  ];

  const authButtons = [
    {
      name: "Log In",
      onclick: () => navigate("/login"),
      className:
        "hover:text-pink-600 hover:bg-white font-bold outline-none px-4 rounded whitespace-nowrap transition-all duration-200 ease-in-out bg-gray-500 text-pink-500",
      isAuthRequired: !authenticated,
    },
    {
      name: "Sign Up",
      onclick: () => navigate("/signup"),
      className:
        "hover:text-pink-800 hover:bg-white font-bold outline-none px-4 rounded whitespace-nowrap transition-all duration-200 ease-in-out bg-gray-500 text-pink-500",
      isAuthRequired: !authenticated,
    },
    {
      name: "Log Out",
      onclick: (e) => handleLogOut(e),
      className:
        "hover:text-pink-800 hover:bg-white font-bold outline-none px-4 rounded whitespace-nowrap transition-all duration-200 ease-in-out bg-gray-500 text-pink-500",
      isAuthRequired: authenticated,
    },
  ];

  return (
    <header className="w-full shadow-lg bg-gray-600 px-2">
      <Container>
        <nav className="flex justify-between items-center py-4">
          <div className="w-autos">
            <Link to="/">
              <Logo src="src\assets\main-logo.svg" />
            </Link>
          </div>
          <ul className="flex-grow flex items-center justify-start space-x-6 ms-4">
            {navItems.map((items) => (
              <Link to={items.to} className={items.className} key={items.name}>
                {items.name}
              </Link>
            ))}
            {authenticated &&
              authNavItems.map((items) => (
                <Link
                  to={items.to}
                  className={items.className}
                  key={items.name}
                >
                  {items.name}
                </Link>
              ))}

            <GitHub_BUTTON />
            <BuyMeACoffeeButton />
          </ul>
          <div className="flex items-center space-x-4 ms-2">
            {authButtons
              .filter((button) => button.isAuthRequired)
              .map((button) => (
                <ButtonComp
                  key={button.name}
                  children={button.name}
                  className={button.className}
                  onClick={button.onclick}
                />
              ))}
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
