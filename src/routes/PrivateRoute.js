/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../context/UserContext";

const PrivateRoute = ({ children, redirectTo, ...rest }) => {
  const { userData } = useContext(UserContext);

  const isLoggedIn = userData.user ? true : false;
  useEffect(() => {
    //   if (userData.user) {
    console.log("userData<<", userData);
    //     setIsLoggedIn(true);
    //   }
  }, [userData.user]);
  return (
    <Route
      {...rest}
      render={() => (isLoggedIn ? children : <Redirect to={redirectTo} />)}
    />
  );
};

export default PrivateRoute;
