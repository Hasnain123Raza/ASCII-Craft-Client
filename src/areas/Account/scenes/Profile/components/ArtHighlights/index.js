import { useHistory } from "react-router-dom";

import { Button, Card, Container, Row, Col } from "react-bootstrap";
import ArtCard from "../../../../../../components/ArtCard";

export default function ArtHighlights({
  className,
  highlightArts,
  totalArts,
  browseLink,
}) {
  const history = useHistory();

  return (
    <div className={className}>
      <Card>
        <Card.Body>
          <Container>
            <Row>
              {totalArts > 0 ? (
                highlightArts.map((simplifiedArt, simplifiedArtIndex) => (
                  <Col key={simplifiedArtIndex} md={4}>
                    <ArtCard simplifiedArt={simplifiedArt} />
                  </Col>
                ))
              ) : (
                <Col>
                  <h2 className="text-muted" style={{ textAlign: "center" }}>
                    Uh oh... There are no arts
                  </h2>
                </Col>
              )}
            </Row>
          </Container>
        </Card.Body>
      </Card>
      {totalArts > 0 &&
        (totalArts <= 3 ? (
          <div className="d-flex mt-2">Total Arts: {totalArts}</div>
        ) : (
          <div className="d-flex mt-2">
            Total Arts: {totalArts}
            <Button
              className="ml-auto"
              variant="primary"
              onClick={() => {
                history.push(browseLink);
              }}
            >
              Browse All
            </Button>
          </div>
        ))}
    </div>
  );
}
