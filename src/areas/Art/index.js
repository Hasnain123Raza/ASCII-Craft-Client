import { Route } from "react-router-dom";
import ProtectedRoute from "../../components/ProtectedRoute";

import Browse from "./scenes/Browse";
import Create from "./scenes/Create";
import Open from "./scenes/Open";

export default function () {
  return [
    <Route exact path="/art/browse" key="/art/browse">
      <Browse />
    </Route>,
    <ProtectedRoute exact path="/art/create" key="/art/create">
      <Create />
    </ProtectedRoute>,
    <Route exact path="/art/open/:artId" key="/art/open">
      <Open />
    </Route>,
  ];
}
