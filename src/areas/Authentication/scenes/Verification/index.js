import { Button } from "react-bootstrap";
import PostRequestButton from "../../../../components/PostRequestButton";

export default function Confirm() {
  return (
    <div
      className="authentication-verification d-flex flex-column"
      style={{ flex: 1 }}
    >
      <div>
        <h2 style={{ textAlign: "center" }}>Email Verification</h2>
        <hr />
      </div>
      <div style={{ textAlign: "center" }}>
        Please check your email account for a verification email. If you can't
        find it please check your spam folder.
      </div>
      <br />
      <Button className="mx-auto" variant="success">
        Resend Email
      </Button>
    </div>
  );
}
