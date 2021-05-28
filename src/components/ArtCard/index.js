import { Card, Button } from "react-bootstrap";

export default function (props) {
  const { simplifiedArt, openCallback } = props;
  const { title, description } = simplifiedArt;

  return (
    <Card className="h-100">
      <Card.Body style={{ textAlign: "center" }}>
        <h5>{title}</h5>
        <hr />
        {description}
      </Card.Body>
      <Card.Footer>
        <Button
          className="w-100"
          variant="success"
          onClick={() => openCallback(simplifiedArt)}
        >
          Open
        </Button>
      </Card.Footer>
    </Card>
  );
}
