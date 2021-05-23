import { Route } from "react-router-dom";
import ProtectedRoute from "../../components/ProtectedRoute";

import Dashboard from "./scenes/Dashboard";
import Profile from "./scenes/Profile";

export default function () {
  return [
    <ProtectedRoute exact path="/account/dashboard" key="/account/dashboard">
      <Dashboard />
    </ProtectedRoute>,
    <Route exact path="/account/profile" key="/account/profile">
      <Profile />
    </Route>,
  ];
}
