import React, { useEffect, useState } from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomeScreen from "./screens/HomeScreen/HomeScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import Loading from "./screens/Loading/Loading";

import { auth } from "./firebase";

// React-Redux (=Almacen)
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";

function App() {

  const [loading, setLoading] = useState(true)
  
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true)
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        // Logged in
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        // Logged out
        dispatch(logout());
      }
      setLoading(false)
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="App">
      {
        loading ? <Loading /> : null
      }
      <Router>
        {!user ? (
          <LoginScreen />
        ) : (
          <Switch>
            <Route exact path="/profile">
              <ProfileScreen />
            </Route>
            <Route exact path="/">
              <HomeScreen />
            </Route>
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
