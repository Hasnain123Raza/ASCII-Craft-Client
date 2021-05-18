import { Button } from "react-bootstrap";

export default function ({ className, initiateLoadingRequest, text }) {
  return (
    <Button
      className={className}
      variant="success"
      onClick={initiateLoadingRequest}
    >
      {text}
    </Button>
  );
}
