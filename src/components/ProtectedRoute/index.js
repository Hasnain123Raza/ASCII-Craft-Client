import { useSelector } from "react-redux";
import useQuery from "../../services/hooks/useQuery.js";

import { selectIsAuthenticated } from "../../services/authenticatedSlice/selectors.js";

import { Route, Redirect, useLocation } from "react-router-dom";

export default function ({ children, ...rest }) {
  const location = useLocation();
  const query = useQuery();
  query.set("redirect", location.pathname);

  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <Route {...rest}>
      {isAuthenticated ? (
        children
      ) : (
        <Redirect exact to={"/authentication/login?" + query.toString()} />
      )}
    </Route>
  );
}
