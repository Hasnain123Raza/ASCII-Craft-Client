import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../services/authenticatedSlice/selectors.js";

import { Route, Redirect } from "react-router-dom";

import Login from "./scenes/Login";
import Register from "./scenes/Register";
import EmailVerification from "./scenes/EmailVerification";
import RecoverPassword from "./scenes/RecoverPassword";
import NewPassword from "./scenes/NewPassword";

export default function Authentication() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return [
    <Route exact path="/authentication/login" key="/authentication/login">
      {isAuthenticated ? <Redirect exact to="/account/dashboard" /> : <Login />}
    </Route>,
    <Route exact path="/authentication/register" key="/authentication/register">
      {isAuthenticated ? (
        <Redirect exact to="/account/dashboard" />
      ) : (
        <Register />
      )}
    </Route>,
    <Route
      exact
      path="/authentication/emailverification/:token"
      key="/authentication/emailverification/:token"
    >
      <EmailVerification />
    </Route>,
    <Route
      exact
      path="/authentication/recoverpassword"
      key="/authentication/recoverpassword"
    >
      <RecoverPassword />
    </Route>,
    <Route
      exact
      path="/authentication/newpassword/:_id/:token"
      key="/authentication/newpassword/:_id/:token"
    >
      <NewPassword />
    </Route>,
  ];
}
