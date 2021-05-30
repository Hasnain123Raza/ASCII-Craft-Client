import { Button } from "react-bootstrap";

export default function LoadingButton({ className }) {
  return (
    <Button className={className} variant="secondary" disabled>
      Loading...
    </Button>
  );
}
