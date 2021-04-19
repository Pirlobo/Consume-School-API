import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import AuthService from "../../services/auth.service";
const CurrentUserNav = (props) => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [size, setSize] = useState([0, 0]);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };
  const user = AuthService.getCurrentUser();
  const username = user.username;
  useEffect(() => {
    showButton();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  window.addEventListener("resize", showButton);

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    
  }, []);
  useEffect(() => {
    if (size[0] > 1200) {
      props.handleWidthChange();
    }
  }, [size])


  return (
    <ul className=" responsive-wrapper">
      <li key = 'Syllabus'> 
        <Link
          onClick={props.handleClick}
          to={{ pathname: "/syllabus", permission: "allowed" }}
          className="responsive-nav-text nav-link"
        >
          {/* <h1>{username}</h1> */}
          <h4>Syllabus</h4>
        </Link>
      </li>
      <li key = 'Profile'>
        <Link
          onClick={props.handleClick}
          to={{ pathname: "/profile", permission: "allowed" }}
          className="responsive-nav-text nav-link"
        >
          <h4>Profile</h4>
        </Link>
      </li>
      {currentUser.roles == "ROLE_USER" && (
        <li key>
          <Link
            onClick={props.handleClick}
            to={{ pathname: "/courses", permission: "allowed" }}
            className="responsive-nav-text nav-link"
          >
            <h4>Your Classes</h4>
          </Link>
        </li>
      )}
      {currentUser.roles == "ROLE_USER" && (
        <li>
          <Link
            onClick={props.handleClick}
            to={{ pathname: "/registerForClasses", permission: "allowed" }}
            className="responsive-nav-text nav-link"
            permission="allowed"
          >
            <h4>Register for Classes</h4>
          </Link>
        </li>
      )}
      {currentUser.roles == "ROLE_USER" && (
        <li>
          <Link
            onClick={props.handleClick}
            to={{ pathname: "/dropClasses", permission: "allowed" }}
            className="responsive-nav-text nav-link"
            permission="allowed"
          >
            <h4>Drop Classes</h4>
          </Link>
        </li>
      )}
      {currentUser.roles == "ROLE_TEACHER" && (
        <li>
          <Link
            onClick={props.handleClick}
            to={{ pathname: "/manageCourses", permission: "allowed" }}
            className="responsive-nav-text nav-link"
            permission="allowed"
          >
            <h4>Manage Courses</h4>
          </Link>
        </li>
      )}
      {currentUser.roles == "ROLE_TEACHER" && (
        <li>
          <Link
            onClick={props.handleClick}
            to={{ pathname: "/inbox", permission: "allowed" }}
            className="responsive-nav-text nav-link"
          >
            <h4>Inbox</h4>
          </Link>
        </li>
      )}

      <li>
        <Link
          onClick={props.handleClickResNavLogOut}
          to={{ pathname: "/login", permission: "allowed" }}
          className="responsive-nav-text nav-link"
        >
          <h4>Logout</h4>
        </Link>
      </li>
    </ul>
  );
};

export default CurrentUserNav;
