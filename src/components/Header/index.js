import { Navbar, Nav } from "react-bootstrap";

export default function () {
  return (
    <div className="header pbc">
      <Navbar variant="dark">
        <Navbar.Brand>ASCII-CRAFT</Navbar.Brand>
        <Nav style={{ flex: 1 }}>
          <Nav.Link>Home</Nav.Link>
          <Nav.Link>Browse</Nav.Link>
          <Nav.Link>Create</Nav.Link>

          <Nav.Link className="ml-auto">Login</Nav.Link>
          <Nav.Link>Register</Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
}
