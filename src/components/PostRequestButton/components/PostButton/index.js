import { Button } from "react-bootstrap";

export default function ({
  className,
  initiateLoadingRequest,
  text,
  buttonVariant,
}) {
  return (
    <Button
      className={className}
      variant={buttonVariant}
      onClick={initiateLoadingRequest}
    >
      {text}
    </Button>
  );
}
