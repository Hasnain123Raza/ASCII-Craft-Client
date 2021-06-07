import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import {
  reset,
  setPassword,
  postNewPassword,
} from "./services/authenticationNewPasswordSlice";
import {
  selectPassword,
  selectPostNewPasswordRequestStatus,
  selectPasswordError,
} from "./services/authenticationNewPasswordSlice/selectors.js";

import { Form } from "react-bootstrap";
import PostRequestButton from "../../../../components/PostRequestButton";

export default function NewPassword() {
  const dispatch = useDispatch();
  const { _id, token } = useParams();

  const password = useSelector(selectPassword);

  const passwordError = useSelector(selectPasswordError);

  const initiateLoadingRequest = () =>
    dispatch(postNewPassword({ _id, token, password }));
  const loadingRequestStatus = useSelector(selectPostNewPasswordRequestStatus);

  useEffect(() => {
    return () => dispatch(reset());
  }, []);

  return (
    <div
      className="authentication-newpassword d-flex flex-column"
      style={{ flex: 1 }}
    >
      <div>
        <h2 style={{ textAlign: "center" }}>New Password</h2>
        <hr />
      </div>

      <Form>
        <Form.Group controlId="password">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            isInvalid={Boolean(passwordError)}
            onChange={(event) => dispatch(setPassword(event.target.value))}
          />
          <Form.Control.Feedback type="invalid">
            {passwordError}
          </Form.Control.Feedback>
        </Form.Group>
      </Form>

      <div>
        <PostRequestButton
          initiateLoadingRequest={initiateLoadingRequest}
          loadingRequestStatus={loadingRequestStatus}
          idleText="Set Password"
          redirectLink="/authentication/login"
        />
      </div>
    </div>
  );
}
