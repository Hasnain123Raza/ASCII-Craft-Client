import { Card, Button } from "react-bootstrap";

export default function RejectedCard({ initiateLoadingRequest }) {
  return (
    <Card>
      <Card.Body>
        <h5>Uh Oh</h5>
        <hr />
        We were unable to load some resources
        <br />
        <Button
          className="w-100 mt-3"
          variant="danger"
          onClick={initiateLoadingRequest}
        >
          Retry
        </Button>
      </Card.Body>
    </Card>
  );
}
