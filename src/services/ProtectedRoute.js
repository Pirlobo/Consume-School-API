import React, { Component } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import AuthService from "./auth.service";
// const AuthApi = React.createContext()
// export default AuthApi;
import Cooky from "js-cookie";
import Cookies from "universal-cookie";
import Profile from "../components/profile.component";
const ProtectedRoute = ({
  path: path,
  isAuth: isAuth,
  permission: permission,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        try {
          if (props.location.state.permission === "allowed") {
            return <Route path={path} render={props} component={Component} />;
          } else if (props.location.state.permission === "denied") {
            return <Route path={path} render={props} component={Component} />;
          }
        } catch (err) {
          if (isAuth) {
            return <Route path={path} render={props} component={Component} />;
          } else {
            if (Cooky.get("current-access")) {
              return <Route path={path} render={props} component={Component} />;
            }
            return (
              <Redirect
                to={{ pathname: "/login", state: { from: props.location } }}
              />
            );
          }
        }
      }}
    />
  );
};

export default ProtectedRoute;

// Almost like Fafsa

// try {
//   if (props.location.state.permission === "allowed") {
//     return <Route path={path} component={Component} />;
//   } else if (props.location.state.permission === "denied") {
//     return <Route path={path} component={Component} />;
//   }
// } catch (err) {
//   if (isAuth) {
//     return <Route path={path} component={Component} />;
//   } else {
//     if (props.location.permission) {
//       return <Route path={path} component={Component} />;
//     } else if (props.permission === "allowed") {
//       return <Route path={path} component={Component} />;
//     }
//     localStorage.removeItem("user");

//     return (
//       <Redirect
//         to={{ pathname: "/login", state: { from: props.location } }}
//       />
//     );
//   }
// }