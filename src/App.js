import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AuthService } from "./services/";
import ErrorNotice from "./components/misc/ErrorNotice";
import Header from "./components/layout/Header";
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import UserContext from "./context/UserContext";
import { checkLoggedIn } from "./utills/Helper";
//TODO: Private Route remaining
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "font-awesome/css/font-awesome.min.css";

import "./style.css";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import NoMatch from "./components/pages/NoMatch";
import ManageUsers from "./components/pages/admin/ManageUsers";
// console.log("ennnn", env);
export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState();
  // conso
  useEffect(() => {
    let token = localStorage.getItem("auth-token");
    const userInfo = async () => {
      const tokenRes = await checkLoggedIn();
      // console.log(tokenRes);
      if (tokenRes) {
        const userRes = await AuthService.retrieveUser();
        // console.log("userRes.token", userRes);
        if (!token) {
          setError("you are not authorized");
        }
        // console.log("line 31", userRes.data.userInfo);
        setUserData({
          token,
          user: userRes.data.userInfo,
        });
        setIsLoggedIn(true);
      }
    };

    userInfo();
  }, [userData.token]);
  // console.log("userData ==>", userData);
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
              {/*
               <Route exact path="/" component={Home} /> */}

              <PrivateRoute exact path="/" redirectTo="/login">
                <Home />
              </PrivateRoute>
              <PrivateRoute exact path="/manage-users" redirectTo="/404">
                <ManageUsers />
              </PrivateRoute>
              <PublicRoute
                path="/login"
                redirectTo="/"
                exact
                // component={Login}
              >
                <Login />
              </PublicRoute>
              <Route path="*">
                <NoMatch />
              </Route>
            </Switch>
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}
