/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext } from "react";
import { Redirect, useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import ErrorNotice from "../misc/ErrorNotice";
import { AuthService } from "../../services/";
import { useEffect } from "react";
// import AuthService from "./services/authService";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();
  const store_token = localStorage.getItem("auth-token");
  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };
      const loginRes = await AuthService.login(loginUser);
      // console.log("first", loginRes);
      setUserData({
        token: loginRes.data.accessToken,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.accessToken);
      history.push("/");
    } catch (err) {
      console.log("err", err);
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
  return !store_token ? (
    <div className="page">
      <h2>Log in</h2>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form className="form" onSubmit={submit}>
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input type="submit" value="Log in" />
      </form>
    </div>
  ) : null;
}
