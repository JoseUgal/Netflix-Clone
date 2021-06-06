import React, { useRef } from "react";
import "./SignUpScreen.css";

import { auth, db } from "../../firebase";

function SignUpScreen() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => alert(error.message));
  };

  const singIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
          console.log(authUser)
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="signupScreen">
      <form>
        <h1>Sign In</h1>
        <input type="email" placeholder="Email" ref={emailRef} />
        <input type="password" placeholder="Password" ref={passwordRef} />
        <button type="submit" onClick={singIn}>
          Sign In
        </button>

        <h4 onClick={register}>
          <span className="signupScreen__gray">New to netflix? </span>
          <span className="signupScreen__link">Sign Up now.</span>
        </h4>
      </form>
    </div>
  );
}

export default SignUpScreen;
