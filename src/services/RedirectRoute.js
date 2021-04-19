import React, { Component } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import Login from "../components/login.component";
import Cookies from "universal-cookie";
import AuthService from "./auth.service";
const RedirectRoute = ({ isAuth: isAuth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth) {
          return <Redirect to= "/profile"/>
        } else {
          AuthService.logout()
          return <Route path="/login" component={Login} />;
        }
      }}
    />
  );
};

export default RedirectRoute;