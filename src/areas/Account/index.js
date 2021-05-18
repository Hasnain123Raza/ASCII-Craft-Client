import { Route } from "react-router-dom";

import Dashboard from "./scenes/Dashboard";
import Profile from "./scenes/Profile";

export default function () {
  return [
    <Route exact path="/account/dashboard" key="/account/dashboard">
      <Dashboard />
    </Route>,
    <Route exact path="/account/profile" key="/account/profile">
      <Profile />
    </Route>,
  ];
}
