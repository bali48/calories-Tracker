/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../context/UserContext";

const AdminRoute = ({ children, redirectTo, ...rest }) => {
  const { userData } = useContext(UserContext);
  const [userRole, setUserRole] = useState(null);
  // console.log("children, redirectTo, ...rest", children, redirectTo, {
  //   ...rest,
  // });userRole
  // const isLoggedIn = userData.user ? true : false;
  const isLoggedIn = localStorage.getItem("auth-token");
  useEffect(() => {
    //   if (userData.user) {
    if (userData.user) {
      console.log("Private Route<<", userData.user.role);
      setUserRole(userData.user.role);
    }
    //     setIsLoggedIn(true);
    //   }
  }, [userData.user]);
  return (
    <React.Fragment>
      {userRole === "admin" && (
        <Route
          {...rest}
          render={() => (isLoggedIn ? children : <Redirect to={redirectTo} />)}
        />
      )}
    </React.Fragment>
  );
};

export default AdminRoute;
