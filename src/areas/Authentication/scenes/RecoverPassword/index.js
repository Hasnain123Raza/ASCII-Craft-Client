import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import {
  postRecoverPassword,
  reset,
  setEmail,
} from "./services/authenticationRecoverPasswordSlice";
import {
  selectEmail,
  selectEmailError,
  selectPostRecoverPasswordRequestStatus,
} from "./services/authenticationRecoverPasswordSlice/selectors.js";

import { Form } from "react-bootstrap";
import RepeatedPostRequestButton from "../../../../components/RepeatedPostRequestButton";

export default function RecoverPassword() {
  const dispatch = useDispatch();

  const email = useSelector(selectEmail);

  const emailError = useSelector(selectEmailError);

  const initiateLoadingRequest = () => dispatch(postRecoverPassword({ email }));
  const loadingRequestStatus = useSelector(
    selectPostRecoverPasswordRequestStatus
  );

  useEffect(() => {
    return () => dispatch(reset());
  }, []);

  return (
    <div
      className="authentication-recoverpassword d-flex flex-column"
      style={{ flex: 1 }}
    >
      <div>
        <h2 style={{ textAlign: "center" }}>Recover Password</h2>
        <hr />
      </div>

      <Form>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            isInvalid={Boolean(emailError)}
            onChange={(event) => dispatch(setEmail(event.target.value))}
          />
          <Form.Control.Feedback type="invalid">
            {emailError}
          </Form.Control.Feedback>
        </Form.Group>
      </Form>

      <div>
        <RepeatedPostRequestButton
          initiateLoadingRequest={initiateLoadingRequest}
          loadingRequestStatus={loadingRequestStatus}
          idleText="Send Recovery Email"
        />
      </div>
    </div>
  );
}
