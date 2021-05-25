import { getRowsFromSimplifiedArts } from "./services/grid.js";

import { Row, Col } from "react-bootstrap";
import ArtCard from "./components/ArtCard";

export default function ({
  className,
  cardsPerRow,
  totalRows,
  simplifiedArts,
  openCallback,
}) {
  const rows = getRowsFromSimplifiedArts(
    cardsPerRow,
    totalRows,
    simplifiedArts
  );

  return (
    <div className={"art-browser " + className}>
      {rows.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((simplifiedArt, simplifiedArtIndex) => (
            <Col
              className="my-2"
              md={12 / cardsPerRow}
              key={simplifiedArtIndex}
            >
              <ArtCard
                simplifiedArt={simplifiedArt}
                openCallback={openCallback}
              />
            </Col>
          ))}
        </Row>
      ))}
    </div>
  );
}
