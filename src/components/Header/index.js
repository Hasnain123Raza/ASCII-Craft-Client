import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../services/authenticatedSlice/selectors.js";

import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function () {
  const isAuthenticated = useSelector(selectIsAuthenticated);

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
            <Nav.Link className="ml-auto">Account</Nav.Link>
          ) : (
            <>
              <Nav.Link className="ml-auto">Login</Nav.Link>
              <Nav.Link>Register</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar>
    </div>
  );
}
