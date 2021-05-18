import { Route } from "react-router-dom";

import Browse from "./scenes/Browse";
import Create from "./scenes/Create";
import Open from "./scenes/Open";

export default function () {
  return [
    <Route exact path="/art/browse" key="/art/browse">
      <Browse />
    </Route>,
    <Route exact path="/art/create" key="/art/create">
      <Create />
    </Route>,
    <Route exact path="/art/open" key="/art/open">
      <Open />
    </Route>,
  ];
}
