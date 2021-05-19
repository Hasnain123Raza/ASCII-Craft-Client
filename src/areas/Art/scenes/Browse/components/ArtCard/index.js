import { useSelector } from "react-redux";

import { Card, Button } from "react-bootstrap";

import {
  selectSimplifiedArtTitleByIndex,
  selectSimplifiedArtDescriptionByIndex,
} from "../../services/artBrowseSlice/selectors";

export default function ({ index }) {
  console.log(index);

  const title = useSelector(selectSimplifiedArtTitleByIndex(index));
  const description = useSelector(selectSimplifiedArtDescriptionByIndex(index));

  return (
    <Card className="h-100">
      <Card.Body style={{ textAlign: "center" }}>
        <h5>{title}</h5>
        <hr />
        {description}
      </Card.Body>
      <Card.Footer>
        <Button className="w-100" variant="success">
          Open
        </Button>
      </Card.Footer>
    </Card>
  );
}
