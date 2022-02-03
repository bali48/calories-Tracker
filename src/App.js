import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AuthService } from "./services/";
import ErrorNotice from "./components/misc/ErrorNotice";
import Header from "./components/layout/Header";
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import UserContext from "./context/UserContext";
import { checkLoggedIn } from "./utills/Helper";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "font-awesome/css/font-awesome.min.css";

import "./style.css";
// console.log("ennnn", env);
export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });
  const [error, setError] = useState();

  useEffect(() => {
    let token = localStorage.getItem("auth-token");
    const userInfo = async () => {
      const tokenRes = await checkLoggedIn();
      // console.log(tokenRes);
      if (tokenRes) {
        const userRes = await AuthService.retrieveUser();
        if (!token) {
          console.log("userRes.token", userRes);
          setError("you are not authorized");
        }
        // console.log("line 31", userRes.data.userInfo);
        setUserData({
          token,
          user: userRes.data.userInfo,
        });
      }
    };

    userInfo();
  }, []);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Header />
          <div className="container">
            {error && (
              <ErrorNotice
                message={error}
                clearError={() => setError(undefined)}
              />
            )}
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
            </Switch>
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}
