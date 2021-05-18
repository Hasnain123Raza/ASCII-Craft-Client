import { Route } from "react-router-dom";

import Login from "./scenes/Login";
import Register from "./scenes/Register";

export default function () {
  return [
    <Route exact path="/authentication/login" key="/authentication/login">
      <Login />
    </Route>,
    <Route exact path="/authentication/register" key="/authentication/register">
      <Register />
    </Route>,
  ];
}
