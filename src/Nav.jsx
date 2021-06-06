import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import "./Nav.css";


function Nav() {
  const [show, handleShow] = useState(false);

  const history = useHistory()

  const transitionNavBAr = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBAr);
    return () => window.removeEventListener("scroll", transitionNavBAr);
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <div className="nav__contents">
        <img
          onClick={() => history.push('/')}
          className="nav__logo"
          src="https://logodownload.org/wp-content/uploads/2014/10/netflix-logo-5.png"
          alt="netflix-logo"
        />

        <img
        onClick={() => history.push('/profile')}
          className="nav__avatar"
          src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
          alt=""
        />
      </div>
    </div>
  );
}

export default Nav;
