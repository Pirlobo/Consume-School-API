import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
const Navbar = (props) => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <ul className=" responsive-wrapper">
      <li>
        <Link
          onClick={props.handleClick}
          to={"/home"}
          className="responsive-nav-text nav-link"
        >
          <h1>Home</h1>
        </Link>
      </li>
      <li>
        <Link
          onClick={props.handleClick}
          to={"/login"}
          className="responsive-nav-text nav-link"
        >
          <h1>Login</h1>
        </Link>
      </li>
      <li>
        <Link
          onClick={props.handleClick}
          to={"/register"}
          className="responsive-nav-text nav-link"
        >
          <h1>Sign Up</h1>
        </Link>
      </li>
    </ul>
  );
};

export default Navbar;
