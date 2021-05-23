import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../services/authenticatedSlice/selectors.js";

import { Route, Redirect } from "react-router-dom";

import Login from "./scenes/Login";
import Register from "./scenes/Register";

export default function () {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return isAuthenticated ? (
    <Redirect exact to="/account/dashboard" />
  ) : (
    [
      <Route exact path="/authentication/login" key="/authentication/login">
        <Login />
      </Route>,
      <Route
        exact
        path="/authentication/register"
        key="/authentication/register"
      >
        <Register />
      </Route>,
    ]
  );
}
