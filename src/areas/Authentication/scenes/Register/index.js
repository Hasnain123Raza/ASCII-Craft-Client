import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  reset,
  setUsername,
  setPassword,
  setRecaptchaToken,
  postRegisterUser,
} from "./services/authenticationRegisterSlice";
import {
  selectUsername,
  selectPassword,
  selectRecaptchaToken,
  selectPostRegisterUserRequestStatus,
  selectUsernameError,
  selectPasswordError,
} from "./services/authenticationRegisterSlice/selectors.js";

import { SITE_KEY } from "../../../../services/constants.js";

import { Form } from "react-bootstrap";
import PostRequestButton from "../../../../components/PostRequestButton";
import ReCAPTCHA from "react-google-recaptcha";

export default function Register() {
  const dispatch = useDispatch();

  const username = useSelector(selectUsername);
  const password = useSelector(selectPassword);
  const recaptchaToken = useSelector(selectRecaptchaToken);

  const usernameError = useSelector(selectUsernameError);
  const passwordError = useSelector(selectPasswordError);

  const initiateLoadingRequest = () =>
    dispatch(
      postRegisterUser({ user: { username, password }, recaptchaToken })
    );
  const loadingRequestStatus = useSelector(selectPostRegisterUserRequestStatus);

  useEffect(() => {
    return () => dispatch(reset());
  }, []);

  return (
    <div
      className="authentication-register d-flex flex-column"
      style={{ flex: 1 }}
    >
      <div>
        <h2 style={{ textAlign: "center" }}>Register</h2>
        <hr />

        <Form>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              isInvalid={Boolean(usernameError)}
              onChange={(event) => dispatch(setUsername(event.target.value))}
            />
            <Form.Control.Feedback type="invalid">
              {usernameError}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
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

          <ReCAPTCHA
            sitekey={SITE_KEY}
            onChange={(tokenValue) => dispatch(setRecaptchaToken(tokenValue))}
          />
        </Form>

        <div className="mt-3 d-flex">
          <PostRequestButton
            initiateLoadingRequest={initiateLoadingRequest}
            loadingRequestStatus={loadingRequestStatus}
            idleText="Register"
            redirectLink="/authentication/login"
          />
        </div>
      </div>
    </div>
  );
}
