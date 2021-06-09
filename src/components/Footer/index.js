import { Container, Row, Col } from "react-bootstrap";

import "./style.css";

export default function Footer() {
  return (
    <div className="footer bg-dark p-3">
      <Container fluid>
        {/* Columns have extra divs to hold link items so that the link items don't span the entire width of the column. */}
        <Row style={{ textAlign: "center" }}>
          <Col md>
            <h5>ASCII-CRAFT</h5>
            <div className="d-flex flex-column">
              <div>
                <a className="px-2" href="#">
                  Contact us
                </a>
              </div>
              <div>
                <a href="#">Privacy Policy</a>
              </div>
              <div>
                <a href="#">Terms of Service</a>
              </div>
            </div>
          </Col>
          <Col md>
            <h5>HELP</h5>
            <div className="d-flex flex-column">
              <div>
                <a href="#">FAQ</a>
              </div>
            </div>
          </Col>
        </Row>

        <hr />

        <small>
          Please respect ASCII artists and do not remove their signature while
          sharing their art.
        </small>
      </Container>
    </div>
  );
}
