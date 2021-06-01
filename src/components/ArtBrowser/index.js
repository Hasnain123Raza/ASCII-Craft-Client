import { getRowsFromSimplifiedArts } from "./services/grid.js";

import { Row, Col } from "react-bootstrap";
import ArtCard from "../ArtCard";

export default function ArtBrowser({
  className,
  cardsPerRow,
  totalRows,
  simplifiedArts,
}) {
  const rows = getRowsFromSimplifiedArts(
    cardsPerRow,
    totalRows,
    simplifiedArts
  );

  return (
    <div className={"art-browser " + className}>
      {simplifiedArts.length === 0 ? (
        <h4 className="text-muted" style={{ textAlign: "center" }}>
          Uh oh... There are no arts
        </h4>
      ) : (
        rows.map((row, rowIndex) => (
          <Row key={rowIndex}>
            {row.map((simplifiedArt, simplifiedArtIndex) => (
              <Col
                className="my-2"
                md={12 / cardsPerRow}
                key={simplifiedArtIndex}
              >
                <ArtCard simplifiedArt={simplifiedArt} />
              </Col>
            ))}
          </Row>
        ))
      )}
    </div>
  );
}
