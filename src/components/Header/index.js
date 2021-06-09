import useWindowSize from "../../services/hooks/useWindowSize.js";
import { useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  selectUserId,
} from "../../services/authenticatedSlice/selectors.js";

import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function NonMobileHeaderLinks() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userId = useSelector(selectUserId);

  return (
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
  );
}

function MobileHeaderLinks() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userId = useSelector(selectUserId);

  return (
    <Nav className="ml-auto">
      <NavDropdown title="Menu">
        <NavDropdown.Item>Home</NavDropdown.Item>
        <LinkContainer to="/art/browse">
          <NavDropdown.Item>Browse</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to="/art/create">
          <NavDropdown.Item>Create</NavDropdown.Item>
        </LinkContainer>
        <NavDropdown.Divider />
        {isAuthenticated ? (
          <>
            <LinkContainer to={`/account/profile/${userId}`}>
              <NavDropdown.Item>Profile</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/account/dashboard">
              <NavDropdown.Item>Account</NavDropdown.Item>
            </LinkContainer>
          </>
        ) : (
          <>
            <LinkContainer to="/authentication/login">
              <NavDropdown.Item>Login</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/authentication/register">
              <NavDropdown.Item>Register</NavDropdown.Item>
            </LinkContainer>
          </>
        )}
      </NavDropdown>
    </Nav>
  );
}

export default function Header() {
  const { width } = useWindowSize();

  return (
    <div className="header">
      <Navbar variant="dark" bg="dark">
        <Navbar.Brand>ASCII-CRAFT</Navbar.Brand>
        {width > 576 ? <NonMobileHeaderLinks /> : <MobileHeaderLinks />}
      </Navbar>
    </div>
  );
}
