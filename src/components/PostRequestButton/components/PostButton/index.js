import { Button } from "react-bootstrap";

export default function PostButton({
  className,
  initiateLoadingRequest,
  text,
  variant,
}) {
  return (
    <Button
      className={className}
      variant={variant}
      onClick={initiateLoadingRequest}
    >
      {text}
    </Button>
  );
}
