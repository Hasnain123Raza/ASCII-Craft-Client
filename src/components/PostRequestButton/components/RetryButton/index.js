import { Button } from "react-bootstrap";

export default function ({ className, initiateLoadingRequest }) {
  return (
    <Button
      className={className}
      variant="danger"
      onClick={initiateLoadingRequest}
    >
      Retry
    </Button>
  );
}
