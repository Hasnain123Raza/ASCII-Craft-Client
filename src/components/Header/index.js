import { useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  selectUserId,
} from "../../services/authenticatedSlice/selectors.js";

import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function () {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userId = useSelector(selectUserId);

  return (
    <div className="header pbc">
      <Navbar variant="dark">
        <Navbar.Brand>ASCII-CRAFT</Navbar.Brand>
        <Nav style={{ flex: 1 }}>
          <Nav.Link>Home</Nav.Link>
          <LinkContainer to="/art/browse">
            <Nav.Link>Browse</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/art/create">
            <Nav.Link>Create</Nav.Link>
          </LinkContainer>

          {isAuthenticated ? (
            <>
              <LinkContainer to={`/account/profile/${userId}`}>
                <Nav.Link>Profile</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/account/dashboard">
                <Nav.Link className="ml-auto">Account</Nav.Link>
              </LinkContainer>
            </>
          ) : (
            <>
              <LinkContainer to="/authentication/login">
                <Nav.Link className="ml-auto">Login</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/authentication/register">
                <Nav.Link>Register</Nav.Link>
              </LinkContainer>
            </>
          )}
        </Nav>
      </Navbar>
    </div>
  );
}
