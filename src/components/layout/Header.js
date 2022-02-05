import React from "react";
import { Link, NavLink } from "react-router-dom";
import AuthOptions from "../auth/AuthOptions";

export default function Header() {
  return (
    <header id="header">
      <Link to="/">
        <h1 className="title">Calories Tracking App</h1>
      </Link>
      {/* <Link to="/">Home</Link> */}
      <NavLink to="/">Home</NavLink>
      <NavLink to="/manage-users">Manage Users</NavLink>
      {/* <Link to="/manage-users">ManageUsers</Link> */}
      <AuthOptions />
    </header>
  );
}
