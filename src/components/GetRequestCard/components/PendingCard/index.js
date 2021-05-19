import { Card, Button } from "react-bootstrap";

export default function () {
  return (
    <Card>
      <Card.Body>
        <h5>Please Wait</h5>
        <hr />
        We are loading some resources
        <br />
        <Button className="w-100 mt-3" variant="secondary" disabled>
          Loading...
        </Button>
      </Card.Body>
    </Card>
  );
}
